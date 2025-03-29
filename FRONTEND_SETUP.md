# CPak Frontend Setup Guide

This guide will help you set up and run the CPak frontend application.

## Common Issues and Solutions

### "Invalid options object. Dev Server has been initialized using an options object that does not match the API schema."

This error occurs when there's an issue with the webpack development server configuration. The most common cause is an incorrect `.env` file configuration.

### "Could not find a required file. Name: index.html"

This error occurs when the React development server can't find the required `index.html` file in the `public` directory.

## Quick Fix

We've created a simple script to fix these issues automatically:

1. Run the fix script:
   ```
   fix_frontend.bat
   ```

2. This script will:
   - Create a proper `.env` file with the correct configuration
   - Ensure all required files exist in the `public` directory
   - Start the frontend application

## Manual Fix

If you prefer to fix the issues manually:

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Create or update the `.env` file with the following content:
   ```
   BROWSER=none
   PORT=3000
   REACT_APP_API_URL=http://localhost:3001
   ```

3. Make sure the `public` directory exists and contains:
   - `index.html`
   - `manifest.json`
   - `robots.txt`
   - `favicon.ico`

4. Start the frontend:
   ```
   npm start
   ```

## Accessing the Application

After starting both the backend and frontend:

1. The backend should be running on: http://localhost:3001
2. The frontend should be running on: http://localhost:3000

## Troubleshooting

If you still encounter issues:

1. Try deleting the `node_modules` folder and reinstalling dependencies:
   ```
   cd frontend
   rm -rf node_modules
   npm install
   ```

2. Check for any error messages in the console when starting the application.

3. Make sure the backend is running and accessible at http://localhost:3001/api/tables

## Need Help?

If you continue to experience issues, please provide the exact error messages you're seeing for further assistance.