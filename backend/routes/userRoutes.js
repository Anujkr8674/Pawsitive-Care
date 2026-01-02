// backend/routes/userRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to handle form submission (Protected)
router.post('/submit-form', authMiddleware, (req, res) => {
  // Form submission logic
  res.send('Form submitted successfully!');
});

// Route to handle accessing user dashboard (Protected)
router.get('/dashboard', authMiddleware, (req, res) => {
  // Dashboard data fetching logic
  res.json({ message: `Welcome to your dashboard, User ${req.user.id}` });
});

module.exports = router;
