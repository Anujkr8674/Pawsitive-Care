
// import React, { createContext, useState, useEffect } from 'react';
// import {
//   getCartFromBackend,
//   saveCartToBackend,
//   removeCartItem,
//   updateCartItemWithSubtotal,
// } from '../src/api/cartAPI';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(() => {
//     try {
//       const storedCart = localStorage.getItem('cartItems');
//       const parsedCart = storedCart ? JSON.parse(storedCart) : [];
//       return Array.isArray(parsedCart) ? parsedCart : [];
//     } catch (error) {
//       console.error('Failed to parse cartItems from localStorage:', error);
//       return [];
//     }
//   });

//   useEffect(() => {
//     const fetchCart = async () => {
//       const userId = localStorage.getItem('userId');
//       if (userId) {
//         try {
//           const backendCart = await getCartFromBackend(userId);
//           if (backendCart) {
//             setCartItems(backendCart);
//           }
//         } catch (error) {
//           console.error('Failed to fetch cart from backend:', error);
//         }
//       }
//     };
//     fetchCart();
//   }, []);

//   const addToCart = async (product) => {
//     setCartItems((prevItems) => {
//       const existingProduct = prevItems.find(
//         (item) => item.id === product.id && item.size === product.size && item.color === product.color
//       );

//       if (existingProduct) {
//         return prevItems.map((item) =>
//           item.id === product.id && item.size === product.size && item.color === product.color
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevItems, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((prevItems) => {
//       const existingProduct = prevItems.find((item) => item.id === productId);
//       if (existingProduct) {
//         if (existingProduct.quantity === 1) {
//           return prevItems.filter((item) => item.id !== productId);
//         } else {
//           return prevItems.map((item) =>
//             item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
//           );
//         }
//       }
//       return prevItems; // Return unchanged if item not found
//     });
//   };

//   const updateItemQuantity = async (itemId, quantity) => {
//     setCartItems((prevItems) => {
//       const existingProduct = prevItems.find((item) => item.id === itemId);
//       if (existingProduct) {
//         const updatedCart = prevItems.map((item) =>
//           item.id === itemId ? { ...item, quantity, subtotal: item.price * quantity } : item
//         );

//         const userId = localStorage.getItem('userId');
//         if (userId) {
//           try {
//             updateCartItemWithSubtotal(userId, itemId, quantity, existingProduct.price * quantity);
//           } catch (error) {
//             console.error('Error updating item quantity:', error);
//           }
//         }
//         return updatedCart;
//       }
//       return prevItems;
//     });
//   };

//   const removeProductFromCart = async (productId) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));

//     const userId = localStorage.getItem('userId');
//     if (userId) {
//       try {
//         await removeCartItem(userId, productId);
//       } catch (error) {
//         console.error('Error removing item from cart:', error);
//       }
//     }
//   };

//   // New function to clear the cart after order is placed
//   const clearCartAfterOrder = async () => {
//     setCartItems([]);
//     const userId = localStorage.getItem('userId');
//     if (userId) {
//       try {
//         // Assuming saveCartToBackend can be used to save an empty cart
//         await saveCartToBackend(userId, []);
//       } catch (error) {
//         console.error('Error clearing cart after order:', error);
//       }
//     }
//     localStorage.removeItem('cartItems'); // Clear from localStorage
//   };

//   const calculateTotalAmount = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     if (userId) {
//       saveCartToBackend(userId, cartItems);
//     }
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   }, [cartItems]);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         updateItemQuantity,
//         removeFromCart,
//         removeProductFromCart,
//         clearCartAfterOrder, // Expose clearCartAfterOrder function
//         calculateTotalAmount,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };







import React, { createContext, useState, useEffect, useRef } from 'react';
import {
  getCartFromBackend,
  saveCartToBackend,
  removeCartItem,
  updateCartItemWithSubtotal,
} from '../src/api/cartAPI';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const saveTimeoutRef = useRef(null);
  const isFetchingRef = useRef(false);
  const lastUserIdRef = useRef(null);
  
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cartItems');
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];
      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.error('Failed to parse cartItems from localStorage:', error);
      return [];
    }
  });

  // Fetch cart when component mounts or userId changes
  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorage.getItem('userId');
      
      // Only fetch if userId changed or is new
      if (userId && userId !== lastUserIdRef.current) {
        lastUserIdRef.current = userId;
        isFetchingRef.current = true;
        
        try {
          const backendCart = await getCartFromBackend(userId);
          if (backendCart && Array.isArray(backendCart)) {
            // Merge strategy: Combine backend and local cart, prefer backend for conflicts
            const localCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
            
            // If backend has items, use backend (it's the source of truth)
            // But if local has items that backend doesn't, merge them
            if (backendCart.length > 0) {
              setCartItems(backendCart);
              localStorage.setItem('cartItems', JSON.stringify(backendCart));
            } else if (localCart.length > 0 && userId) {
              // If backend is empty but local has items, save local to backend
              // This handles the case where items were added before login
              await saveCartToBackend(userId, localCart);
              setCartItems(localCart);
            } else {
              setCartItems([]);
              localStorage.setItem('cartItems', JSON.stringify([]));
            }
          }
        } catch (error) {
          console.error('Failed to fetch cart from backend:', error);
          // On error, keep local cart
        } finally {
          isFetchingRef.current = false;
        }
      } else if (!userId) {
        // User logged out - clear cart
        lastUserIdRef.current = null;
        setCartItems([]);
        localStorage.removeItem('cartItems');
      }
    };
    
    fetchCart();
    
    // Listen for userId changes (for login in same window)
    const checkUserId = () => {
      const currentUserId = localStorage.getItem('userId');
      if (currentUserId !== lastUserIdRef.current) {
        fetchCart();
      }
    };
    
    // Check every 2 seconds for userId changes
    const intervalId = setInterval(checkUserId, 2000);
    
    // Also listen for storage events (for login in other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'userId') {
        fetchCart();
      }
    };
    
    // Listen for custom event when userId changes in same window (after login)
    const handleUserIdChanged = () => {
      fetchCart();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userIdChanged', handleUserIdChanged);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userIdChanged', handleUserIdChanged);
    };
  }, []);

  const addToCart = async (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(
        (item) => item.id === product.id && item.size === product.size && item.color === product.color
      );

      if (existingProduct) {
        return prevItems.map((item) =>
          item.id === product.id && item.size === product.size && item.color === product.color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.id === productId);
      if (existingProduct) {
        if (existingProduct.quantity === 1) {
          return prevItems.filter((item) => item.id !== productId);
        } else {
          return prevItems.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
          );
        }
      }
      return prevItems; // Return unchanged if item not found
    });
  };

  const updateItemQuantity = async (itemId, quantity) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.id === itemId);
      if (existingProduct) {
        const updatedCart = prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity, subtotal: item.price * quantity } : item
        );

        const userId = localStorage.getItem('userId');
        if (userId) {
          try {
            updateCartItemWithSubtotal(userId, itemId, quantity, existingProduct.price * quantity);
          } catch (error) {
            console.error('Error updating item quantity:', error);
          }
        }
        return updatedCart;
      }
      return prevItems;
    });
  };

  const removeProductFromCart = async (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));

    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        await removeCartItem(userId, productId);
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    }
  };

  const clearCartAfterOrder = async () => {
    setCartItems([]);
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        await saveCartToBackend(userId, []);
      } catch (error) {
        console.error('Error clearing cart after order:', error);
      }
    }
    localStorage.removeItem('cartItems');
    localStorage.removeItem('orderInProgress'); // Remove order in progress flag
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Debounced save to backend - prevents too many requests
  useEffect(() => {
    // Don't save if we're currently fetching
    if (isFetchingRef.current) {
      return;
    }
    
    // Don't save if order is in progress (prevents race conditions)
    if (localStorage.getItem('orderInProgress') === 'true') {
      return;
    }
    
    // Always update localStorage immediately
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Debounce save to backend - wait 1 second after last change
    saveTimeoutRef.current = setTimeout(async () => {
      // Double check order in progress flag
      if (localStorage.getItem('orderInProgress') === 'true') {
        return;
      }
      
      const userId = localStorage.getItem('userId');
      if (userId && cartItems.length >= 0) {
        try {
          await saveCartToBackend(userId, cartItems);
        } catch (error) {
          console.error('Error saving cart to backend:', error);
        }
      }
    }, 1000); // Wait 1 second after last change
    
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateItemQuantity,
        removeFromCart,
        removeProductFromCart,
        clearCartAfterOrder,
        calculateTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
