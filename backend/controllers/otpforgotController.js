

const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const UserReg = require('../models/userReg');
let otpStore = {}; // Temporary store for OTPs

// Set up the nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

// Send OTP for forgot password
exports.forgotSendOtp = (req, res) => {
  const { email } = req.body;

  // Generate OTP
  const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
  otpStore[email] = otp;

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject:  'Reset Your Pawsitive Care Password – OTP Code Inside',
    // html: `<p>Your OTP code is ${otp}</p>`,
    html: `
    <p>Hi there,</p>
    <p>We received a request to reset the password for your Pawsitive Care account. To proceed with resetting your password, please use the One-Time Password (OTP) below:</p>
    <p style="font-size: 18px; font-weight: bold; color: #ff6347;">Your OTP Code: ${otp}</p>
    <p>If you did not request this, please ignore this email and ensure your account's security.</p>
    <p>This OTP is valid for a limited time, so be sure to enter it soon!</p>
    <p>Warm regards,<br>The Pawsitive Care Team</p>
    <p><a href="[Your website URL]" target="_blank">Visit Our Website</a></p>
  `,
  };

  // Send the OTP email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending OTP' });
    }
    res.status(200).json({ message: 'OTP sent successfully for password reset' });
  });
};

// Verify OTP
exports.verifyotp = (req, res) => {
  const { email, otp } = req.body;

  // Check if OTP matches the one stored
  if (otpStore[email] === otp) {
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
};

// Reset password
exports.forgotResetPassword = async(req, res) => {
  const { email, otp, newPassword } = req.body;


// Check if OTP is valid
if (otpStore[email] === otp) {
    delete otpStore[email]; // Clear OTP after verification

    try {
      // Hash the new password before saving it to the database
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password in the database
      await UserReg.findOneAndUpdate({ email }, { password: hashedPassword });

      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Error resetting password' });
    }
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
};
