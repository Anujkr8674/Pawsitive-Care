const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserLogin = require('../models/userlogin'); // Correct model import
const router = express.Router();

router.post('/userlogin', async (req, res) => {
  const { userId, password } = req.body;

  try {
    // Find user by userId
    const user = await UserLogin.findOne({ userId });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password); // Use bcrypt for comparing hashed passwords

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Use environment variable for secret

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
