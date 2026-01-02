import React, { useState, useEffect } from 'react';
import './RegistrationForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

function RegistrationForm() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userId: '',
    email: '',
    mobileNumber: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(API_ENDPOINTS.OTP_SEND, { email: formData.email });
      alert(response.data.message);
      setOtpSent(true);
    } catch (error) {
      alert('Error sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(API_ENDPOINTS.OTP_VERIFY, { email: formData.email, otp });
      alert(response.data.message);
      setOtpVerified(true);
    } catch (error) {
      alert('Invalid OTP');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Convert email to lowercase and restrict mobile/otp to digits
    if (name === 'email') {
      setFormData({ ...formData, [name]: value.toLowerCase() });
    } else if (name === 'mobileNumber' || name === 'otp') {
      setFormData({ ...formData, [name]: value.replace(/\D/, '') });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const { mobileNumber, dateOfBirth, password, confirmPassword } = formData;
    const newErrors = {};

    // Mobile number validation
    const phoneRegex = /^\d{10}$/;
    if (!mobileNumber || !phoneRegex.test(mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }

    // Date of birth validation
    if (dateOfBirth) {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      if (dob > today) {
        newErrors.dateOfBirth = 'Date of birth cannot be in the future.';
      }
    }

    // Password confirmation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!otpVerified) {
      alert('Please verify OTP before registration.');
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.USER_REGISTRATION_SUBMIT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
        alert('User registered successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          userId: '',
          email: '',
          mobileNumber: '',
          dateOfBirth: '',
          password: '',
          confirmPassword: '',
        });

        // Redirect to the login page after successful registration
        navigate('/userlogin');
      } else {
        console.error('Registration error:', data.message);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to register user.');
    }

    console.log('Form Data:', formData);
  };

  return (
    <div className="registration-container11" id='regs'>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group12">
          <div className="h2">
            <h2>Registration</h2>
            <button id='backX' className="backX" onClick={()=>navigate("/userlogin")}>X</button>
          </div>
          <br /><br />

          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group12">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group12">
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group12">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            maxLength={10}
            minLength={10}
            required
          />
          {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}
        </div>

        <div className="form-group12">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
          {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
        </div>

        <div className="form-group12">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
          {!otpSent ? (
            <button id='otp' type="button" onClick={handleSendOtp}>Get OTP</button>
          ) : (
            
            <div className="form-group12"><br/>
              <label>Enter OTP:</label>
              <input
                type="text"
                maxLength={6}
                minLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button id='otp' type="button" onClick={handleVerifyOtp}>Verify OTP</button>
            </div>
          )}
        </div>

        <div className="form-group12">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group12">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        <button type="submit" className="registration-button">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
