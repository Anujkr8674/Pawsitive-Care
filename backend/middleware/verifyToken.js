// middlewares/verifyToken.js

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const tokenHeader = req.headers['authorization'];

  if (!tokenHeader) {
    return res.status(403).send({ message: 'No token provided' });
  }

  // Extract the token from the "Bearer token"
  const token = tokenHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send({ message: 'No token provided' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    
    // Save the admin ID from the token to use in the request
    req.adminId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
