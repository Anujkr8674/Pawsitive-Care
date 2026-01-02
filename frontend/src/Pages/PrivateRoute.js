// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isAuthenticated }) => {
    return isAuthenticated ? element : <Navigate to="/dashboard" />;
};

export default PrivateRoute;
