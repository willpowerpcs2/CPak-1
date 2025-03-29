# React Frontend Setup Guide

This guide will help you set up and run the CPak-1 frontend application, addressing common configuration issues.

## Common Issues and Solutions

### "Invalid options object. Dev Server has been initialized using an options object that does not match the API schema."

This error occurs when there's a mismatch between the webpack configuration and the version of React Scripts you're using. The specific error about `allowedHosts[0]` indicates a problem with the webpack dev server configuration.

### "Could not find a required file. Name: index.html"

This error occurs when the React application can't find the necessary files in the `public` directory.

## Quick Fix

We've created a script that automatically fixes these issues. To use it:

1. Run the fix script:
   ```
   fix_frontend_react.bat
   ```

2. After the script completes, start the frontend with:
   ```
   cd frontend
   npm run start_custom
   ```

## What the Fix Script Does

The fix script (`fix_react_config.js`) performs the following actions:

1. Creates a clean `.env` file without problematic settings
2. Ensures all required files exist in the `public` directory
3. Creates a custom webpack configuration
4. Adds a special environment variable `DANGEROUSLY_DISABLE_HOST_CHECK=true` to bypass the allowedHosts issue
5. Creates a custom start script that uses the correct configuration

## Manual Fix (If the Script Doesn't Work)

If the automatic fix doesn't work, you can try these manual steps:

1. Create a `.env.development` file in the `frontend` directory with:
   ```
   BROWSER=none
   PORT=3000
   REACT_APP_API_URL=http://localhost:3001
   DANGEROUSLY_DISABLE_HOST_CHECK=true
   ```

2. Start the React application with:
   ```
   cd frontend
   npx cross-env DANGEROUSLY_DISABLE_HOST_CHECK=true react-scripts start
   ```

## Accessing the Application

After starting both the backend and frontend:

1. Backend should be running at: http://localhost:3001
2. Frontend should be running at: http://localhost:3000

## Troubleshooting

If you still encounter issues:

1. **Missing dependencies**: Run `npm install` in the frontend directory
2. **Port conflicts**: Make sure nothing else is using ports 3000 or 3001
3. **Node version**: This application works best with Node.js version 14 or higher

## Need More Help?

If you continue to experience issues, please provide the exact error messages you're seeing for further assistance.