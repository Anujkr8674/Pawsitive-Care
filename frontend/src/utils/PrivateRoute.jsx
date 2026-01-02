// // frontend/src/utils/PrivateRoute.jsx
// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// // This component wraps around protected routes
// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const token = localStorage.getItem('token'); // Check if token exists in local storage

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         token ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/userlogin" /> // Redirect to login if no token is found
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;





// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// // This component wraps around protected routes
// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const token = localStorage.getItem('token'); // Check if token exists in local storage

//   return (
//     <Route
//       {...rest}
//       element={token ? <Component /> : <Navigate to="/userlogin" />} // Use Navigate for redirection
//     />
//   );
// };

// export default PrivateRoute;






import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if token exists in local storage

  // If the token exists, render the children components, otherwise navigate to login
  return token ? children : <Navigate to="/userlogin" />;
};

export default PrivateRoute;
