// import React from 'react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import './OrderConfirmation.css'; // Import the CSS file for styling

const OrderConfirmation = () => {
  const [orderData, setOrderData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Get order data from location state or localStorage
    if (location.state && location.state.order) {
      setOrderData(location.state.order);
      // Also save to localStorage for persistence
      localStorage.setItem('lastOrder', JSON.stringify(location.state.order));
    } else {
      // Try to get from localStorage
      const lastOrder = localStorage.getItem('lastOrder');
      if (lastOrder) {
        setOrderData(JSON.parse(lastOrder));
      }
    }
  }, [location]);

  const handleContinueShopping = () => {
    // Navigate back to the homepage or shopping page
    navigate('/shop');
  };

  return (
    <div className="order-confirmation-container">
      <h2 className="order-confirmation-heading">Order Placed Successfully!</h2>
      <p className="order-confirmation-message">
        Thank you for your purchase. Your order has been placed and is being processed.
      </p>
      
      {orderData && orderData.orderType === 'Postpaid' && (
        <div className="postpaid-message">
          <p>Your order will be processed. Payment will be collected on delivery.</p>
        </div>
      )}

      {orderData && (
        <div className="order-details">
          <h3>Order Details</h3>
          <p><strong>Order Type:</strong> {orderData.orderType}</p>
          <p><strong>Total Amount:</strong> ₹{orderData.totalAmount}</p>
          {orderData.orderId && <p><strong>Order ID:</strong> {orderData.orderId}</p>}
          {orderData.paymentProof && (
            <div className="payment-proof-display">
              <p><strong>Payment Proof:</strong></p>
              <img 
                src={API_ENDPOINTS.UPLOAD_ORDERS(orderData.paymentProof)} 
                alt="Payment Proof" 
                style={{ maxWidth: '300px', maxHeight: '300px', marginTop: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
          )}
        </div>
      )}

      <button className="continue-shopping-button" onClick={handleContinueShopping}>
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderConfirmation;
