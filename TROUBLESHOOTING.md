# CPak Troubleshooting Guide

This guide addresses common issues you might encounter when setting up and running the CPak application.

## Backend Issues

### Error: Cannot find module 'app.js'

If you see this error when running `npm start` in the backend directory:

```
Error: Cannot find module 'C:\Users\Owner\CPak\backend\app.js'
```

This means the app.js file is missing or not in the expected location. Here's how to fix it:

#### Solution 1: Create the app.js file

1. Make sure you're in the backend directory:
   ```bash
   cd backend
   ```

2. Download the app.js file from the repository:
   ```bash
   # If you have git installed and the repository cloned:
   git checkout origin/main -- app.js
   ```

3. If the above doesn't work, create app.js manually by copying the content from the repository.

#### Solution 2: Check your directory structure

Make sure your directory structure matches the expected structure:

```
CPak-1/
├── backend/
│   ├── app.js
│   ├── env.example
│   └── package.json
├── frontend/
│   ├── package.json
│   └── src/
└── database/
    ├── export_postgres.py
    └── simple_export.py
```

#### Solution 3: Fix the package.json start script

If the app.js file is in a different location, you can modify the start script in package.json:

1. Open backend/package.json
2. Find the "start" script
3. Update it to point to the correct location of app.js:
   ```json
   "scripts": {
     "start": "node ./app.js"
   }
   ```

### Database Connection Issues

If the backend starts but can't connect to the database:

1. Check that PostgreSQL is running
2. Verify your database credentials in the .env file
3. Make sure the database exists:
   ```bash
   psql -U postgres -c "SELECT datname FROM pg_database WHERE datname='cpak';"
   ```

## Frontend Issues

### Node Modules Missing

If you see errors about missing modules:

```bash
cd frontend
npm install
```

### API Connection Issues

If the frontend can't connect to the backend:

1. Make sure the backend is running on port 3001
2. Check for CORS issues in the browser console
3. Verify the API URL in the frontend code (should be http://localhost:3001)

## Deployment on Existing Web Server

If you want to deploy the application on an existing web server:

### Option 1: Full Production Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. Copy the build directory to your web server's document root:
   ```bash
   cp -r build /path/to/your/webserver/document/root
   ```

3. Set up the backend:
   ```bash
   cd backend
   npm install
   ```

4. Create a .env file with your production settings:
   ```
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=your_db_host
   DB_PORT=5432
   DB_NAME=cpak
   PORT=3001
   NODE_ENV=production
   ```

5. Run the backend with a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start app.js
   ```

6. Configure your web server to proxy API requests to the backend (see SETUP_GUIDE.md for examples)

### Option 2: Development Mode on Web Server

If you want to run the application in development mode on your web server:

1. Clone the repository on your server:
   ```bash
   git clone https://github.com/willpowerpcs2/CPak-1.git
   cd CPak-1
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   cp env.example .env
   # Edit .env with your database credentials
   ```

3. Start the backend:
   ```bash
   npm start
   ```

4. In a separate terminal, set up the frontend:
   ```bash
   cd frontend
   npm install
   ```

5. Start the frontend development server:
   ```bash
   npm start
   ```

6. Access the application at http://your-server-ip:3000

## Common Error Messages and Solutions

### "Error: Cannot find module 'express'"

This means the dependencies are not installed:

```bash
cd backend
npm install
```

### "Error: connect ECONNREFUSED 127.0.0.1:5432"

This means the PostgreSQL server is not running or not accessible:

1. Start PostgreSQL
2. Check your firewall settings
3. Verify the host and port in your .env file

### "Error: password authentication failed for user"

This means your database credentials are incorrect:

1. Check the DB_USER and DB_PASSWORD in your .env file
2. Verify that the user exists in PostgreSQL and has the correct password

### "Error: database 'cpak' does not exist"

This means the database has not been created:

```bash
psql -U postgres -c "CREATE DATABASE cpak;"
```

Then import your data using the methods described in SETUP_GUIDE.md.