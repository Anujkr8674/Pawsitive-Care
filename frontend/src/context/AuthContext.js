// // src/context/AuthContext.js
// import React, { createContext, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial state: not logged in
//   const navigate = useNavigate();

//   const login = () => {
//     setIsLoggedIn(true);
//     navigate('/'); // Redirect to homepage after login
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     navigate('/userlogin'); // Redirect to login page after logout
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use the AuthContext
// export const useAuth = () => {
//   return useContext(AuthContext);
// };






// src/context/AuthContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Create the AuthContext
// const AuthContext = createContext();

// // Create a custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);

// // AuthProvider component that wraps around the application
// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Simulating user authentication status check (you can replace this with real logic)
//   useEffect(() => {
//     const checkAuth = async () => {
//       // Simulate an async check, e.g., check for a token in localStorage or an API call
//       const userAuthenticated = localStorage.getItem('auth_token') ? true : false;
//       setIsLoggedIn(userAuthenticated);
//       setLoading(false);
//     };

//     checkAuth();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };





// import React, { createContext, useState, useContext } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Function to set login status
//   const login = () => {
//     setIsLoggedIn(true);
//   };

//   // Function to log out
//   const logout = () => {
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const navigate = useNavigate();

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/'); // Redirect to homepage after login
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    navigate('/userlogin'); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
