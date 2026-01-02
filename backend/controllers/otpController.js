// Backend/controllers/otpController.js

const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
let otpStore = {}; // Temporary store for OTPs

// Set up the nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

// Generate and send OTP
exports.sendOtp = (req, res) => {
  const { email } = req.body;

  // Generate OTP
  const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

  // Store OTP for the email
  otpStore[email] = otp;

  // Email options
  // const mailOptions = {
  //   from: process.env.EMAIL_USER,
  //   to: email,
  //   subject: 'Your OTP Code',
  //   text: `Your OTP code is ${otp}`,
  // };

  // Email options
  const mailOptions = {
  from: process.env.EMAIL_USER,
  to: email,
  subject: 'Welcome to Pawsitive Care! Here’s Your OTP Code',
  html: `
    <p>Hi there!</p>
    <p>Thank you for joining the Pawsitive Care community – where we prioritize the happiness and well-being of your beloved pets! To complete your registration and get started, please use the One-Time Password (OTP) provided below:</p>
    <p style="font-size: 18px; font-weight: bold; color: #ff6347;">Your OTP Code: ${otp}</p>
    <p>This code will help us verify your registration and ensure a secure experience for you and your pets.</p>
    <p>Looking forward to connecting with you and providing the best care for your furry friends!</p>
    <p>Warm regards,<br>The Pawsitive Care Team</p>
    <p><a href="[Your website URL]" target="_blank">Visit Our Website</a></p>
  `,
};


  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending OTP' });
    }
    res.status(200).json({ message: 'OTP sent successfully' });
  });
};

// Verify OTP
exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  // Check if OTP matches
  if (otpStore[email] === otp) {
    delete otpStore[email]; // Clear OTP after verification
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
};
