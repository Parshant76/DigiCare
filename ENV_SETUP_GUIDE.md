# 🔐 Environment Variables Setup Guide

This guide will help you set up all required environment variables for the DigiCare project.

## Required Environment Variables

### 1. MONGODB_URI
**What it is**: Your MongoDB database connection string  
**Where to get it**:
- **Option A - MongoDB Atlas (Recommended for deployment)**:
  1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
  2. Sign up/Login
  3. Create a new cluster (Free tier available)
  4. Click "Connect" → "Connect your application"
  5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/digicare?retryWrites=true&w=majority`)
  6. Replace `<password>` with your actual database password
  
- **Option B - Local MongoDB**:
  - Use: `mongodb://localhost:27017/digicare`

**Example**: `mongodb+srv://parshant:mypassword123@cluster0.abcd.mongodb.net/digicare`

---

### 2. PORT
**What it is**: The port your backend server runs on  
**Value**: `3000` (default, Vercel will override this automatically)

---

### 3. JWT_SECRET
**What it is**: A secret key used to sign and verify authentication tokens  
**Where to get it**: **You create this yourself!**

**How to generate a secure JWT_SECRET**:
```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -base64 64

# Option 3: Use any random string (at least 32 characters)
# Example: mySuper$ecretK3y12345ForDigiCare@2025!
```

**Example**: `a7f8d9e6c5b4a3210987654321fedcba9876543210abcdef1234567890abcd`

> **⚠️ IMPORTANT**: Never share your JWT_SECRET! Keep it secret and unique.

---

### 4. CLOUDINARY_CLOUD_NAME
**What it is**: Your Cloudinary account name (for storing medical images/reports)  
**Where to get it**:
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up/Login (Free tier available)
3. From your Dashboard, copy the **Cloud Name**

**Example**: `df0v2yuha`

---

### 5. CLOUDINARY_API_KEY
**What it is**: API key for Cloudinary authentication  
**Where to get it**:
- From your Cloudinary Dashboard, copy the **API Key**

**Example**: `664459655796562`

---

### 6. CLOUDINARY_API_SECRET
**What it is**: API secret for Cloudinary authentication  
**Where to get it**:
- From your Cloudinary Dashboard, copy the **API Secret**
- Click the "eye" icon to reveal it

**Example**: `spFIg5G92KLT7pRBwz5rVFOChLk`

---

## 📝 Setting Up Your .env File

1. **Navigate to the Backend folder**:
   ```bash
   cd Backend
   ```

2. **Create a `.env` file** (copy from `.env.example`):
   ```bash
   # On Windows
   copy .env.example .env
   
   # On Mac/Linux
   cp .env.example .env
   ```

3. **Edit the `.env` file** and fill in your actual values:
   ```env
   MONGODB_URI=mongodb+srv://youruser:yourpassword@cluster0.mongodb.net/digicare
   PORT=3000
   JWT_SECRET=your_generated_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   FRONTEND_URL=http://localhost:5173
   ```

---

## 🚀 For Vercel Deployment

When deploying to Vercel, add these as **Environment Variables** in the Vercel dashboard:

1. Go to your project in Vercel
2. Click "Settings" → "Environment Variables"
3. Add each variable:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

> **Note**: You don't need to add `PORT` or `FRONTEND_URL` for Vercel (handled automatically)

---

## ✅ Verification

To test if your environment variables are working:

```bash
# In the Backend directory
npm run dev
```

You should see:
```
Server running on http://localhost:3000
MongoDB connected successfully
```

If you see errors, double-check your `.env` values!
