
// utils/ProtectedRoute.jsx

import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Modal from './Modal'; // Import the modal component

const ProtectedRoute = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get the current path

  const token = localStorage.getItem('token'); // Check if the user is logged in

  useEffect(() => {
    // If no token, show a popup message and store the current path
    if (!token && !showModal) {
      setShowModal(true);
      localStorage.setItem('redirectPath', location.pathname); // Save the current path
    }
  }, [token, showModal, location.pathname]);

  const handleConfirm = () => {
    setRedirect(true); // Set redirect to true for the login page
  };

  const handleClose = () => {
    navigate(-1); // Directly navigate to the previous page
  };

  // If confirmed, navigate to the login page
  if (redirect) {
    return <Navigate to="/userlogin" replace />;
  }

  // Render the modal if showModal is true
  if (showModal) {
    return (
      <>
        <Modal
          message="You need to log in to access this page."
          onConfirm={handleConfirm}
          onClose={handleClose}
        />
      </>
    );
  }

  // Otherwise, render the children (protected component)
  return children;
};

export default ProtectedRoute;
