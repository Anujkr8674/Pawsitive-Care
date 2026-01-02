import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import './AdminReg.css';

const AdminRegUnique = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        uniqueFirstName: '',
        uniqueLastName: '',
        uniqueAdminId: '',
        uniqueEmail: '',
        uniqueMobileNumber: '',
        uniqueDob: '',
        uniquePassword: '',
        uniqueConfirmPassword: '',
    });


    const [otp, setOtp] = useState(''); // Added OTP state
    const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent
    const [otpVerified, setOtpVerified] = useState(false); // Track if OTP is verified

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'uniqueEmail') {
            setFormData({ ...formData, [name]: value.toLowerCase() });
        } else if (name === 'uniqueMobileNumber') {
            setFormData({ ...formData, [name]: value.replace(/\D/, '') });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        const { uniqueEmail, uniqueMobileNumber, uniqueDob, uniquePassword, uniqueConfirmPassword } = formData;
        const newErrors = {};

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!uniqueEmail || !emailRegex.test(uniqueEmail)) {
            newErrors.uniqueEmail = 'Please enter a valid email address.';
        }

        // Mobile Number validation (assuming 10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!uniqueMobileNumber || !phoneRegex.test(uniqueMobileNumber)) {
            newErrors.uniqueMobileNumber = 'Please enter a valid 10-digit mobile number (numbers only).';
        }

        // Date of Birth validation
        if (uniqueDob) {
            const dob = new Date(uniqueDob);
            const today = new Date();
            if (dob > today) {
                newErrors.uniqueDob = 'Date of birth cannot be in the future.';
            }
        }

        // Password confirmation
        if (uniquePassword !== uniqueConfirmPassword) {
            newErrors.uniqueConfirmPassword = 'Passwords do not match.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



        // Function to send OTP
    const handleSendOtp = async () => {
        try {
            const response = await axios.post(API_ENDPOINTS.OTP_SEND, { email: formData.uniqueEmail });
            alert(response.data.message);
            setOtpSent(true);
        } catch (error) {
            alert('Error sending OTP');
        }
    };

    // Function to verify OTP
    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post(API_ENDPOINTS.OTP_VERIFY, { email: formData.uniqueEmail, otp });
            alert(response.data.message);
            setOtpVerified(true);
        } catch (error) {
            alert('Invalid OTP');
        }
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        if (!otpVerified) {
            alert('Please verify OTP before registration.');
            return;
        }

        try {
            const response = await axios.post(API_ENDPOINTS.ADMIN_REGISTER, {
                firstName: formData.uniqueFirstName,
                lastName: formData.uniqueLastName,
                adminId: formData.uniqueAdminId,
                email: formData.uniqueEmail,
                mobileNumber: formData.uniqueMobileNumber,
                dob: formData.uniqueDob,
                password: formData.uniquePassword,
                confirmPassword: formData.uniqueConfirmPassword,
            });
            setSuccess(response.data.message);
            setErrors({});
            setFormData({
                uniqueFirstName: '',
                uniqueLastName: '',
                uniqueAdminId: '',
                uniqueEmail: '',
                uniqueMobileNumber: '',
                uniqueDob: '',
                uniquePassword: '',
                uniqueConfirmPassword: '',
            });
            alert('Admin registered successfully!');
            
            // Redirect to the login page after successful registration
            navigate('/adminlogin');
        } catch (error) {
            setErrors({ general: error.response?.data?.message || 'Server error' });
            setSuccess('');
            alert(error.response?.data?.message || 'Server error');
        }
    };

    const handleCreateAccount = () => {
        navigate('/adminlogin');
    };

    return (
        <div className="back1">
        <div className="adminRegUniqueContainer" id='admin11'>
            <h2 className="adminRegUniqueHeading">Admin Registration</h2>
            {/* Display errors and success messages */}
            {errors.general && <p className="adminRegUniqueError">{errors.general}</p>}
            <form onSubmit={handleSubmit} className="adminRegUniqueForm">
                <div className="adminRegUniqueField">
                    <button type="button" id="new1" className="create-Account" onClick={handleCreateAccount}>Back</button>
                    <label htmlFor="uniqueFirstName">First Name:</label>
                    <input
                        type="text"
                        name="uniqueFirstName"
                        value={formData.uniqueFirstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="adminRegUniqueField">
                    <label htmlFor="uniqueLastName">Last Name:</label>
                    <input
                        type="text"
                        name="uniqueLastName"
                        value={formData.uniqueLastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="adminRegUniqueField">
                    <label htmlFor="uniqueUserId">User ID:</label>
                    <input
                        type="text"
                        name="uniqueAdminId"
                        value={formData.uniqueAdminId}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="adminRegUniqueField">
                    <label htmlFor="uniqueMobileNumber">Mobile Number:</label>
                    <input
                        type="tel"
                        name="uniqueMobileNumber"
                        value={formData.uniqueMobileNumber}
                        onChange={handleChange}
                        maxLength={10}
                        minLength={10}
                        required
                    />
                    {errors.uniqueMobileNumber && <p className="adminRegUniqueError">{errors.uniqueMobileNumber}</p>}
                </div>
                <div className="adminRegUniqueField">
                    <label htmlFor="uniqueDob">Date of Birth:</label>
                    <input
                        type="date"
                        name="uniqueDob"
                        value={formData.uniqueDob}
                        onChange={handleChange}
                        required
                    />
                    {errors.uniqueDob && <p className="adminRegUniqueError">{errors.uniqueDob}</p>}
                </div>

                {/* <div className="adminRegUniqueField">
                    <label htmlFor="uniqueEmail">Email:</label>
                    <input
                        type="email"
                        name="uniqueEmail"
                        value={formData.uniqueEmail}
                        onChange={handleChange}
                        required
                    />
                    {errors.uniqueEmail && <p className="adminRegUniqueError">{errors.uniqueEmail}</p>}
                </div> */}


                    <div className="adminRegUniqueField">
                        <label htmlFor="uniqueEmail">Email:</label>
                        <input
                            type="email"
                            name="uniqueEmail"
                            value={formData.uniqueEmail}
                            onChange={handleChange}
                            required
                        />
                        {errors.uniqueEmail && <p className="error">{errors.uniqueEmail}</p>}
                        <br/>
                        {!otpSent ? (
                            <button id='otp' type="button" onClick={handleSendOtp}>Get OTP</button>
                        ) : (
                            <div>
                                <br/>
                                <label>Enter OTP:</label>
                                <input
                                    type="text"
                                    maxLength={6}
                                    minLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                                <br/>
                                <button id='otp' type="button" onClick={handleVerifyOtp}>Verify OTP</button>
                            </div>
                        )}
                    </div>


                <div className="adminRegUniqueField">
                    <label htmlFor="uniquePassword">Password:</label>
                    <input
                        type="password"
                        name="uniquePassword"
                        value={formData.uniquePassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="adminRegUniqueField">
                    <label htmlFor="uniqueConfirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        name="uniqueConfirmPassword"
                        value={formData.uniqueConfirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.uniqueConfirmPassword && <p className="adminRegUniqueError">{errors.uniqueConfirmPassword}</p>}
                </div>
                <button type="submit" className="adminRegUniqueButton">Register Admin</button>
            </form>
        </div>
        </div>
    );
};

export default AdminRegUnique;
