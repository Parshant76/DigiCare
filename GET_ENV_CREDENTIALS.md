# 🔑 Complete Guide: How to Get Every Environment Variable

This guide provides **exact, step-by-step instructions** for obtaining each credential needed for DigiCare deployment.

---

## 1. MongoDB URI (Database Connection)

### What You Need
A MongoDB database connection string to store user data, medical records, etc.

### Step-by-Step Instructions

#### Option A: MongoDB Atlas (Recommended - Free Tier Available)

**Step 1: Create Account**
1. Go to https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"** button
3. Sign up with Google/GitHub or create account with email
4. Verify your email if required

**Step 2: Create a Cluster**
1. After login, you'll see "Deploy a cloud database"
2. Choose **M0 FREE** tier
3. Select a cloud provider (AWS recommended)
4. Choose a region closest to you
5. Leave cluster name as default or change it
6. Click **"Create Deployment"**
7. Wait 1-3 minutes for cluster creation

**Step 3: Create Database User**
1. A popup will appear asking to create a database user
2. Choose a username (example: `digicare-admin`)
3. Click **"Autogenerate Secure Password"** - COPY THIS PASSWORD!
4. Save the password somewhere safe (you'll need it soon)
5. Click **"Create Database User"**

**Step 4: Add IP Address**
1. In the same popup, scroll down to "Where would you like to connect from?"
2. Click **"Add My Current IP Address"** 
3. Or click **"Add a Different IP Address"** and enter `0.0.0.0/0` (allows all IPs - for development)
4. Click **"Finish and Close"**

**Step 5: Get Connection String**
1. Go to your cluster dashboard
2. Click the **"Connect"** button (green button)
3. Choose **"Drivers"** option
4. Select Driver: **Node.js**
5. Select Version: **5.5 or later**
6. Copy the connection string (looks like this):
   ```
   mongodb+srv://<username>:<password>@cluster0.abcd.mongodb.net/?retryWrites=true&w=majority
   ```

**Step 6: Format Your Connection String**
1. Take the copied string
2. Replace `<username>` with your username (e.g., `digicare-admin`)
3. Replace `<password>` with the password you saved in Step 3
4. Add `/digicare` before the `?` to specify the database name

**Final Result:**
```
mongodb+srv://digicare-admin:YourPassword123@cluster0.abcd.mongodb.net/digicare?retryWrites=true&w=majority
```

**Add to .env:**
```env
MONGODB_URI=mongodb+srv://digicare-admin:YourPassword123@cluster0.abcd.mongodb.net/digicare?retryWrites=true&w=majority
```

---

## 2. JWT_SECRET (Authentication Token Secret)

### What You Need
A random secret key to sign JSON Web Tokens for user authentication.

### Step-by-Step Instructions

**Method 1: Using Node.js (Recommended)**
1. Open terminal/command prompt
2. Run this command:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
3. Copy the output (will be a long random string)

**Method 2: Using OpenSSL (Mac/Linux)**
1. Open terminal
2. Run:
   ```bash
   openssl rand -base64 64
   ```
3. Copy the output

**Method 3: Using PowerShell (Windows)**
1. Open PowerShell
2. Run:
   ```powershell
   -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
   ```
3. Copy the output

**Method 4: Online Generator**
1. Go to https://generate-secret.vercel.app/64
2. Click generate
3. Copy the generated secret

**Example Output:**
```
a7f8d9e6c5b4a3210987654321fedcba9876543210abcdef1234567890abcdef1234567890abcdef1234567890
```

**Add to .env:**
```env
JWT_SECRET=a7f8d9e6c5b4a3210987654321fedcba9876543210abcdef1234567890abcdef1234567890abcdef1234567890
```

⚠️ **IMPORTANT**: Never share this secret! Keep it private.

---

## 3. Cloudinary Credentials (Image Storage)

### What You Need
Cloud name, API key, and API secret to store and serve medical images/reports.

### Step-by-Step Instructions

**Step 1: Create Account**
1. Go to https://cloudinary.com
2. Click **"Sign Up Free"** button
3. Fill in your details or sign up with Google
4. Verify your email

**Step 2: Access Dashboard**
1. After email verification, you'll be logged in automatically
2. You'll see the **Dashboard** page

**Step 3: Find Your Credentials**
1. On the Dashboard, look for the **"Product Environment Credentials"** section (usually at the top)
2. You'll see three values displayed:

**Cloud Name:**
- Look for: `Cloud name: xxxxxxxx`
- Example: `df0v2yuha`
- Copy this value

**API Key:**
- Look for: `API Key: ################`
- Example: `664459655796562`
- Copy this value

**API Secret:**
- Look for: `API Secret: ********` (hidden by default)
- Click the **eye icon** 👁️ next to it to reveal
- Example: `spFIg5G92KLT7pRBwz5rVFOChLk`
- Copy this value

**Alternative Way to Find Them:**
1. Click on the ⚙️ **Settings** icon (gear icon in top right)
2. Go to **"API Keys"** in the left sidebar
3. Your credentials will be listed there

**Add to .env:**
```env
CLOUDINARY_CLOUD_NAME=df0v2yuha
CLOUDINARY_API_KEY=664459655796562
CLOUDINARY_API_SECRET=spFIg5G92KLT7pRBwz5rVFOChLk
```

---

## 4. PORT (Server Port)

### What You Need
The port number your backend server runs on.

### Instructions
Simply use the default:

**Add to .env:**
```env
PORT=3000
```

**Note:** Vercel will override this automatically in production.

---

## 5. FRONTEND_URL (Optional - For CORS)

### What You Need
The URL of your frontend for CORS configuration.

### Instructions

**For Local Development:**
```env
FRONTEND_URL=http://localhost:5173
```

**For Production:**
- After deploying to Vercel, update this to your Vercel URL
- Example: `https://digicare.vercel.app`

---

## 📋 Final .env File Example

Create `Backend/.env` with all values:

```env
# MongoDB Configuration  
MONGODB_URI=mongodb+srv://digicare-admin:YourPassword123@cluster0.abcd.mongodb.net/digicare?retryWrites=true&w=majority

# Server Configuration
PORT=3000

# JWT Configuration
JWT_SECRET=a7f8d9e6c5b4a3210987654321fedcba9876543210abcdef1234567890abcdef1234567890

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=df0v2yuha
CLOUDINARY_API_KEY=664459655796562
CLOUDINARY_API_SECRET=spFIg5G92KLT7pRBwz5rVFOChLk

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

---

## ✅ Verification Steps

**Test Your MongoDB Connection:**
```bash
cd Backend
npm run dev
```

Look for: `MongoDB connected successfully`

**Common Issues:**
- ❌ "Authentication failed" → Wrong username/password in MongoDB URI
- ❌ "Network error" → IP address not whitelisted in MongoDB Atlas
- ❌ "Invalid URI" → Check your connection string format

---

## 🚀 For Vercel Deployment

When deploying to Vercel, add these same values in the Vercel dashboard:

1. Go to your project in Vercel
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - Key: `MONGODB_URI`
   - Value: (your MongoDB connection string)
   - Click **Add**
4. Repeat for all variables (except PORT and FRONTEND_URL)

**Don't add to Vercel:**
- `PORT` (Vercel handles this)
- `FRONTEND_URL` (Vercel auto-configures CORS)

---

## 🔒 Security Checklist

- ✅ Never commit `.env` to Git
- ✅ `.gitignore` includes `.env`
- ✅ Only share `.env.example` (with placeholders)
- ✅ Use different credentials for production vs development
- ✅ Rotate JWT_SECRET if compromised
