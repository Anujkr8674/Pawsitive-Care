// const express = require('express');
// const router = express.Router();
// const { register, login, getUser } = require('../controllers/authController');
// const auth = require('../middleware/authMiddleware');

// router.post('/register', register);
// router.post('/login', login);
// router.get('/user', auth, getUser);

// module.exports = router;







const express = require('express');
const router = express.Router();
const { register, login, getUser } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

// Add these new routes for OTP handling
router.post('/send-otp', (req, res) => res.send('send-otp route'));
router.post('/verify-otp', (req, res) => res.send('verify-otp route'));

// router.post('/send-admin-otp',(req,res)=> res.send('send-admin-otp'));
// router.post('/verify-admin-otp',(req, res) => res.send('verify-admin-otp'));

// Existing routes
router.post('/register', register);
router.post('/login', login);
router.get('/user', auth, getUser);

module.exports = router;
