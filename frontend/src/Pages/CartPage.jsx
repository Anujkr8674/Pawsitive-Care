
import React, { useContext, useEffect } from 'react';
import { CartContext } from '../CartContext';
import { updateCartItemWithSubtotal } from '../api/cartAPI'; // Import the API function
import { useNavigate, Link } from 'react-router-dom'; // Import navigation hook for redirection
import './cart.css';

function CartPage() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    removeProductFromCart,
    calculateTotalAmount,
    clearCart, // Import clearCart method
    userId,
    clearCartAfterOrder,
  } = useContext(CartContext);
  const navigate = useNavigate(); // Hook for navigation

  // Effect to save cart when cart items change
  useEffect(() => {
    const saveCartItems = async () => {
      for (const item of cartItems) {
        const subtotal = item.price * item.quantity; // Calculate the subtotal
        try {
          await updateCartItemWithSubtotal(userId, item.id, item.quantity, subtotal);
        } catch (error) {
          console.error('Failed to update item in backend:', error);
        }
      }
    };

    saveCartItems();
  }, [cartItems, userId]);

  // Simulate an order placement function
  const placeOrder = async () => {
    try {
      // Simulate API call for placing order
      console.log('Order is being placed...');
      // Simulate success
      return true;
    } catch (error) {
      console.error('Error placing order:', error);
      return false;
    }
  };

  // Handle order placement logic
  const handleOrderPlacement = async () => {
    const orderSuccessful = await placeOrder(); // Call the function to simulate order placement

    if (orderSuccessful) {
      clearCartAfterOrder(); // Clear the cart once the order is placed
      alert('Order placed successfully!');
    } else {
      alert('Failed to place the order. Please try again.');
    }
  };

  // Handle click for Place Order button
  const handlePlaceOrder = () => {
    navigate('/order'); // Navigate to the Order page
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty. Start adding items!</p>;
  }

  return (
    <div className="cart-page">
      <h1 id='head'>My Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Start adding items!</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                {/* <img src={item.image} alt={item.name} className="cart-item-image" /> */}
                <Link to={`/ProductPage${item.id}`}>
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                </Link>
                <div className="cart-item-details">
                  {/* <p>Name: {item.name}</p> */}
                  <p>
                        <strong>Name:</strong>{" "}
                        <Link to={`/ProductPage${item.id}`}>{item.name}</Link>
                      </p>
                  <p>Price: ₹{item.price} {item.discount && <span id='span1'>{item.discount}</span>}</p>
                  <div className="quantity-control">
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          removeFromCart(item.id);
                          updateCartItemWithSubtotal(userId, item.id, item.quantity - 1, (item.price * (item.quantity - 1)));
                        }
                      }}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => {
                      addToCart(item);
                      updateCartItemWithSubtotal(userId, item.id, item.quantity + 1, (item.price * (item.quantity + 1)));
                    }} aria-label={`Increase quantity of ${item.name}`}>
                      +
                    </button>
                  </div>
                  {item.size && <p>Size: {item.size}</p>}
                  {item.color && <p>Color: {item.color}</p>}
                  <p>Quantity: {item.quantity}</p>
                  <p>Sub-Total: ₹{item.price * item.quantity}</p>
                  <button 
                    className="remove-button" 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to remove this item?')) {
                        removeProductFromCart(item.id);
                      }
                    }}
                  >
                    Remove Item
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <h2>Total Amount: ₹{calculateTotalAmount()}</h2>
          </div>

          {/* Place Order Button */}
          <button 
            className="place-order-button" 
            onClick={handlePlaceOrder} 
            disabled={cartItems.length === 0} // Disabled if no items in cart
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
