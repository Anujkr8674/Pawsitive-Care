// // src/api/cartAPI.js
// import axios from 'axios';

// export const getCartFromBackend = async (userId) => {
//   try {
//     // const response = await axios.get(`api/cart/${userId}`);
//     const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
//     return response.data.cart;
//   } catch (error) {
//     console.error("Error fetching cart from backend:", error);
//   }
// };

// export const saveCartToBackend = async (userId, cartItems) => {
//   try {
//     // await axios.post(`/api/cart/${userId}`, { cartItems });
//     await axios.post(`http://localhost:5000/api/cart/${userId}`, { cartItems });
//   } catch (error) {
//     console.error("Error saving cart to backend:", error);
//   }
// };






// // cartAPI.js

// export const updateCartItemQuantity = async (userId, itemId, quantity) => {
//     const response = await fetch(`http://localhost:5000/api/cart/${userId}/update-item`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ itemId, quantity }),
//     });
  
//     if (!response.ok) {
//       throw new Error('Failed to update item quantity');
//     }
//   };
  
//   export const removeCartItem = async (userId, itemId) => {
//     const response = await fetch(`http://localhost:5000/api/cart/${userId}/remove-item`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ itemId }),
//     });
  
//     if (!response.ok) {
//       throw new Error('Failed to remove item from cart');
//     }
//   };
  






// src/api/cartAPI.js
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

// Fetch cart for a user with retry logic for 429 errors
export const getCartFromBackend = async (userId, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(API_ENDPOINTS.CART(userId));
      if (response.data && response.data.cart) {
        return Array.isArray(response.data.cart) ? response.data.cart : [];
      }
      return [];
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Rate limited - wait and retry
        const waitTime = Math.pow(2, i) * 1000; // Exponential backoff: 1s, 2s, 4s
        console.warn(`Rate limited. Retrying in ${waitTime}ms... (attempt ${i + 1}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      console.error("Error fetching cart from backend:", error);
      if (i === retries - 1) {
        // Last retry failed, return empty array
        return [];
      }
    }
  }
  return [];
};

// Save cart to backend with retry logic for 429 errors
export const saveCartToBackend = async (userId, cartItems, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      await axios.post(API_ENDPOINTS.CART(userId), { cartItems });
      return; // Success, exit
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Rate limited - wait and retry
        const waitTime = Math.pow(2, i) * 1000; // Exponential backoff: 1s, 2s, 4s
        console.warn(`Rate limited while saving cart. Retrying in ${waitTime}ms... (attempt ${i + 1}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      console.error("Error saving cart to backend:", error);
      if (i === retries - 1) {
        // Last retry failed, throw error
        throw error;
      }
    }
  }
};

// Update cart item quantity
export const updateCartItemQuantity = async (userId, itemId, quantity) => {
  try {
    const response = await fetch(API_ENDPOINTS.UPDATE_CART_ITEM(userId), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId, quantity }),
    });

    if (!response.ok) {
      throw new Error('Failed to update item quantity');
    }
  } catch (error) {
    console.error("Error updating item quantity:", error);
  }
};

// Remove item from cart
export const removeCartItem = async (userId, itemId) => {
  try {
    const response = await fetch(API_ENDPOINTS.REMOVE_CART_ITEM(userId), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId }),
    });

    if (!response.ok) {
      throw new Error('Failed to remove item from cart');
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

// // Update cart item quantity and subtotal
// export const updateCartItemWithSubtotal = async (userId, itemId, quantity, subtotal) => {
//   try {
//     const response = await fetch(`http://localhost:5000/api/cart/${userId}/update-item-with-subtotal`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ itemId, quantity, subtotal }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to update item quantity and subtotal');
//     }
//   } catch (error) {
//     console.error("Error updating item quantity and subtotal:", error);
//   }
// };






export const updateCartItemWithSubtotal = async (userId, itemId, quantity, subtotal) => {
  try {
    const response = await fetch(API_ENDPOINTS.UPDATE_CART_ITEM_WITH_SUBTOTAL(userId), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId, quantity, subtotal }), // Make sure the request body has the correct keys
    });

    if (!response.ok) {
      throw new Error('Failed to update item quantity and subtotal');
    }
  } catch (error) {
    console.error("Error updating item quantity and subtotal:", error);
  }
};
