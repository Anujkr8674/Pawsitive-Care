// const express = require('express');
// const bcrypt = require('bcrypt');
// // const User = require('./models/User'); // Assuming your user model is named 'User'
// const router = express.Router();
// const userlogin = require('../models/userlogin')

// router.post('/api/login', async (req, res) => {
//   const { userId, password } = req.body;

//   try {
//     // Find the user by userId
//     const user = await user.findOne({ userId });

//     if (!user) {
//       return res.status(400).json({ message: 'User ID not found' });
//     }

//     // Compare the entered password with the hashed password stored in the database
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Invalid password' });
//     }

//     // If the login is successful, send a response (you can add a token for auth if needed)
//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;




// Backend route file (e.g., userlogin.js)
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserReg = require('../models/userlogin'); // Assuming your user model is named 'UserReg'

// Login route
router.post('/api/login', async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Find the user by either userId or email
    const user = await UserReg.findOne({
      $or: [{ userId: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: 'User ID or Email not found' });
    }

    // Compare the entered password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate a token if the login is successful
    const token = jwt.sign({ id: user._id }, 'SECRET_KEY', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

