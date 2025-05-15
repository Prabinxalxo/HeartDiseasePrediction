# Deployment Guide for Heart Disease Prediction App

This document provides instructions for deploying the Heart Disease Prediction application to Render.

## Prerequisites

- A [Render](https://render.com/) account
- Your code pushed to a Git repository (GitHub, GitLab, etc.)

## Deployment Steps

### 1. Create a New Web Service on Render

1. Log in to your Render account
2. Click on "New" and select "Web Service"
3. Connect your Git repository where the code is hosted
4. Fill in the following details:
   - **Name**: heart-disease-prediction (or your preferred name)
   - **Environment**: Node
   - **Region**: Choose the region closest to your users
   - **Branch**: main (or your preferred branch)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid tier if needed)

### 2. Environment Variables

Add the following environment variables in the Render dashboard:
- `NODE_ENV`: production
- `PORT`: 10000 (Render will automatically set the actual port)

### 3. Advanced Settings (Optional)

- **Auto-Deploy**: Enable this if you want Render to automatically deploy when you push changes to your repository
- **Health Check Path**: /

### 4. Deploy

Click on "Create Web Service". Render will automatically build and deploy your application.

## Monitoring and Logs

After deployment, you can monitor your application and view logs directly from the Render dashboard.

## Custom Domain (Optional)

To use a custom domain:
1. Go to your web service settings in Render
2. Click on "Custom Domain"
3. Follow the instructions to add and verify your domain

## Mobile Support

Since this is a responsive web application, it will work on mobile devices by accessing the deployed URL through a mobile browser. You can also:

1. Add it to the home screen on mobile devices for an app-like experience
2. Consider wrapping it with a tool like Capacitor or Cordova if you need a native mobile app

## Troubleshooting

- If the build fails, check the logs for specific errors
- Make sure all dependencies are correctly listed in package.json
- Ensure the start script in package.json is configured correctly
- The application uses both Node.js and Python, so ensure Render correctly identifies and handles both runtime environments

## Contact

If you encounter issues with deployment, contact the development team for assistance.