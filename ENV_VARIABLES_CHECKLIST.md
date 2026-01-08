# ✅ Environment Variables Checklist - Render vs Local .env

## Required Environment Variables:

### ✅ 1. EMAIL_USER
- **Render में:** `anujnov25@gmail.com`
- **Required:** Yes
- **Check:** ✅ Set correctly
- **Note:** Gmail address should match the one used for App Password

### ✅ 2. EMAIL_PASS
- **Render में:** `phioenkmneussshl`
- **Required:** Yes
- **Check:** ✅ Set (16 characters - looks like App Password)
- **Important:** 
  - Must be Gmail App Password (16-digit), NOT regular password
  - Should be generated from: https://myaccount.google.com/apppasswords
  - Make sure it's for the email: `anujnov25@gmail.com`

### ✅ 3. MONGO_URI
- **Render में:** `mongodb+srv://petcare_user:Anuj%230000@cluster0.4ghlj...` (partial)
- **Required:** Yes
- **Check:** ✅ Set (MongoDB Atlas connection string)
- **Format should be:** `mongodb+srv://username:password@cluster.mongodb.net/database`
- **Verify:** Make sure the full connection string is complete

### ✅ 4. SECRET_KEY
- **Render में:** `mysecretkey123456789`
- **Required:** Yes (for JWT tokens)
- **Check:** ⚠️ **WARNING - Too Simple!**
- **Recommendation:** Use a longer, more secure key (at least 32 characters)
- **Example:** `18e4e74072651732914140cc00ef10307e37fb012e31dc04fbf434bd84dd91aafdf54fea91dc0ed064e6c988a0f3c9704ed264c0bc5ec12b987c702003511b1b`

### ✅ 5. PORT
- **Render में:** `10000`
- **Required:** No (Render automatically sets this)
- **Check:** ✅ OK (Render sets this automatically)
- **Note:** You can remove this if you want, Render will set it automatically

### ✅ 6. NODE_ENV
- **Render में:** `production`
- **Required:** No (but recommended)
- **Check:** ✅ Set correctly
- **Note:** Good practice for production

---

## Optional but Recommended:

### 7. FRONTEND_URL (Optional)
- **Render में:** Not visible in screenshot
- **Required:** No (defaults to '*')
- **Recommendation:** Set to your Vercel frontend URL for better security
- **Example:** `https://pawsitive-care-tau.vercel.app`

---

## ⚠️ Important Checks:

### 1. EMAIL_PASS Verification:
- [ ] Make sure `phioenkmneussshl` is a Gmail App Password
- [ ] Verify it's generated for `anujnov25@gmail.com`
- [ ] Check it's not expired
- [ ] Ensure 2-Step Verification is enabled on Gmail account

### 2. MONGO_URI Verification:
- [ ] Make sure the full connection string is complete
- [ ] Verify database name is correct (should be `petcare` or similar)
- [ ] Check MongoDB Atlas IP whitelist includes Render's IPs (or 0.0.0.0/0)

### 3. SECRET_KEY Security:
- [ ] **CHANGE** `mysecretkey123456789` to a longer, random string
- [ ] Use at least 32-64 characters
- [ ] Use random characters, numbers, and symbols

---

## 🔧 Quick Fixes Needed:

### 1. Update SECRET_KEY in Render:
```
Old: mysecretkey123456789
New: [Generate a long random string - at least 32 characters]
```

### 2. Verify EMAIL_PASS:
- Go to: https://myaccount.google.com/apppasswords
- Check if App Password exists for `anujnov25@gmail.com`
- If not, generate a new one and update in Render

### 3. Verify MONGO_URI:
- Make sure the full connection string is in Render
- Should end with database name: `...mongodb.net/petcare`

---

## ✅ Final Checklist:

- [x] EMAIL_USER set correctly
- [x] EMAIL_PASS set (verify it's App Password)
- [x] MONGO_URI set (verify full string)
- [ ] **SECRET_KEY needs to be changed** (too simple)
- [x] PORT set (optional, Render auto-sets)
- [x] NODE_ENV set to production
- [ ] FRONTEND_URL (optional but recommended)

---

## 🚀 After Verification:

1. **Update SECRET_KEY** in Render to a longer, secure value
2. **Verify EMAIL_PASS** is a valid Gmail App Password
3. **Check MONGO_URI** is complete
4. **Save Changes** in Render
5. **Wait for redeploy**
6. **Test OTP sending**

---

**Note:** Your local `.env` file should have the same values (except PORT, which Render sets automatically).

