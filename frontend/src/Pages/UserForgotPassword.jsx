// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import './UserLogin.css'; // Using the same CSS for styling
// import './UserForgotPassword.css';

// function UserForgotPassword() {
//     const [email, setEmail] = useState('');
//     const [otpSent, setOtpSent] = useState(false);
//     const [otp, setOtp] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const navigate = useNavigate();
  
//     const handleSendOtp = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/forgot-send-otp', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ email }),
//         });
  
//         const data = await response.json();
  
//         if (response.ok) {
//           setOtpSent(true);
//           alert('OTP sent to your email.');
//         } else {
//           alert(data.message || 'Error sending OTP.');
//         }
//       } catch (error) {
//         console.error('Error sending OTP:', error);
//         alert('An error occurred. Please try again.');
//       }
//     };
  
//     const handleVerifyOtpAndResetPassword = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/forgot-reset-password', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ email, otp, newPassword }),
//         });
  
//         const data = await response.json();
  
//         if (response.ok) {
//           alert('Password reset successfully!');
//           navigate('/Userlogin');
//         } else {
//           alert(data.message || 'Invalid OTP or error resetting password.');
//         }
//       } catch (error) {
//         console.error('Error resetting password:', error);
//         alert('An error occurred. Please try again.');
//       }
//     };
  
//     return (
//         <div className="forgot-password-container">
//         <div>
//           <button id='back1' className="back-button1" onClick={() => navigate("/Userlogin")}> X </button>
//           {!otpSent ? (
//             <>
//               <h2>Forgot Password</h2>
              
//               <h4>Enter your email</h4>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <button onClick={handleSendOtp}>Send OTP</button>
//             </>
//           ) : (
//             <>
//               <h4>Enter OTP</h4>
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 required
//               />
//               <h4>Enter New Password</h4>
//               <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//               />
//               <button onClick={handleVerifyOtpAndResetPassword}>Reset Password</button>
//             </>
//           )}
//         </div>
//       </div>
//     );
//   }

// export default UserForgotPassword;





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import './UserForgotPassword.css';

function UserForgotPassword() {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    // Function to send OTP
    const handleSendOtp = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.FORGOT_SEND_OTP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setOtpSent(true);
                alert('OTP sent to your email.');
            } else {
                alert(data.message || 'Error sending OTP.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert('An error occurred. Please try again.');
        }
    };

    // Function to verify OTP
    const handleVerifyOtp = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.FORGOT_VERIFY_OTP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (response.ok) {
                setOtpVerified(true);
                alert('OTP verified successfully.');
            } else {
                alert(data.message || 'Invalid OTP.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            alert('An error occurred. Please try again.');
        }
    };

    // Function to reset password after OTP is verified and passwords match
    const handleResetPassword = async () => {
        // Check if the passwords match
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch(API_ENDPOINTS.FORGOT_RESET_PASSWORD, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Password reset successfully!');
                navigate('/Userlogin');
            } else {
                alert(data.message || 'Error resetting password.');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="forgot-password-container">
            <div>
                <button id='back1' className="back-button1" onClick={() => navigate("/Userlogin")}> X </button>
                {!otpSent ? (
                    <>
                        <h2>User Forgot Password</h2>
                        <h4>Enter your email</h4>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button onClick={handleSendOtp}>Send OTP</button>
                    </>
                ) : (
                    <>
                        <h4>Enter OTP</h4>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                        {!otpVerified ? (
                            <button onClick={handleVerifyOtp}>Verify OTP</button>
                        ) : (
                            <>
                                <h4>Enter New Password</h4>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        setPasswordError('');
                                    }}
                                    required
                                />
                                <h4>Confirm New Password</h4>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setPasswordError('');
                                    }}
                                    required
                                />
                                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                                <button onClick={handleResetPassword}>Reset Password</button>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default UserForgotPassword;
