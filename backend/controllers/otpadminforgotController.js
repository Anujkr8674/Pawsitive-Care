

// const nodemailer = require('nodemailer');
// const otpGenerator = require('otp-generator');
// const bcrypt = require('bcrypt');
// // const UserReg = require('../models/userReg');
// const AdminReg = require('../models/AdminReg');
// let otpStore = {}; // Temporary store for OTPs

// // Set up the nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER, // Your email
//     pass: process.env.EMAIL_PASS, // Your email password
//   },
// });

// // Send OTP for forgot password
// exports.forgotSendOtp = (req, res) => {
//   const { email } = req.body;

//   // Generate OTP
//   const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
//   otpStore[email] = otp;

//   // Email options
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject:  'Reset Your Pawsitive Care Password – OTP Code Inside',
//     html: `<p>Your OTP code is ${otp}</p>`,
// //     html: `
// //     <p>Hi there,</p>
// //     <p>We received a request to reset the password for your Pawsitive Care account. To proceed with resetting your password, please use the One-Time Password (OTP) below:</p>
// //     <p style="font-size: 18px; font-weight: bold; color: #ff6347;">Your OTP Code: ${otp}</p>
// //     <p>If you did not request this, please ignore this email and ensure your account's security.</p>
// //     <p>This OTP is valid for a limited time, so be sure to enter it soon!</p>
// //     <p>Warm regards,<br>The Pawsitive Care Team</p>
// //     <p><a href="[Your website URL]" target="_blank">Visit Our Website</a></p>
// //   `,
//   };

//   // Send the OTP email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return res.status(500).json({ message: 'Error sending OTP' });
//     }
//     res.status(200).json({ message: 'OTP sent successfully for password reset' });
//   });
// };

// // Verify OTP
// exports.verifyotp = (req, res) => {
//   const { email, otp } = req.body;

//   // Check if OTP matches the one stored
//   if (otpStore[email] === otp) {
//     res.status(200).json({ message: 'OTP verified successfully' });
//   } else {
//     res.status(400).json({ message: 'Invalid OTP' });
//   }
// };

// // Reset password
// exports.forgotResetPassword = async(req, res) => {
//   const { email, otp, newPassword } = req.body;


// // Check if OTP is valid
// if (otpStore[email] === otp) {
//     delete otpStore[email]; // Clear OTP after verification

//     try {
//       // Hash the new password before saving it to the database
//       const hashedPassword = await bcrypt.hash(newPassword, 10);

//       // Update the user's password in the database
//       await AdminReg.findOneAndUpdate({ email }, { password: hashedPassword });

//       res.status(200).json({ message: 'Password reset successfully' });
//     } catch (error) {
//       console.error('Error resetting password:', error);
//       res.status(500).json({ message: 'Error resetting password' });
//     }
//   } else {
//     res.status(400).json({ message: 'Invalid OTP' });
//   }
// };





const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const AdminReg = require('../models/AdminReg');
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
exports.adminforgotSendOtp = (req, res) => {  // Updated function name
  const { email } = req.body;

  // Generate OTP
  const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
  otpStore[email] = otp;

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    // subject: 'Reset Your Pawsitive Care Password – OTP Code Inside',
    // html: `<p>Your OTP code is ${otp}</p>`,

    subject: 'Reset Your Pawsitive Care Admin Password – OTP Code Inside',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #dddddd; border-radius: 10px;">
        <h2 style="color: #333;">Admin Password Reset Request</h2>
        <p>Dear Admin,</p>
        <p>We received a request to reset the password for your Pawsitive Care admin account. Please use the One-Time Password (OTP) provided below to reset your password:</p>
        <div style="padding: 10px; text-align: center; border: 2px dashed #ff6347; background-color: #f9f9f9; width: fit-content; margin: auto;">
          <span style="font-size: 22px; font-weight: bold; color: #ff6347;">${otp}</span>
        </div>
        <p style="color: #777;">This OTP is valid for a limited time, so be sure to enter it soon to complete your password reset process.</p>
        <p>If you did not request this reset, please ignore this email or contact our support team to secure your account.</p>
        <p>Warm regards,</p>
        <p><strong>Pawsitive Care Team</strong></p>
        <p style="font-size: 14px; color: #999;">If you have any issues or questions, feel free to <a href="[Your support URL]" style="color: #ff6347; text-decoration: none;">contact our support team</a>.</p>
        <p style="font-size: 12px; color: #bbb; border-top: 1px solid #ddd; padding-top: 10px;">&copy; ${new Date().getFullYear()} Pawsitive Care. All rights reserved.</p>
      </div>
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
exports.adminverifyotp = (req, res) => {  // Updated function name
  const { email, otp } = req.body;

  // Check if OTP matches the one stored
  if (otpStore[email] === otp) {
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
};

// Reset password
exports.adminforgotResetPassword = async (req, res) => {  // Updated function name
  const { email, otp, newPassword } = req.body;

  // Check if OTP is valid
  if (otpStore[email] === otp) {
    delete otpStore[email]; // Clear OTP after verification

    try {
      // Hash the new password before saving it to the database
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the admin's password in the database
      await AdminReg.findOneAndUpdate({ email }, { password: hashedPassword });

      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Error resetting password' });
    }
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
};
