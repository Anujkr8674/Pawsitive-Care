
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './UserLogin.css';

// function UserLogin() {
//   const [identifier, setIdentifier] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       // Send identifier (either userId or email) and password to the backend
//       const response = await fetch('http://localhost:5000/api/user/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ identifier, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Store token in localStorage
//         localStorage.setItem('token', data.token);

//         // Retrieve the redirect path from localStorage or default to the dashboard
//         const redirectPath = localStorage.getItem('redirectPath') || '/UserDashboard';
        
//         // Remove the stored redirect path from localStorage after using it
//         localStorage.removeItem('redirectPath');

//         // Navigate to the originally requested page or the dashboard
//         navigate(redirectPath);
//       } else {
//         alert(data.message || 'Invalid User ID/Email or Password');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       alert('An error occurred during login. Please try again.');
//     }
//   };

//   const handleCreateAccount = () => {
//     navigate('/register');
//   };

//   const handleBack = () => {
//     navigate('/'); // Navigate to the home page
//   };

//   const handleForgotPassword = () => {
//     navigate('/ForgotPassword');
//   };

//   return (
//     <div className="login-container11">
//       <form className="login-form111" onSubmit={handleLogin}>
//         <h2>User Login</h2>
//         <div className="form-group111">
//           <button id="back1" className="back-button1" onClick={handleBack}>
//             X
//           </button>

//           {/* Single input field for either userId or email */}
//           <h4>User ID </h4>
//           <input
//             type="text"
//             id="identifier"
//             value={identifier}
//             onChange={(e) => setIdentifier(e.target.value)}
//             placeholder="Enter your User ID or Email"
//             required
//           />
//         </div>
//         <div className="form-group111">
//           <h4>Password</h4>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your Password"
//             required
//           />
//         </div>
//         <br /><br />
//         <button type="submit" className="login-button">Login</button>
//         <h6>
//           Forgot your password?
//           <button
//             type="button"
//             id="forgot"
//             className="forgot-password-button"
//             onClick={handleForgotPassword}
//           >
//             Forgot Password
//           </button>
//         </h6>
//         <h6>
//           Don't have an account?
//           <button
//             type="button"
//             id="create"
//             className="create-Account"
//             onClick={handleCreateAccount}
//           >
//             Create-Account
//           </button>
//         </h6>
//       </form>
//     </div>
//   );
// }

// export default UserLogin;





import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import './UserLogin.css';

function UserLogin() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send identifier (either userId or email) and password to the backend
      const response = await fetch(API_ENDPOINTS.USER_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Validate response data
        if (!data.token || !data.userId) {
          alert('Invalid response from server. Please try again.');
          return;
        }

        // Store both token and userId in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId); // Save userId
        if (data.email) {
          localStorage.setItem('email', data.email);
        }

        // Handle cartItems from backend response
        if (data.cartItems && Array.isArray(data.cartItems)) {
          localStorage.setItem('cartItems', JSON.stringify(data.cartItems));
        } else {
          // If no cart items, set empty array
          localStorage.setItem('cartItems', JSON.stringify([]));
        }

        // Dispatch custom event to notify CartContext about userId change
        window.dispatchEvent(new Event('userIdChanged'));

        // Retrieve the redirect path from localStorage or default to the dashboard
        const redirectPath = localStorage.getItem('redirectPath') || '/UserDashboard';
        
        // Remove the stored redirect path from localStorage after using it
        // localStorage.removeItem('redirectPath');

        // Navigate to the originally requested page or the dashboard
        navigate(redirectPath);
      } else {
        // Handle different error status codes
        if (response.status === 429) {
          alert('Too many login attempts. Please wait a moment and try again.');
        } else if (response.status === 401) {
          alert(data.message || 'Invalid User ID/Email or Password');
        } else {
          alert(data.message || 'Login failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        alert('Network error. Please check your connection and try again.');
      } else {
        alert('An error occurred during login. Please try again.');
      }
    }
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };

  const handleBack = () => {
    navigate('/'); // Navigate to the home page
  };

  const handleForgotPassword = () => {
    navigate('/ForgotPassword');
  };

  return (
    <div className="login-container11">
      <form className="login-form111" onSubmit={handleLogin}>
        <h2>User Login</h2>
        <div className="form-group111">
          <button id="back1" className="back-button1" onClick={handleBack}>
            X
          </button>

          {/* Single input field for either userId or email */}
          <h4>User ID </h4>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter your User ID or Email"
            required
          />
        </div>
        <div className="form-group111">
          <h4>Password</h4>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            required
          />
        </div>
        <br /><br />
        <button type="submit" className="login-button">Login</button>
        <h6>
          Forgot your password?
          <button
            type="button"
            id="forgot"
            className="forgot-password-button"
            onClick={handleForgotPassword}
          >
            Forgot Password
          </button>
        </h6>
        <h6>
          Don't have an account?
          <button
            type="button"
            id="create"
            className="create-Account"
            onClick={handleCreateAccount}
          >
            Create-Account
          </button>
        </h6>
      </form>
    </div>
  );
}

export default UserLogin;
