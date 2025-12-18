# Deployment Guide for GardenGuru 🚀

This guide will help you deploy your GardenGuru application using **Render** (Backend) and **Vercel** (Frontend).

---

## 📋 Prerequisites

1. GitHub account with your code pushed
2. [Render](https://render.com) account (free tier available)
3. [Vercel](https://vercel.com) account (free tier available)
4. MongoDB Atlas account for cloud database

---

## 🗄️ Step 1: Set Up MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click **"Connect"** → **"Connect your application"**
4. Copy your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
5. Replace `<password>` with your actual password
6. Save this connection string - you'll need it for Render

---

## 🖥️ Step 2: Deploy Backend on Render

### 2.1 Create Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `Garden_Guru-MERN-PROJECT`
4. Configure the service:
   - **Name**: `gardenguru-backend` (or any name you prefer)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 2.2 Add Environment Variables

In the **Environment** section, add these variables:

```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5001
```

**Important Notes:**
- Replace `your_mongodb_atlas_connection_string` with the MongoDB connection string from Step 1
- Generate a random JWT_SECRET (at least 32 characters)
- Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### 2.3 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Once deployed, you'll get a URL like: `https://gardenguru-backend.onrender.com`
4. **Save this URL** - you'll need it for the frontend!

### 2.4 Seed the Database (Optional)

After deployment, run the seed script:
1. Go to your Render dashboard
2. Click on your service → **"Shell"** tab
3. Run: `npm run seed`

---

## 🌐 Step 3: Deploy Frontend on Vercel

### 3.1 Update API URL in Frontend

Before deploying, update the backend URL in your frontend code:

**Option 1: Create Environment Variable (Recommended)**

Create `frontend/.env.production`:
```
VITE_API_URL=https://your-render-backend-url.onrender.com
```

Then update all API calls in your frontend to use:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
```

**Option 2: Direct Update (Quick)**

Find and replace all instances of `http://localhost:5001` with your Render backend URL in:
- `frontend/src/components/AIGardener.jsx`
- `frontend/src/pages/Login.jsx`
- `frontend/src/pages/Register.jsx`
- Any other files making API calls

### 3.2 Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository: `Garden_Guru-MERN-PROJECT`
4. Configure project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables (if using Option 1):
   ```
   VITE_API_URL=https://your-render-backend-url.onrender.com
   ```
6. Click **"Deploy"**
7. Wait 2-3 minutes for deployment
8. You'll get a URL like: `https://garden-guru-mern.vercel.app`

---

## ✅ Step 4: Test Your Deployment

1. Visit your Vercel URL
2. Try to register a new account
3. Login and test features:
   - Add plants to your garden
   - Chat with AI assistant
   - View community posts

---

## 🔧 Troubleshooting

### Backend Issues (Render)

**Problem**: "Application failed to start"
- Check logs in Render dashboard
- Verify all environment variables are set correctly
- Ensure MongoDB connection string is correct

**Problem**: "Cannot connect to database"
- Check MongoDB Atlas network access (allow all IPs: `0.0.0.0/0`)
- Verify connection string has correct password

### Frontend Issues (Vercel)

**Problem**: "API calls failing"
- Check if backend URL is correct
- Verify CORS is enabled in backend (already configured in your code)
- Check browser console for errors

**Problem**: "Build failed"
- Check Vercel build logs
- Ensure all dependencies are in `package.json`

---

## 🎉 Success!

Your GardenGuru app is now live! Share your URLs:
- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-backend.onrender.com`

---

## 📝 Important Notes

1. **Free Tier Limitations**:
   - Render free tier: Backend sleeps after 15 minutes of inactivity (first request may be slow)
   - Vercel free tier: Unlimited bandwidth for personal projects

2. **Security**:
   - Never commit `.env` files to GitHub
   - Keep your API keys secret
   - Use strong JWT secrets

3. **Updates**:
   - Push to GitHub `main` branch to auto-deploy
   - Vercel and Render will automatically rebuild

---

## 🆘 Need Help?

If you encounter issues:
1. Check deployment logs on Render/Vercel
2. Verify environment variables
3. Test backend API directly using Postman or browser
4. Check MongoDB Atlas connection
