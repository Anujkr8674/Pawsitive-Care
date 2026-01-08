# 📦 MongoDB Data Migration Guide

## Problem
Local MongoDB mein data hai, lekin MongoDB Atlas (online) mein nahi hai.

## Solution: Data Export/Import

### Method 1: MongoDB Compass se Export/Import (Easiest)

#### Step 1: Local Data Export
1. MongoDB Compass mein local database open karo (`pet` database)
2. `adminregs` collection select karo
3. Top right mein "Export Collection" button click karo
4. Format: `JSON` select karo
5. Export karo - file save ho jayegi

#### Step 2: Atlas mein Import
1. MongoDB Atlas mein jao
2. Left sidebar mein "Data Explorer" par click karo
3. `petcare` database select karo
4. `adminregs` collection par click karo
5. "ADD DATA" button click karo
6. "Import File" select karo
7. Exported JSON file select karo
8. Import karo

### Method 2: mongodump/mongorestore (Command Line)

#### Step 1: Local Data Export
```bash
mongodump --uri="mongodb://localhost:27017" --db=pet --out=./backup
```

#### Step 2: Atlas mein Import
```bash
mongorestore --uri="mongodb+srv://petcare_user:Anuj%230000@cluster0.4ghlj.mongodb.net/petcare" ./backup/pet
```

### Method 3: Manual Copy (Small Data)

Agar data kam hai, to manually copy kar sakte ho:
1. Local Compass mein document open karo
2. Copy karo
3. Atlas mein "ADD DATA" → "Insert Document" se paste karo

---

## Quick Steps (Recommended)

1. **Local Compass se Export:**
   - Collection → Export Collection → JSON → Save

2. **Atlas mein Import:**
   - Data Explorer → Collection → ADD DATA → Import File → Select JSON → Import

---

## Important Notes

- Local database: `pet`
- Atlas database: `petcare` (yeh already create ho gaya hai)
- Collections same hain: `adminregs`, `adminlogins`, etc.

---

## All Collections Export/Import

Agar sab collections migrate karni hain:

1. **Export all collections from local:**
   - Har collection ko individually export karo
   - Ya `mongodump` use karo

2. **Import all to Atlas:**
   - Har collection ko individually import karo
   - Ya `mongorestore` use karo

---

**Note:** Agar data bahut zyada hai, to `mongodump/mongorestore` use karo. Agar kam hai, to Compass se export/import karo.


