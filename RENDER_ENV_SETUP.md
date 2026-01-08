# 🚀 Render में Environment Variables Set करने का Guide

## Step 1: Render Dashboard में जाएं

1. [Render Dashboard](https://dashboard.render.com) पर login करें
2. अपने **Web Service** (backend service) को select करें
3. Left sidebar में **"Environment"** tab पर click करें

---

## Step 2: Environment Variables Add करें

### Method 1: Manual Add (Recommended)

1. **"Environment"** tab में scroll down करें
2. **"Environment Variables"** section में जाएं
3. **"Add Environment Variable"** button click करें
4. निम्नलिखित variables add करें:

#### Variable 1: EMAIL_USER
- **Key:** `EMAIL_USER`
- **Value:** आपका Gmail address (जैसे: `yourname@gmail.com`)
- **Add** button click करें

#### Variable 2: EMAIL_PASS
- **Key:** `EMAIL_PASS`
- **Value:** आपका Gmail App Password (16-digit code)
- **Add** button click करें

---

## Step 3: Gmail App Password कैसे बनाएं

अगर आपके पास Gmail App Password नहीं है, तो इसे बनाएं:

### Steps:

1. **Google Account** में जाएं:
   - https://myaccount.google.com/

2. **Security** section में जाएं:
   - Left sidebar में "Security" click करें

3. **2-Step Verification Enable करें** (अगर पहले से enable नहीं है):
   - "2-Step Verification" पर click करें
   - Follow करें instructions

4. **App Passwords Generate करें**:
   - Security page पर scroll down करें
   - "App passwords" section में जाएं
   - या direct link: https://myaccount.google.com/apppasswords
   - "Select app" dropdown से "Mail" select करें
   - "Select device" dropdown से "Other (Custom name)" select करें
   - Name दें: "Render Production" या "Pawsitive Care"
   - **"Generate"** button click करें
   - **16-digit password** copy करें (यही `EMAIL_PASS` है)

---

## Step 4: सभी Required Environment Variables

Render में ये सभी variables set करें:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password
MONGO_URI=your-mongodb-connection-string
SECRET_KEY=your-secret-key
PORT=5000 (optional, Render automatically sets this)
FRONTEND_URL=https://your-frontend-url.vercel.app (optional)
```

---

## Step 5: Save और Deploy

1. सभी variables add करने के बाद
2. **"Save Changes"** button click करें
3. Render automatically **redeploy** करेगा
4. Deploy complete होने का wait करें

---

## Step 6: Verify करें

### Check Logs:
1. Render Dashboard में अपने service पर click करें
2. **"Logs"** tab में जाएं
3. Check करें कि कोई error नहीं है
4. अगर `EMAIL_USER or EMAIL_PASS environment variables are not set` error आ रहा है, तो variables properly set नहीं हुए हैं

### Test OTP:
1. Frontend पर जाएं
2. Registration form में email enter करें
3. "Get OTP" button click करें
4. अगर OTP successfully send हो जाए, तो सब ठीक है! ✅

---

## ⚠️ Important Notes:

1. **App Password vs Regular Password:**
   - ❌ Regular Gmail password काम नहीं करेगा
   - ✅ App Password ही use करें (16-digit code)

2. **Security:**
   - App Password को कभी भी code में hardcode न करें
   - हमेशा environment variables use करें

3. **Multiple Services:**
   - अगर आपके पास multiple services हैं (backend, frontend, etc.)
   - हर service में separately variables set करें

4. **Update करना:**
   - Variable update करने के लिए:
     - Environment tab में जाएं
     - Variable के value को edit करें
     - Save करें
     - Service automatically redeploy होगा

---

## 🔧 Troubleshooting:

### Problem: OTP send नहीं हो रहा
**Solution:**
- Check करें कि `EMAIL_USER` और `EMAIL_PASS` properly set हैं
- Logs check करें
- Gmail App Password सही है या नहीं verify करें

### Problem: "Email service is not configured" error
**Solution:**
- Environment variables properly set नहीं हैं
- Service को manually redeploy करें

### Problem: "Email sending timeout" error
**Solution:**
- Gmail connection issue हो सकता है
- App Password सही है या नहीं check करें
- Network connectivity check करें

---

## 📝 Quick Checklist:

- [ ] Render Dashboard में service select किया
- [ ] Environment tab में गए
- [ ] `EMAIL_USER` add किया
- [ ] Gmail App Password generate किया
- [ ] `EMAIL_PASS` add किया (16-digit code)
- [ ] Save Changes किया
- [ ] Service redeploy हुआ
- [ ] Logs check किए
- [ ] OTP test किया

---

**Note:** Environment variables add करने के बाद service automatically redeploy होगा। इसके लिए 2-3 minutes wait करें।

