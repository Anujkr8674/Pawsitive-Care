# 🚀 SendGrid Setup Guide - Alternative to Gmail SMTP

## Problem:
Gmail SMTP is timing out on Render due to network/firewall restrictions.

## Solution:
Use **SendGrid** - More reliable for production and works perfectly on Render.

---

## Step 1: Create SendGrid Account

1. Go to: https://signup.sendgrid.com/
2. Sign up for **FREE account** (100 emails/day free)
3. Verify your email address
4. Complete account setup

---

## Step 2: Create API Key

1. Login to SendGrid Dashboard: https://app.sendgrid.com/
2. Go to **Settings** → **API Keys**
3. Click **"Create API Key"**
4. Name it: `Pawsitive Care Production`
5. Select **"Full Access"** or **"Restricted Access"** → **"Mail Send"**
6. Click **"Create & View"**
7. **Copy the API Key** (you'll only see it once!)

---

## Step 3: Update Render Environment Variables

1. Go to Render Dashboard → Your Service → Environment
2. **Add/Update these variables:**

### Option A: Keep Gmail (for testing)
```
EMAIL_USER=anujnov25@gmail.com
EMAIL_PASS=phioenkmneussshl
```

### Option B: Switch to SendGrid (Recommended)
```
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key-here
EMAIL_FROM=anujnov25@gmail.com  # Your verified sender email
```

---

## Step 4: Update Code to Support SendGrid

Update `backend/controllers/otpController.js`:

### Replace the transporter setup with:

```javascript
// Set up the nodemailer transporter with error handling
let transporter;
try {
  // Check which email service to use
  const emailService = process.env.EMAIL_SERVICE || 'gmail';
  
  if (emailService === 'sendgrid') {
    // Use SendGrid
    if (!process.env.SENDGRID_API_KEY || !process.env.EMAIL_FROM) {
      console.error('SENDGRID_API_KEY or EMAIL_FROM environment variables are not set');
    } else {
      transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false,
        auth: {
          user: 'apikey', // This is literal string 'apikey'
          pass: process.env.SENDGRID_API_KEY, // Your SendGrid API key
        },
        connectionTimeout: 30000,
        greetingTimeout: 10000,
        socketTimeout: 30000,
      });
      console.log('SendGrid transporter configured');
    }
  } else {
    // Use Gmail (fallback)
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('EMAIL_USER or EMAIL_PASS environment variables are not set');
    } else {
      transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        connectionTimeout: 60000,
        greetingTimeout: 30000,
        socketTimeout: 60000,
        tls: {
          rejectUnauthorized: false,
          minVersion: 'TLSv1.2'
        },
      });
      console.log('Gmail transporter configured');
    }
  }
  
  // Verify transporter configuration
  if (transporter) {
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
```

### Update mailOptions to use EMAIL_FROM for SendGrid:

```javascript
// Email options
const mailOptions = {
  from: process.env.EMAIL_FROM || process.env.EMAIL_USER, // Use EMAIL_FROM for SendGrid
  to: email,
  subject: "Welcome to Pawsitive Care! Here's Your OTP Code",
  html: `...`
};
```

---

## Step 5: Verify Sender Email in SendGrid

1. Go to SendGrid Dashboard → **Settings** → **Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Enter your email: `anujnov25@gmail.com`
4. Fill in the form
5. Check your email and click verification link
6. **Important:** You can only send from verified emails

---

## Step 6: Deploy and Test

1. Commit and push code changes
2. Render will auto-deploy
3. Test OTP sending
4. Check Render logs for: `SendGrid transporter configured`

---

## ✅ Advantages of SendGrid:

- ✅ **No connection timeout issues** on Render
- ✅ **Better deliverability** (emails reach inbox)
- ✅ **Free tier:** 100 emails/day
- ✅ **Analytics:** Track email opens, clicks
- ✅ **Reliable:** Built for production use
- ✅ **No Gmail restrictions**

---

## 📊 SendGrid Free Tier Limits:

- **100 emails/day** (free)
- **40,000 emails** for first 30 days
- Perfect for OTP sending

---

## 🔄 Quick Switch Back to Gmail:

If you want to switch back to Gmail:
1. Set `EMAIL_SERVICE=gmail` in Render
2. Make sure `EMAIL_USER` and `EMAIL_PASS` are set
3. Redeploy

---

## 💡 Recommendation:

**For Production:** Use SendGrid
**For Development:** Gmail is fine

---

**Note:** SendGrid is the industry standard for transactional emails (like OTP). It's more reliable than Gmail SMTP for production applications.

