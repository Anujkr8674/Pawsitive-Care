// Backend/routes/otpadminforgotRoutes.js

const express = require('express');
const { adminforgotSendOtp,adminverifyotp, adminforgotResetPassword } = require('../controllers/otpadminforgotController');
const router = express.Router();

// router.post('/send-otp', sendOtp);
// router.post('/verify-otp', verifyOtp);

router.post('/admin-forgot-send-otp', adminforgotSendOtp);
router.post('/admin-verify-otp',adminverifyotp);
router.post('/admin-forgot-reset-password', adminforgotResetPassword);

module.exports = router;
