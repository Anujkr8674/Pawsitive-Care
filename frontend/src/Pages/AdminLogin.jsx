
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Make sure axios is installed
// import './AdminLogin.css';

// const AdminLogin = () => {
//   const [identifier, setIdentifier] = useState(''); // Use 'identifier' for AdminID or Email
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate(); // Initialize useNavigate

//   useEffect(() => {
//     // Scroll to the top when the component mounts
//     window.scrollTo(0, 0);
//   }, []);

//   const handleCreateAccount = () => {
//     navigate('/AdminReg'); // Redirect to the registration form
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(API_ENDPOINTS.ADMIN_LOGIN, { identifier, password });
//       // Store the token and update local storage
//       localStorage.setItem('adminToken', response.data.token);
//       setSuccess('Login successful! Redirecting...');

//       // Redirect after a brief pause
//       setTimeout(() => {
//         navigate('/dashboard'); // Redirect to the dashboard
//       }, 1000); // Wait for 1 second before navigating

//       setError(''); // Clear error message if login is successful
//     } catch (error) {
//       setError(error.response?.data?.message || 'Server error');
//       setSuccess('');
//     }
//   };

//   const handleBack = () => {
//     navigate("/"); // Navigate to the previous page
//   };

//   return (
//     <div className="login-container11">
//       <form className="login-form111" onSubmit={handleLogin}>
//         <h2>Admin Login</h2>
//         {error && <p className="error">{error}</p>}
//         {success && <p className="success">{success}</p>}
//         <div className="form-group111">
//           <button id='back1' className="back-button1" onClick={handleBack}>X</button>
//           <h4>Admin ID </h4> {/* Updated label */}
//           <input
//             type="text"
//             id="identifier" // Changed to 'identifier'
//             value={identifier}
//             placeholder='Enter your Admin ID or Email'
//             onChange={(e) => setIdentifier(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group111">
//           <h4>Password</h4>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             placeholder="Enter your Password"
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <br /><br />
        
//         <button type="submit" className="login-button">Login</button>
//         <h6>
//           Forgot your password?
//           <button type="button" id="forgot"  className="forgot-password-button"  onClick={()=>navigate("/AdminForgotPassword")}>
//             Forgot Password
//           </button>
//         </h6>
//         <h6>Don't have an account?
//           <button type="button" id='create' className='create-Account' onClick={handleCreateAccount}>Create Account</button>
//         </h6>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;






import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is installed
import { API_ENDPOINTS } from '../config/api';
import './AdminLogin.css';

const AdminLogin = () => {
  const [identifier, setIdentifier] = useState(''); // Use 'identifier' for AdminID or Email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleCreateAccount = () => {
    navigate('/AdminReg'); // Redirect to the registration form
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.post(API_ENDPOINTS.ADMIN_LOGIN, { identifier, password });

      // Validate response data
      if (!response.data.token || !response.data.adminId) {
        setError('Invalid response from server. Please try again.');
        return;
      }

      // Store the token and adminId in local storage
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminId', response.data.adminId); // Save adminId
      if (response.data.email) {
        localStorage.setItem('email', response.data.email);
      }

      setSuccess('Login successful! Redirecting...');

      // Redirect after a brief pause
      setTimeout(() => {
        navigate('/dashboard'); // Redirect to the dashboard
      }, 1000); // Wait for 1 second before navigating

    } catch (error) {
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 429) {
          setError('Too many login attempts. Please wait a moment and try again.');
        } else if (error.response.status === 401) {
          setError(error.response.data?.message || 'Invalid Admin ID/Email or Password');
        } else if (error.response.status === 400) {
          setError(error.response.data?.message || 'Please provide both Admin ID/Email and Password');
        } else {
          setError(error.response.data?.message || 'Server error. Please try again.');
        }
      } else if (error.request) {
        // Request made but no response received
        setError('Network error. Please check your connection and try again.');
      } else {
        // Something else happened
        setError('An error occurred. Please try again.');
      }
      setSuccess('');
    }
  };

  const handleBack = () => {
    navigate("/"); // Navigate to the previous page
  };

  return (
    <div className="login-container11">
      <form className="login-form111" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <div className="form-group111">
          <button id='back1' className="back-button1" onClick={handleBack}>X</button>
          <h4>Admin ID </h4> {/* Updated label */}
          <input
            type="text"
            id="identifier" // Changed to 'identifier'
            value={identifier}
            placeholder='Enter your Admin ID or Email'
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div className="form-group111">
          <h4>Password</h4>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br /><br />
        
        <button type="submit" className="login-button">Login</button>
        <h6>
          Forgot your password?
          <button type="button" id="forgot"  className="forgot-password-button"  onClick={()=>navigate("/AdminForgotPassword")}>
            Forgot Password
          </button>
        </h6>
        <h6>Don't have an account?
          <button type="button" id='create' className='create-Account' onClick={handleCreateAccount}>Create Account</button>
        </h6>
      </form>
    </div>
  );
};

export default AdminLogin;
