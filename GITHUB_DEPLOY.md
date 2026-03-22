# GitHub Upload Instructions

## Step 1: Create GitHub Repository
1. Go to https://github.com
2. Click **"New"** → **"Repository"**
3. Repository name: `career-coach-platform`
4. Description: `AI-powered career coaching platform with interview practice and job market insights`
5. Make it **Public**
6. **DO NOT** initialize with README (we already have one)
7. Click **"Create repository"**

## Step 2: Push to GitHub
Run these commands in your terminal:

```bash
# Add remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/career-coach-platform.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel
1. Go to https://vercel.com
2. Click **"Sign Up"** → **"Continue with GitHub"**
3. Click **"New Project"**
4. Select your `career-coach-platform` repository
5. Vercel will auto-detect React app
6. Click **"Deploy"**

## Step 4: Configure Environment Variables
In Vercel dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add: `REACT_APP_API_URL` = `https://your-backend-url.onrender.com`

## Step 5: Deploy Backend to Render
1. Go to https://render.com
2. Click **"New"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the **backend** folder
5. Add environment variables from your .env file
6. Click **"Create Web Service"**

## 🎉 Your Project Will Be Live!

After deployment:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend.onrender.com
- **Users can**: Sign up, practice interviews, get career guidance

## Quick Commands Summary:
```bash
git remote add origin https://github.com/YOUR_USERNAME/career-coach-platform.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username!
