
import React, { useContext, useState, useEffect } from 'react';
import './order.css';
import { CartContext } from '../CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { API_ENDPOINTS } from '../config/api';

function Order() {
  const { cartItems, calculateTotalAmount, clearCartAfterOrder } = useContext(CartContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: '',
    email: '',
    mobile: '',
    pincode: '',
    address: '',
    locality: '',
    landmark: '',
    city: '',
    state: '',
    alternateMobile: '',
  });

  const [orderType, setOrderType] = useState('Prepaid'); // Default order type
  const [errors, setErrors] = useState({});
  const [paymentProof, setPaymentProof] = useState(null);
  const [paymentProofPreview, setPaymentProofPreview] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setAddress((prevAddress) => ({
        ...prevAddress,
        [name]: value.toLowerCase(),
      }));
      return;
    }

    if (['mobile', 'pincode', 'alternateMobile'].includes(name)) {
      const digitOnlyValue = value.replace(/\D/g, ''); // Only allow digits
      setAddress((prevAddress) => ({
        ...prevAddress,
        [name]: digitOnlyValue,
      }));
    } else {
      setAddress((prevAddress) => ({
        ...prevAddress,
        [name]: value,
      }));
    }
  };

  const handleOrderTypeChange = (e) => {
    setOrderType(e.target.value);
    // Clear payment proof when switching to Postpaid
    if (e.target.value === 'Postpaid') {
      setPaymentProof(null);
      setPaymentProofPreview('');
    }
  };

  const handlePaymentProofChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      setPaymentProof(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentProofPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    let formErrors = {};

    if (!address.name.trim()) formErrors.name = 'Name is required';
    if (!address.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) formErrors.email = 'Invalid email address';
    if (!address.mobile.match(/^\d{10}$/)) formErrors.mobile = 'Mobile number must be 10 digits';
    if (!address.pincode.match(/^\d{6}$/)) formErrors.pincode = 'Pincode must be 6 digits';
    if (!address.address.trim()) formErrors.address = 'Address is required';
    if (!address.locality.trim()) formErrors.locality = 'Locality is required';
    if (!address.landmark.trim()) formErrors.landmark = 'Landmark is required';
    if (!address.city.trim()) formErrors.city = 'City is required';
    if (!address.state.trim()) formErrors.state = 'State is required';

    // Validate payment proof for prepaid orders
    if (orderType === 'Prepaid' && !paymentProof) {
      formErrors.paymentProof = 'Payment proof is required for Prepaid orders';
    }

    return formErrors;
  };

  const handleConfirmOrder = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      alert('User authentication details are missing. Please log in again.');
      return;
    }

    // Prevent cart save operations during order placement
    localStorage.setItem('orderInProgress', 'true');

    const cartItemsWithSubtotal = cartItems.map(item => ({
      ...item,
      subtotal: item.price * item.quantity,
    }));

    const totalAmount = calculateTotalAmount(); // Calculate total amount once

    // Retry logic for order placement
    const placeOrderWithRetry = async (retries = 3) => {
      for (let i = 0; i < retries; i++) {
        try {
          // Create FormData for file upload
          const formData = new FormData();
          formData.append('userId', userId);
          formData.append('cartItems', JSON.stringify(cartItemsWithSubtotal));
          formData.append('address', JSON.stringify(address));
          formData.append('totalAmount', totalAmount);
          formData.append('orderType', orderType);
          
          // Append payment proof if prepaid order
          if (orderType === 'Prepaid' && paymentProof) {
            formData.append('paymentProof', paymentProof);
          }

          const response = await fetch(API_ENDPOINTS.USER_ORDERS, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              // Don't set Content-Type for FormData, browser will set it with boundary
            },
            body: formData,
          });

          if (response.status === 429) {
            // Rate limited - wait and retry
            const waitTime = Math.pow(2, i) * 1000; // Exponential backoff: 1s, 2s, 4s
            if (i < retries - 1) {
              console.warn(`Rate limited. Retrying in ${waitTime}ms... (attempt ${i + 1}/${retries})`);
              await new Promise(resolve => setTimeout(resolve, waitTime));
              continue;
            } else {
              throw new Error('Too many requests. Please wait a moment and try again.');
            }
          }

          if (response.ok) {
            const data = await response.json();
            
            // Prepare order data to pass to confirmation page
            const orderInfo = {
              orderId: data.orderId || data.order?._id,
              totalAmount: totalAmount,
              orderType: orderType,
              address: address,
              cartItems: cartItemsWithSubtotal,
              paymentProof: data.order?.paymentProof || data.paymentProof || null // Include payment proof path
            };

            // Clear the cart after successful order
            await clearCartAfterOrder();

            // Reset form
            setAddress({
              name: '',
              email: '',
              mobile: '',
              pincode: '',
              address: '',
              locality: '',
              landmark: '',
              city: '',
              state: '',
              alternateMobile: '',
            });
            setErrors({});
            setOrderType('Prepaid'); // Reset order type to default
            setPaymentProof(null);
            setPaymentProofPreview('');

            // Remove order in progress flag
            localStorage.removeItem('orderInProgress');
            
            // Redirect to order confirmation page with order data
            navigate('/OrderConfirmation', { state: { order: orderInfo } });
            return; // Success, exit
          } else {
            const errorData = await response.json().catch(() => ({ message: 'Failed to place order' }));
            if (i === retries - 1) {
              // Last retry failed
              alert(errorData.message || 'Failed to place the order. Please try again.');
            } else {
              // Retry on other errors
              const waitTime = Math.pow(2, i) * 1000;
              await new Promise(resolve => setTimeout(resolve, waitTime));
              continue;
            }
          }
        } catch (error) {
          if (i === retries - 1) {
            // Last retry failed
            alert(error.message || 'An error occurred while placing the order. Please try again later.');
          } else {
            // Retry on error
            const waitTime = Math.pow(2, i) * 1000;
            await new Promise(resolve => setTimeout(resolve, waitTime));
            continue;
          }
        }
      }
    };

    try {
      await placeOrderWithRetry();
    } catch (error) {
      // Remove order in progress flag on error
      localStorage.removeItem('orderInProgress');
      alert(error.message || 'An error occurred while placing the order. Please try again later.');
    }
  };

  return (
    <div className="order-page">
      <h1>Review Your Order</h1>
      <br/><br/>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="order-item">
            {/* <img src={item.image} alt={item.name} className="order-item-image" /> */}
              <Link to={`/ProductPage${item.id}`}>
                <img src={item.image} alt={item.name} className="cart-item-image" />
              </Link>
            <div className="order-item-details">
              {/* <p>Name: {item.name}</p> */}
              <p>
                        <strong>Name:</strong>{" "}
                        <Link to={`/ProductPage${item.id}`}>{item.name}</Link>
              </p>
              <p>
                <span>Price: ₹{item.price}</span>
                {item.discount && <span id='span1' style={{ marginLeft: '20px' }}>{item.discount}</span>}
              </p>
              {item.size && <p>Size: {item.size}</p>}
              {item.color && <p>Colour: {item.color}</p>}
              <p>Quantity: {item.quantity}</p>
              <p>Sub-Total: ₹{item.price * item.quantity}</p>
            </div>
          </li>
        ))}
      </ul>


<br/><hr></hr><br/>
      <div className="order-total">
        <h2>Total Amount: ₹{calculateTotalAmount()}</h2>
      </div>

      <h2>Enter Your Address</h2>
      
      <div className="address-form">
      <div id='div1'>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={address.name}
          onChange={handleInputChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={address.email}
          onChange={handleInputChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        </div>

        <div id='div1'>
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={address.mobile}
          onChange={handleInputChange}
          maxLength={10}
        />
        {errors.mobile && <span className="error">{errors.mobile}</span>}

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleInputChange}
          maxLength={6}
        />
        {errors.pincode && <span className="error">{errors.pincode}</span>}
        </div>

        <div id='div1'>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={address.address}
          onChange={handleInputChange}
        />
        {errors.address && <span className="error">{errors.address}</span>}

        <input
          type="text"
          name="locality"
          placeholder="Locality"
          value={address.locality}
          onChange={handleInputChange}
        />
        {errors.locality && <span className="error">{errors.locality}</span>}
        </div>

        <div id='div1'>
        <input
          type="text"
          name="landmark"
          placeholder="Landmark"
          value={address.landmark}
          onChange={handleInputChange}
        />
        {errors.landmark && <span className="error">{errors.landmark}</span>}

        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleInputChange}
        />
        {errors.city && <span className="error">{errors.city}</span>}
        </div>

        <div id='div1'>
        <input
          type="text"
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleInputChange}
        />
        {errors.state && <span className="error">{errors.state}</span>}

        <input
          type="text"
          name="alternateMobile"
          placeholder="Alternate Mobile Number (Optional)"
          value={address.alternateMobile}
          onChange={handleInputChange}
          maxLength={10}
        />

        </div>

        {/* Dropdown for Order Type */}
        <div className="order-type-dropdown" id='div2'>
          <label htmlFor="orderType">Order Type: </label>
          <select id="orderType" value={orderType} onChange={handleOrderTypeChange}>
            <option value="Prepaid">Prepaid</option>
            <option value="Postpaid">Postpaid</option>
          </select>
        </div>

        {/* Payment Proof Upload and QR Code for Prepaid Orders */}
        {orderType === 'Prepaid' && (
          <>
            {/* QR Code Section */}
            <div className="qr-code-section-order" id='div2'>
              <h3>Scan QR Code to Pay</h3>
              <p className="payment-amount-order">Amount: ₹{calculateTotalAmount()}</p>
              <div className="qr-code-container-order">
                <QRCodeSVG
                  value={`upi://pay?pa=anujnick57@okicici&pn=${encodeURIComponent('Pawsitive Care')}&am=${calculateTotalAmount()}&cu=INR&tn=${encodeURIComponent('Order Payment')}`}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="payment-instruction-order">
                Scan this QR code with any UPI app to complete your payment
              </p>
            </div>

            {/* Payment Proof Upload Section */}
            <div className="payment-proof-section" id='div2'>
              <label htmlFor="paymentProof">Upload Payment Proof (Screenshot/Image): *</label>
              <input
                type="file"
                id="paymentProof"
                name="paymentProof"
                accept="image/*"
                onChange={handlePaymentProofChange}
                required
              />
              {errors.paymentProof && <span className="error">{errors.paymentProof}</span>}
              {paymentProofPreview && (
                <div className="payment-proof-preview">
                  <p>Preview:</p>
                  <img 
                    src={paymentProofPreview} 
                    alt="Payment Proof Preview" 
                    style={{ maxWidth: '300px', maxHeight: '300px', marginTop: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <button className="confirm-order-button" onClick={handleConfirmOrder}>
        Confirm Order
      </button>
    </div>
  );
}

export default Order;
