# 🌐 Vercel Environment Variables Setup Guide

## 🔐 **Required Environment Variables for Frontend**

### **1. Go to Vercel Dashboard**
1. Visit [vercel.com](https://vercel.com)
2. Go to your "Career-Coach-Platform" project
3. Click on **"Settings"** tab
4. Scroll down to **"Environment Variables"**

### **2. Add Required Variables**

#### **API Configuration:**
```
REACT_APP_API_URL=https://career-coach-platform.onrender.com
```

#### **Optional Variables:**
```
REACT_APP_ENV=production
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_DEBUG_MODE=false
```

### **3. Environment-Specific Values**

#### **Development (Local):**
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

#### **Production (Vercel):**
```
REACT_APP_API_URL=https://career-coach-platform.onrender.com
REACT_APP_ENV=production
```

---

## 🔧 **Render Environment Variables Setup**

### **1. Go to Render Dashboard**
1. Visit [render.com](https://render.com)
2. Go to your "career-coach-platform" service
3. Click on **"Environment"** tab

### **2. Add Required Variables**

#### **Database Configuration:**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/career-coach
PORT=5000
NODE_ENV=production
```

#### **API Keys:**
```
OPENROUTER_API_KEY=sk-or-v1-your-openrouter-key-here
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
```

#### **Optional Variables:**
```
CORS_ORIGIN=https://career-coach-platform.vercel.app
```

---

## 🚨 **White Screen Troubleshooting**

### **Common Causes:**

#### **1. Missing REACT_APP_API_URL:**
- **Symptom**: White screen, no API calls working
- **Fix**: Add `REACT_APP_API_URL` to Vercel environment variables
- **Value**: `https://career-coach-platform.onrender.com`

#### **2. Incorrect API URL:**
- **Symptom**: API calls failing, loading states
- **Fix**: Ensure Render service is running and URL is correct
- **Check**: Render dashboard for service status

#### **3. Build Errors:**
- **Symptom**: Deployment fails or shows error page
- **Fix**: Check Vercel build logs for specific errors
- **Common**: ESLint errors, missing dependencies

#### **4. Environment Variable Access:**
- **Symptom**: `process.env` returns undefined
- **Fix**: Variables must start with `REACT_APP_` for Create React App
- **Restart**: Required after changing variables

---

## 🔍 **Debugging Steps**

### **Step 1: Check Vercel Build Logs**
1. Go to Vercel dashboard
2. Click on your project
3. Go to **"Functions"** tab
4. Check build logs for errors

### **Step 2: Check Browser Console**
1. Open your deployed site
2. Press `F12` to open developer tools
3. Check **"Console"** tab for errors
4. Look for API call failures

### **Step 3: Check Network Tab**
1. In developer tools, go to **"Network"** tab
2. Refresh the page
3. Look for failed API requests (red status codes)
4. Check request URLs and responses

### **Step 4: Verify Environment Variables**
```javascript
// Add this to your frontend code temporarily
console.log('API URL:', process.env.REACT_APP_API_URL);
console.log('Environment:', process.env.REACT_APP_ENV);
```

---

## 🚀 **Quick Fix for White Screen**

### **Temporary Solution:**
Add this to your `api.js` file as a fallback:

```javascript
const getValidApiUrl = () => {
  // Try environment variable first
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Fallback to production URL
  return 'https://career-coach-platform.onrender.com';
};
```

### **Permanent Solution:**
1. Add environment variables to Vercel dashboard
2. Redeploy the application
3. Verify API calls are working

---

## 📱 **Testing After Fix**

### **Check These Features:**
1. **Login/Registration** - Should work without errors
2. **Dashboard Loading** - Should display user data
3. **Interview Practice** - Should generate AI questions
4. **Resume Upload** - Should analyze and save
5. **Job Matching** - Should compare and score
6. **Analytics** - Should show charts and metrics

### **Expected Behavior:**
- ✅ No white screen
- ✅ All API calls successful
- ✅ Data loading properly
- ✅ Navigation working
- ✅ Responsive design

---

## 🆘 **Get Help**

### **If Still Issues:**
1. **Vercel Support**: support@vercel.com
2. **Render Support**: support@render.com
3. **GitHub Issues**: Check deployment status
4. **Browser Console**: Check for JavaScript errors

### **Share Error Details:**
When asking for help, include:
- Vercel build logs
- Browser console errors
- Network request failures
- Environment variable values (without secrets)

---

## ✅ **Verification Checklist**

- [ ] Environment variables added to Vercel
- [ ] Environment variables added to Render
- [ ] Application redeployed
- [ ] Build completed successfully
- [ ] No white screen on load
- [ ] All API calls working
- [ ] Features functional
- [ ] Mobile responsive
- [ ] No console errors

---

**🎯 Follow this guide to fix the white screen issue!**
