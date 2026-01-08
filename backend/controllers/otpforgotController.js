

const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const UserReg = require('../models/userReg');
let otpStore = {}; // Temporary store for OTPs

// Set up the nodemailer transporter with better settings for Render
let transporter;
try {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('EMAIL_USER or EMAIL_PASS environment variables are not set');
  } else {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, // Use port 465 (SSL) - more reliable on Render
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 60000, // 60 seconds
      greetingTimeout: 30000, // 30 seconds
      socketTimeout: 60000, // 60 seconds
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
      },
      requireTLS: true,
    });
  }
} catch (error) {
  console.error('Error creating email transporter:', error);
}

// Send OTP for forgot password
exports.forgotSendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if transporter is configured
    if (!transporter) {
      console.error('Email transporter is not configured');
      return res.status(500).json({ message: 'Email service is not configured. Please contact support.' });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, { 
      digits: true, 
      upperCaseAlphabets: false, 
      specialChars: false, 
      lowerCaseAlphabets: false 
    });
    
    // Store OTP with expiration (10 minutes)
    otpStore[email] = {
      otp: otp,
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    };

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Pawsitive Care Password – OTP Code Inside",
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

    // Send email with timeout
    const sendEmailPromise = new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          reject(error);
        } else {
          console.log('Email sent successfully:', info.messageId);
          resolve(info);
        }
      });
    });

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Email sending timeout'));
      }, 60000); // 60 seconds
    });

    await Promise.race([sendEmailPromise, timeoutPromise]);
    res.status(200).json({ message: 'OTP sent successfully for password reset' });
  } catch (error) {
    console.error('Error in forgotSendOtp:', error);
    
    if (error.message === 'Email sending timeout') {
      return res.status(500).json({ message: 'Email service timeout. Please try again.' });
    }
    
    return res.status(500).json({ message: 'Error sending OTP. Please try again later.' });
  }
};

// Verify OTP
exports.verifyotp = (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate inputs
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    // Check if OTP exists for this email
    const storedOtpData = otpStore[email];
    
    if (!storedOtpData) {
      return res.status(400).json({ message: 'OTP not found. Please request a new OTP.' });
    }

    // Check if OTP has expired
    if (storedOtpData.expiresAt && storedOtpData.expiresAt < Date.now()) {
      delete otpStore[email];
      return res.status(400).json({ message: 'OTP has expired. Please request a new OTP.' });
    }

    // Check if OTP matches (handle both old format and new format)
    const storedOtp = typeof storedOtpData === 'string' ? storedOtpData : storedOtpData.otp;
    
    if (storedOtp === otp) {
      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error in verifyotp:', error);
    res.status(500).json({ message: 'Error verifying OTP. Please try again.' });
  }
};

// Reset password
exports.forgotResetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validate inputs
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, OTP, and new password are required' });
    }

    // Check if OTP exists and is valid
    const storedOtpData = otpStore[email];
    
    if (!storedOtpData) {
      return res.status(400).json({ message: 'OTP not found. Please request a new OTP.' });
    }

    // Check if OTP has expired
    if (storedOtpData.expiresAt && storedOtpData.expiresAt < Date.now()) {
      delete otpStore[email];
      return res.status(400).json({ message: 'OTP has expired. Please request a new OTP.' });
    }

    // Check if OTP matches (handle both old format and new format)
    const storedOtp = typeof storedOtpData === 'string' ? storedOtpData : storedOtpData.otp;
    
    if (storedOtp === otp) {
      delete otpStore[email]; // Clear OTP after verification

      // Hash the new password before saving it to the database
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password in the database
      const updatedUser = await UserReg.findOneAndUpdate(
        { email }, 
        { password: hashedPassword },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found with this email.' });
      }

      res.status(200).json({ message: 'Password reset successfully' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password. Please try again.' });
  }
};
