// Backend/routes/otpRoutes.js

const express = require('express');
const { forgotSendOtp,verifyotp, forgotResetPassword } = require('../controllers/otpforgotController');
const router = express.Router();

// router.post('/send-otp', sendOtp);
// router.post('/verify-otp', verifyOtp);

router.post('/forgot-send-otp', forgotSendOtp);
router.post('/forgot-verify-otp', verifyotp); // Changed to match frontend
router.post('/forgot-reset-password', forgotResetPassword);

module.exports = router;
