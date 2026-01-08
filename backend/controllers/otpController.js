// Backend/controllers/otpController.js

const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
let otpStore = {}; // Temporary store for OTPs

// Validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Set up the nodemailer transporter with error handling
let transporter;
try {
  // Check if environment variables are set
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('EMAIL_USER or EMAIL_PASS environment variables are not set');
  } else {
    // Use explicit Gmail SMTP settings for better compatibility with Render
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Increased timeout settings for Render's network
      connectionTimeout: 60000, // 60 seconds
      greetingTimeout: 30000, // 30 seconds
      socketTimeout: 60000, // 60 seconds
      // Additional settings for better reliability
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
        minVersion: 'TLSv1.2'
      },
      // Retry settings
      pool: true,
      maxConnections: 1,
      maxMessages: 3,
    });
    
    // Verify transporter configuration
    transporter.verify(function(error, success) {
      if (error) {
        console.error('SMTP connection error:', error);
      } else {
        console.log('SMTP server is ready to send messages');
      }
    });
  }
} catch (error) {
  console.error('Error creating email transporter:', error);
}

// Generate and send OTP
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email is provided
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if transporter is configured
    if (!transporter) {
      console.error('Email transporter is not configured. Please check EMAIL_USER and EMAIL_PASS environment variables.');
      return res.status(500).json({ message: 'Email service is not configured. Please contact support.' });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, { 
      digits: true, 
      upperCaseAlphabets: false, 
      specialChars: false, 
      lowerCaseAlphabets: false 
    });

    // Store OTP for the email (with expiration - 10 minutes)
    otpStore[email] = {
      otp: otp,
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    };

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Pawsitive Care! Here's Your OTP Code",
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

    // Send email with promise and increased timeout for Render
    const sendEmailPromise = new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          console.error('Error details:', {
            code: error.code,
            command: error.command,
            response: error.response,
            responseCode: error.responseCode
          });
          reject(error);
        } else {
          console.log('Email sent successfully:', info.messageId);
          resolve(info);
        }
      });
    });

    // Increased timeout to 60 seconds for Render's network
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Email sending timeout'));
      }, 60000); // 60 seconds
    });

    // Race between email sending and timeout
    await Promise.race([sendEmailPromise, timeoutPromise]);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error in sendOtp:', error);
    
    // Clean up expired OTPs
    const now = Date.now();
    Object.keys(otpStore).forEach(key => {
      if (otpStore[key].expiresAt && otpStore[key].expiresAt < now) {
        delete otpStore[key];
      }
    });

    // Return appropriate error message based on error type
    if (error.message === 'Email sending timeout') {
      return res.status(500).json({ message: 'Email service timeout. Please try again.' });
    }
    
    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
      console.error('Connection error - Check EMAIL_USER and EMAIL_PASS in Render environment variables');
      return res.status(500).json({ message: 'Email service connection failed. Please check server configuration.' });
    }
    
    if (error.code === 'EAUTH') {
      console.error('Authentication error - Check Gmail App Password');
      return res.status(500).json({ message: 'Email authentication failed. Please check email credentials.' });
    }
    
    return res.status(500).json({ message: 'Error sending OTP. Please try again later.' });
  }
};

// Verify OTP
exports.verifyOtp = (req, res) => {
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
      delete otpStore[email]; // Clean up expired OTP
      return res.status(400).json({ message: 'OTP has expired. Please request a new OTP.' });
    }

    // Check if OTP matches (handle both old format and new format)
    const storedOtp = typeof storedOtpData === 'string' ? storedOtpData : storedOtpData.otp;
    
    if (storedOtp === otp) {
      delete otpStore[email]; // Clear OTP after verification
      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error in verifyOtp:', error);
    res.status(500).json({ message: 'Error verifying OTP. Please try again.' });
  }
};
