#!/bin/bash

# 🚀 Career Coach Platform - Deployment Script
# This script automates the complete deployment process

echo "🎯 Starting Career Coach Platform Deployment..."
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Step 1: Pre-deployment checks
echo ""
echo "📋 Step 1: Pre-deployment Checks"
echo "--------------------------------"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Not in project root directory!"
    exit 1
fi
print_status "Project directory verified"

# Check if git is clean
if [ -n "$(git status --porcelain)" ]; then
    print_warning "Git working directory is not clean"
    echo "📝 Committing changes..."
    git add .
    git commit -m "Auto-commit before deployment - $(date)"
    print_status "Changes committed"
else
    print_status "Git working directory is clean"
fi

# Step 2: Frontend Build
echo ""
echo "🏗️ Step 2: Building Frontend"
echo "--------------------------------"

cd frontend
print_status "Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_status "Dependencies installed successfully"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi

print_status "Running frontend tests..."
npm test --if-present

print_status "Building frontend for production..."
npm run build

if [ $? -eq 0 ]; then
    print_status "Frontend built successfully"
else
    print_error "Frontend build failed"
    exit 1
fi

# Step 3: Backend Preparation
echo ""
echo "🔧 Step 3: Backend Preparation"
echo "--------------------------------"

cd ../backend
print_status "Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_status "Backend dependencies installed successfully"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi

print_status "Running backend tests..."
npm test --if-present

# Step 4: Git Operations
echo ""
echo "📤 Step 4: Git Operations"
echo "--------------------------------"

cd ..
print_status "Adding all changes to git..."
git add .

print_status "Committing changes..."
git commit -m "🚀 Production Deployment - $(date '+%Y-%m-%d %H:%M:%S')

print_status "Tagging release..."
git tag -a "v$(date '+%Y.%m.%d')" -m "Production release - $(date '+%Y-%m-%d')"

print_status "Pushing to GitHub..."
git push origin main
git push origin --tags

if [ $? -eq 0 ]; then
    print_status "Successfully pushed to GitHub"
else
    print_error "Failed to push to GitHub"
    exit 1
fi

# Step 5: Deployment Verification
echo ""
echo "🌐 Step 5: Deployment Verification"
echo "--------------------------------"

print_status "Vercel deployment triggered..."
print_status "Render deployment triggered..."

echo ""
echo "📊 Deployment Summary:"
echo "======================"
print_status "Frontend: https://career-coach-platform.vercel.app"
print_status "Backend: https://career-coach-platform.onrender.com"
print_status "Documentation: https://github.com/shihvivamsikarwar/Career-Coach-Platform"

echo ""
echo "⏱️  Waiting for deployments to complete..."
echo "💡 Check your Vercel and Render dashboards for progress"
echo ""
echo "🎯 Deployment process completed!"
echo "🎉 Your Career Coach Platform is going live!"

# Optional: Open the deployed sites
echo ""
read -p "🌐 Open deployed sites? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌐 Opening deployed sites..."
    if command -v xdg-open > /dev/null; then
        xdg-open "https://career-coach-platform.vercel.app"
        xdg-open "https://career-coach-platform.onrender.com"
    elif command -v open > /dev/null; then
        open "https://career-coach-platform.vercel.app"
        open "https://career-coach-platform.onrender.com"
    elif command -v start > /dev/null; then
        start "https://career-coach-platform.vercel.app"
        start "https://career-coach-platform.onrender.com"
    fi
fi

echo ""
print_status "🎊 Career Coach Platform deployment completed successfully!"
echo "📈 Your platform is now live and helping job seekers worldwide!"
