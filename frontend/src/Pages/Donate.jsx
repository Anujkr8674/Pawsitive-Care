import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';
import './Donate.css'; 

function DonationForm() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [donationType, setDonationType] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    upiId: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [petSupplies, setPetSupplies] = useState('');

  const handleDonationTypeChange = (event) => setDonationType(event.target.value);
  const handleAmountChange = (event) => setAmount(event.target.value);
  const handlePaymentMethodChange = (event) => setPaymentMethod(event.target.value);
  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };
  const handleItemChange = (event) => setSelectedItem(event.target.value);
  const handleQuantityChange = (event) => setQuantity(event.target.value);
  const handlePetSuppliesChange = (event) => setPetSupplies(event.target.value);


  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prevData => ({ ...prevData, [name]: value }));
  // };


  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === 'phone'
          ? value.replace(/\D/g, '') // Remove any non-digit characters for phone
          : name === 'email'
          ? value.toLowerCase() // Convert email to lowercase
          : value // For other fields, use the value as is
    }));
  };
  



  const validateForm = () => {
    const newErrors = {};
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const phoneRegex = /^[0-9]{10}$/; // Assuming 10-digit phone numbers

  
    // Check if donationType is selected
    if (!donationType) {
      newErrors.donationType = 'Please select a donation type.';
    }
  
    // Common field validations
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required.';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required.';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.';
     }

    // if (!formData.email || !emailRegex.test(newErrors.email)) newErrors.email = "A valid email is required.";
    // if (!formData.phone || !phoneRegex.test(newErrors.phone)) newErrors.phone = "A valid phone number is required.";
  
    // Conditional validations based on donationType
    if (donationType === 'monetary') {
      if (!amount) {
        newErrors.amount = 'Amount is required for monetary donations.';
      }
      if (!paymentMethod) {
        newErrors.paymentMethod = 'Payment method is required.';
      }
      if (paymentMethod === 'Card') {
        if (!paymentDetails.cardNumber) {
          newErrors.cardNumber = 'Card number is required.';
        }
        if (!paymentDetails.cardExpiry) {
          newErrors.cardExpiry = 'Card expiry date is required.';
        }
        if (!paymentDetails.cardCVV) {
          newErrors.cardCVV = 'Card CVV is required.';
        }
      } else if (paymentMethod === 'UPI') {
        if (!paymentDetails.upiId) {
          newErrors.upiId = 'UPI ID is required.';
        }
      }
    } else if (donationType === 'supplies') {
      if (!selectedItem) {
        newErrors.selectedItem = 'Selected item is required.';
      }
      if (!quantity) {
        newErrors.quantity = 'Quantity is required.';
      }
      if (!petSupplies) {
        newErrors.petSupplies = 'Pet supplies details are required.';
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  



  const handleSubmit = async (event) => {
    event.preventDefault();


     // Validate the form data
  if (!validateForm()) {
    return; // Exit if there are validation errors
  }

    const donationData = {
      ...formData,
      donationType,
      amount,
      paymentMethod,
      paymentDetails,
      selectedItem,
      quantity,
      petSupplies,
    };

     // const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const userId = localStorage.getItem('userId');
  // const email = localStorage.getItem('email');

  // console.log("Token in Donate:", token); // Log the token value

  // if ( !token) {
    if (!token || !userId) {
    alert('User authentication details are missing. Please log in again.');
    return;
  }

    try {

      const updatedDonationData = { ...donationData, userId };
      const response = await fetch(API_ENDPOINTS.USER_DONATIONS, {
        method: 'POST',
        headers: {

          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'application/json',
        },
        // body: JSON.stringify(donationData),
        body: JSON.stringify(updatedDonationData),
      });

      if (response.ok) {
        alert('Donation data submitted successfully!');
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        });
        setAmount('');
        setPaymentDetails({
          cardNumber: '',
          cardExpiry: '',
          cardCVV: '',
          upiId: '',
        });
        setPaymentMethod('');
        setSelectedItem('');
        setQuantity('');
        setPetSupplies('');
        setErrors({}); // Clear errors on successful submission
      } else {
        alert('Failed to submit donation data.');
      }
    } catch (error) {
      console.error('Error submitting donation data:', error);
      alert('Error submitting donation data.');
    }
  };

  return (
    <div className="donation-form-container">
      <h2>Donation Form</h2>
      <form onSubmit={handleSubmit}>
        <h4 id='h4'>Full Name</h4>
        <div className="form-group3" id='div'>
          <div className="div1">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <small id='s1'>First Name</small>
            {errors.firstName && <div className="error">{errors.firstName}</div>}
          </div>
          <div className="div2">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <small id='s1'>Last Name</small>
            {errors.lastName && <div className="error">{errors.lastName}</div>}
          </div>
        </div>

        <h4 id='h4'>Contact Info</h4>
        <div className="form-group3" id='div'>
          <div className="div1">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <small id='s1'>Email</small>
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="div2">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              maxLength={10}
              minLength={10}
              onChange={handleChange}
              required
            />
            <small id='s1'>Phone</small>
            {errors.phone && <div className="error">{errors.phone}</div>}
          </div>
        </div>

        <br/>
        <div className="form-group3">
          <label htmlFor="comments">Comments:</label>
          <input
            type="text"
            id="comments"
            name="comments"
          />
        </div>

        <br/>
        <div className="form-group3">
          <label>Choose How You Want to Help:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="donationType"
                value="monetary"
                checked={donationType === 'monetary'}
                onChange={handleDonationTypeChange}
                required
              />
              Monetary
            </label><br/>
            <label>
              <input
                type="radio"
                name="donationType"
                value="supplies"
                checked={donationType === 'supplies'}
                onChange={handleDonationTypeChange}
                required
              />
              Supplies Foods
            </label>
          </div>
          {errors.donationType && <div className="error">{errors.donationType}</div>}
        </div>
        <br/>

        {donationType === 'monetary' && (
          <div className="monetary-donation-section">
            <div className="form-group3">
              <label>
                Amount:
                <input
                  id="amount"
                  type="text"
                  name="amount"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </label>
              {errors.amount && <div className="error">{errors.amount}</div>}
            </div>

            <br/>
            <div>
              <label>
                Payment Method:
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <option value="">Select Payment Method</option>
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                </select>
              </label>
              {errors.paymentMethod && <div className="error">{errors.paymentMethod}</div>}
            </div>
            <br/>

            {paymentMethod === 'Card' && (
              <div>
                <label>
                  Card Number:
                  <input
                    id="cardNumber"
                    type="text"
                    name="cardNumber"
                    maxLength={16}
                    minLength={16}
                    value={paymentDetails.cardNumber}
                    onChange={handlePaymentDetailsChange}
                  />
                </label>
                {errors.cardNumber && <div className="error">{errors.cardNumber}</div>}
                <br/>
                <label>
                  Expiry Date:
                  <input
                    id="cardExpiry"
                    type="text"
                    placeholder='MM/YY'
                    name="cardExpiry"
                    maxLength={5}
                    minLength={5}
                    value={paymentDetails.cardExpiry}
                    onChange={handlePaymentDetailsChange}
                  />
                </label>
                {errors.cardExpiry && <div className="error">{errors.cardExpiry}</div>}
                <br/>
                <label>
                  CVV:
                  <input
                    id="cardCVV"
                    type="text"
                    name="cardCVV"
                    minLength={3}
                    maxLength={3}
                    value={paymentDetails.cardCVV}
                    onChange={handlePaymentDetailsChange}
                  />
                </label>
                {errors.cardCVV && <div className="error">{errors.cardCVV}</div>}
                <br/>
                <label>
                  OTP:
                  <input
                    id="otp"
                    type="text"
                    name="otp"
                    maxLength={6}
                    minLength={6}
                    value={paymentDetails.otp}
                    onChange={handlePaymentDetailsChange}
                  />
                </label>
              </div>
            )}

            {paymentMethod === 'UPI' && (
              <div>
                <label>
                  UPI ID:
                  <input
                    id="upiId"
                    type="text"
                    name="upiId"
                    value={paymentDetails.upiId}
                    onChange={handlePaymentDetailsChange}
                  />
                </label>
                {errors.upiId && <div className="error">{errors.upiId}</div>}
              </div>
            )}
          </div>
        )}

        {donationType === 'supplies' && (
          <div className="supplies-donation-section">
            <div className="form-group3">
              <label htmlFor="selectedItem">Select Item:</label>
              <select
                id="selectedItem"
                name="selectedItem"
                value={selectedItem}
                onChange={handleItemChange}
                required
              >
                <option value="" disabled>Select an Item</option>
                <option value="petFood">Pet Food</option>
                <option value="toys">Toys</option>
                <option value="bedding">Bedding</option>
                <option value="medications">Medications</option>
                <option value="cleaningSupplies">Cleaning Supplies</option>
              </select>
              {errors.selectedItem && <div className="error">{errors.selectedItem}</div>}
            </div>

            <div className="form-group3">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                maxLength={3}
                onChange={handleQuantityChange}
                required
              />
              {errors.quantity && <div className="error">{errors.quantity}</div>}
              
            </div>

            <div className="form-group3">
              <label htmlFor="petSupplies">Pet Supplies (Details):</label>
              <input
                type="text"
                id="petSupplies"
                name="petSupplies"
                value={petSupplies}
                onChange={handlePetSuppliesChange}
                required
              />
              {errors.petSupplies && <div className="error">{errors.petSupplies}</div>}
            </div>
          </div>
        )}

        <br/><br/>

        <div className="form-group3">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default DonationForm;
