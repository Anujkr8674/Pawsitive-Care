// // backend/middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) {
//     return res.status(401).json({ message: 'Access Denied: No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token
//     req.user = decoded; // Store user info in req
//     console.log("User ID from middleware:", req.user.id);
//     next(); // Proceed to next middleware or route handler
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid token' });
//   }
// };

// module.exports = authMiddleware;







// // backend/middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   // Extract token from the 'Authorization' header and handle 'Bearer' prefix
//   const token = req.header('Authorization')?.split(' ')[1]; 

  
//   console.log("Received token in middleware:", token); // Log the token value

//   if (!token || token === '') {
//     return res.status(401).json({ message: 'Access Denied: No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token
//     req.user = decoded; // Store user info in req
//     console.log("User ID from middleware:", req.user.id);
//     next(); // Proceed to next middleware or route handler
//   } catch (error) {
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: 'Token has expired' });
//     } else if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ message: 'Invalid token' });
//     } else {
//       return res.status(500).json({ message: 'Server error during token verification' });
//     }
//   }
// };

// module.exports = authMiddleware;




// // backend/middleware/authMiddleware.js

// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   console.log("Received token in middleware:", token); // Log the token for debugging

//   if (!token) {
//     return res.status(401).json({ message: 'Access Denied: No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is correct
//     req.user = decoded; // Attach decoded token to the request
//     next(); // Proceed to next middleware or route handler
//   } catch (error) {
//     console.error("Token verification error:", error.message); // Log the error for debugging
//     res.status(400).json({ message: 'Invalid or expired token' });
//   }
// };

// module.exports = authenticateToken;






const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log("Received token in middleware:", token); // Log the token for debugging

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    // Use SECRET_KEY from environment or fallback (same as login routes)
    const SECRET_KEY = process.env.SECRET_KEY || process.env.JWT_SECRET || '18e4e74072651732914140cc00ef10307e37fb012e31dc04fbf434bd84dd91aafdf54fea91dc0ed064e6c988a0f3c9704ed264c0bc5ec12b987c702003511b1b';
    const decoded = jwt.verify(token, SECRET_KEY);
    // req.userId = decoded.userId; // Attach userId to the request
    req.userId = decoded.id || decoded.adminId; // Support both user and admin tokens
    console.log("User ID from token:", req.userId);
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    console.error("Token verification error:", error.message); // Log the error for debugging
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired. Please login again.' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token. Please login again.' });
    }
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;

