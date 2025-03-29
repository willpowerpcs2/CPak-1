# Frontend Troubleshooting Guide

This guide will help you resolve common issues with the CPak-1 frontend application.

## Fixing the "Invalid options object" Error

If you're seeing this error when starting the frontend:

```
Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
- options.allowedHosts[0] should be a non-empty string.
```

This is caused by problematic settings in the `.env` file. Follow these steps to fix it:

### Option 1: Use the Automated Fix Script

1. Pull the latest changes from the repository:
   ```bash
   git pull origin main
   ```

2. Run the fix script from the root directory:
   ```bash
   fix_frontend_config.bat
   ```

3. The script will:
   - Create a simplified `.env` file without problematic settings
   - Ensure all required files exist in the public directory
   - Start the frontend application

### Option 2: Fix Manually

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Create a simplified `.env` file with the following content:
   ```
   BROWSER=none
   PORT=3000
   REACT_APP_API_URL=http://localhost:3001
   ```

3. Make sure the `public` directory contains these files:
   - `index.html`
   - `manifest.json`
   - `robots.txt`
   - `favicon.ico`

4. Start the frontend:
   ```bash
   npm start
   ```

## Common Issues and Solutions

### 1. "Cannot GET /" Error in Browser

If you see "Cannot GET /" when accessing the application, it means:

- You're accessing the backend server directly (port 3001) instead of the frontend server (port 3000)
- The frontend development server isn't running

**Solution:**
- Make sure to access the application at http://localhost:3000
- Ensure the frontend server is running with `npm start` in the frontend directory

### 2. Missing Files in Public Directory

If you see errors about missing files like `index.html`:

**Solution:**
- Run the fix script: `node fix_allowedhosts.js` in the frontend directory
- This will create all necessary files in the public directory

### 3. Database Connection Issues

If the backend can't connect to the database:

**Solution:**
- Check the `.env` file in the backend directory
- Make sure the database credentials are correct
- Ensure PostgreSQL is running
- Try running the database setup script: `node setup_db.js` in the backend directory

## Complete Setup Process

For a fresh setup of the CPak-1 application:

1. **Set up the backend:**
   ```bash
   cd backend
   # Create .env file with your database credentials
   npm install
   npm start
   ```

2. **Set up the frontend:**
   ```bash
   cd frontend
   # Run the fix script to create necessary files
   node fix_allowedhosts.js
   npm install
   npm start
   ```

3. **Access the application** at http://localhost:3000

## Need More Help?

If you continue to experience issues, try:

1. Deleting the `node_modules` directory in both frontend and backend folders
2. Running `npm install` in both directories
3. Following the setup process again

For persistent issues, check the console output for specific error messages that can help identify the problem.