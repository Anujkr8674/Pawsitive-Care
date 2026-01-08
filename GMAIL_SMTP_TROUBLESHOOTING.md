# 🔧 Gmail SMTP Connection Issues on Render - Troubleshooting Guide

## ✅ Changes Made:

1. **Increased Timeout Settings:**
   - Connection timeout: 60 seconds (was 10 seconds)
   - Greeting timeout: 30 seconds (was 10 seconds)
   - Socket timeout: 60 seconds (was 10 seconds)

2. **Explicit SMTP Configuration:**
   - Using `smtp.gmail.com` with port 587
   - Better TLS settings for Render's network

3. **Better Error Handling:**
   - More detailed error messages
   - Specific error codes handling

---

## ⚠️ If Still Getting Connection Timeout:

### Option 1: Verify Environment Variables in Render

1. Go to Render Dashboard → Your Service → Environment tab
2. Verify these variables are set:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-digit-app-password
   ```
3. Make sure there are **NO spaces** before/after the values
4. Click "Save Changes" and wait for redeploy

### Option 2: Check Gmail App Password

1. Make sure you're using **App Password**, not regular password
2. Generate new App Password:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-digit password
   - Update `EMAIL_PASS` in Render

### Option 3: Try Port 465 (SSL)

If port 587 is blocked, try port 465 with SSL:

Update in `backend/controllers/otpController.js`:
```javascript
port: 465,
secure: true, // Change to true for port 465
```

### Option 4: Use Alternative Email Service

If Gmail continues to timeout, consider using:

#### A. SendGrid (Recommended for Production)
1. Sign up at https://sendgrid.com
2. Get API key
3. Update transporter:
```javascript
transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});
```

#### B. Mailgun
1. Sign up at https://mailgun.com
2. Get SMTP credentials
3. Update transporter with Mailgun settings

#### C. AWS SES
1. Set up AWS SES
2. Use SES SMTP settings

---

## 🔍 Debugging Steps:

### 1. Check Render Logs:
- Go to Render Dashboard → Your Service → Logs
- Look for:
  - `SMTP server is ready to send messages` (Good sign)
  - `SMTP connection error` (Connection issue)
  - `EMAIL_USER or EMAIL_PASS environment variables are not set` (Missing vars)

### 2. Test Locally First:
```bash
# In your local .env file, add:
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Then test:
node backend/server.js
# Try sending OTP from frontend
```

### 3. Verify Gmail Settings:
- Make sure "Less secure app access" is NOT needed (use App Password instead)
- Check if Gmail account has 2-Step Verification enabled
- Verify App Password is correct

---

## 🚨 Common Issues:

### Issue: "Connection timeout"
**Possible Causes:**
- Render's network blocking Gmail SMTP
- Gmail blocking Render's IP
- Firewall restrictions

**Solutions:**
- Try port 465 with SSL
- Use alternative email service (SendGrid/Mailgun)
- Contact Render support

### Issue: "EAUTH" error
**Possible Causes:**
- Wrong App Password
- App Password expired
- Email address incorrect

**Solutions:**
- Generate new App Password
- Verify EMAIL_USER is correct
- Check environment variables in Render

### Issue: "ECONNREFUSED"
**Possible Causes:**
- Port blocked
- Network issue
- SMTP server down

**Solutions:**
- Try different port (465 vs 587)
- Check Gmail status
- Use alternative email service

---

## 📝 Quick Checklist:

- [ ] Environment variables set in Render (`EMAIL_USER`, `EMAIL_PASS`)
- [ ] Using Gmail App Password (16-digit), not regular password
- [ ] Code deployed with latest changes
- [ ] Checked Render logs for errors
- [ ] Tried port 465 if 587 doesn't work
- [ ] Considered alternative email service if Gmail continues to fail

---

## 💡 Recommended Solution for Production:

For production apps, **SendGrid** or **Mailgun** are more reliable than Gmail SMTP because:
- ✅ Better deliverability
- ✅ No connection timeout issues
- ✅ Better analytics
- ✅ Higher sending limits
- ✅ More reliable on cloud platforms like Render

---

**Note:** If Gmail SMTP continues to timeout on Render, it's likely a network/firewall issue. Consider switching to a dedicated email service like SendGrid for better reliability.

