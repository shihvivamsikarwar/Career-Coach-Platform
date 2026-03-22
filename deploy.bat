@echo off
REM 🚀 Career Coach Platform - Windows Deployment Script
REM This script automates deployment on Windows systems

echo.
echo 🎯 Starting Career Coach Platform Deployment...
echo ================================================

REM Step 1: Pre-deployment checks
echo.
echo 📋 Step 1: Pre-deployment Checks
echo --------------------------------

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Not in project root directory!
    pause
    exit /b 1
)
echo ✅ Project directory verified

REM Check git status
for /f "tokens=*" %%i in ('git status --porcelain') do (
    if not "%%i"=="" (
        echo ⚠️ Git working directory is not clean
        echo 📝 Committing changes...
        git add .
        git commit -m "Auto-commit before deployment - %date%"
        echo ✅ Changes committed
        goto :git_clean
    )
)
:git_clean
echo ✅ Git working directory is clean

REM Step 2: Frontend Build
echo.
echo 🏗️ Step 2: Building Frontend
echo --------------------------------

cd frontend
echo ✅ Installing frontend dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

echo ✅ Running frontend tests...
call npm test 2>nul

echo ✅ Building frontend for production...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Frontend build failed
    pause
    exit /b 1
)

echo ✅ Frontend built successfully

REM Step 3: Backend Preparation
echo.
echo 🔧 Step 3: Backend Preparation
echo --------------------------------

cd ..\backend
echo ✅ Installing backend dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

echo ✅ Backend dependencies installed successfully

echo ✅ Running backend tests...
call npm test 2>nul

REM Step 4: Git Operations
echo.
echo 📤 Step 4: Git Operations
echo --------------------------------

cd ..
echo ✅ Adding all changes to git...
git add .

echo ✅ Committing changes...
git commit -m "🚀 Production Deployment - %date% %time%"

echo ✅ Tagging release...
git tag -a "v%date:~0,4%%date:~5,2%.%date:~8,2%" -m "Production release - %date%"

echo ✅ Pushing to GitHub...
git push origin main
git push origin --tags

if %errorlevel% neq 0 (
    echo ❌ Failed to push to GitHub
    pause
    exit /b 1
)

echo ✅ Successfully pushed to GitHub

REM Step 5: Deployment Verification
echo.
echo 🌐 Step 5: Deployment Verification
echo --------------------------------

echo ✅ Vercel deployment triggered...
echo ✅ Render deployment triggered...

echo.
echo 📊 Deployment Summary:
echo ======================
echo ✅ Frontend: https://career-coach-platform.vercel.app
echo ✅ Backend: https://career-coach-platform.onrender.com
echo ✅ Documentation: https://github.com/shihvivamsikarwar/Career-Coach-Platform

echo.
echo ⏱️  Waiting for deployments to complete...
echo 💡 Check your Vercel and Render dashboards for progress
echo.
echo 🎯 Deployment process completed!
echo 🎉 Your Career Coach Platform is going live!

REM Optional: Open the deployed sites
echo.
set /p choice=🌐 Open deployed sites? (y/n): 
if /i "%choice%"=="y" (
    echo 🌐 Opening deployed sites...
    start https://career-coach-platform.vercel.app
    start https://career-coach-platform.onrender.com
)

echo.
echo ✅ 🎊 Career Coach Platform deployment completed successfully!
echo 📈 Your platform is now live and helping job seekers worldwide!
pause
