# 🔄 Frontend URLs Update Guide

Aapke project mein kuch files mein abhi bhi hardcoded `http://localhost:5000` URLs hain. Inhe update karna padega production ke liye.

## ✅ Already Updated Files
- ✅ `frontend/src/config/api.js` - New API config file
- ✅ `frontend/src/api/cartAPI.js` - Updated to use API config
- ✅ `frontend/src/api/userAPI.js` - Updated to use API config

## 📝 Files Jo Update Karne Hain

Yeh files mein abhi bhi `http://localhost:5000` hardcoded hai. Inhe manually update karna padega:

### Option 1: Manual Update (Recommended)
Har file mein `http://localhost:5000` ko replace karo with:
```javascript
import API_BASE_URL from '../config/api';
// ya
import { API_ENDPOINTS } from '../config/api';
```

### Option 2: Quick Fix (Temporary)
Agar time kam hai, to bas environment variable use karo:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

## 📋 Files List Jo Update Karne Hain

1. **AdminDashboard.jsx**
   - Line 31, 111, 124-137
   - Replace: `http://localhost:5000` with `API_ENDPOINTS.ADMIN_*`

2. **Footer.jsx**
   - Line 36
   - Replace with: `API_ENDPOINTS.SUBSCRIPTION`

3. **UserLogin.jsx**
   - Line 147
   - Replace with: `API_ENDPOINTS.USER_LOGIN`

4. **body.jsx**
   - Line 34
   - Replace with: `API_ENDPOINTS.REVIEWS`

5. **Other files** - Search for `http://localhost:5000` in:
   - Contact.jsx
   - UserDashboard.jsx
   - Appointment.jsx
   - RegistrationForm.jsx
   - AdminLogin.jsx
   - order.jsx
   - PetAdoptionForm.jsx
   - And other files...

## 🛠️ Quick Search Command

Apne terminal mein yeh command run karo to find all files:
```bash
# Windows PowerShell
Get-ChildItem -Path frontend/src -Recurse -Include *.jsx,*.js | Select-String "localhost:5000"

# Or use VS Code search
# Press Ctrl+Shift+F and search for "localhost:5000"
```

## 💡 Best Practice

Har file ke top par yeh add karo:
```javascript
import { API_ENDPOINTS } from '../config/api';
// ya
import API_BASE_URL from '../config/api';
```

Phir hardcoded URLs ko replace karo:
```javascript
// Before
fetch('http://localhost:5000/api/user/login')

// After
fetch(API_ENDPOINTS.USER_LOGIN)
```

## ⚠️ Important Note

**Production deploy karne se pehle** sabhi files update kar lena, warna frontend backend se connect nahi kar payega!

---

**Tip**: Agar time nahi hai to pehle deploy karo, phir gradually update karte raho. Lekin `REACT_APP_API_URL` environment variable set karna mat bhoolo Vercel mein!

