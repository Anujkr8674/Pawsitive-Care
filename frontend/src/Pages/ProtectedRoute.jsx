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
