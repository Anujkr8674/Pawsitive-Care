// // frontend/src/components/FormPage.jsx
// import React from 'react';
// import axios from 'axios';

// const FormPage = () => {
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/submit-form', {}, {
//         headers: {
//           Authorization: localStorage.getItem('token'), // Pass token in headers
//         },
//       });
//       alert('Form submitted!');
//     } catch (error) {
//       console.error('Form submission error', error);
//       alert('You need to be logged in to submit this form.');
//     }
//   };

//   return (
//     <div>
//       <h2>Submit Form</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Form fields */}
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default FormPage;





// frontend/src/components/FormPage.js

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';

function FormPage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    // If user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Submit Your Form</h1>
      {/* Form content goes here */}
    </div>
  );
}

export default FormPage;
