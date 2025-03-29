# CPak Web Server Deployment Guide

This guide provides instructions for deploying the CPak application on a web server that's already set up.

## Prerequisites

- A web server with Node.js (v14+) installed
- PostgreSQL database server
- Your exported database files

## Deployment Steps

### 1. Database Setup

First, you need to set up your PostgreSQL database on the server:

```bash
# Create a new database (if not already created)
createdb -U postgres cpak

# Import from SQL dump (if available)
psql -U postgres -d cpak -f ./database_export/cpak_dump.sql

# OR import from CSV files (if SQL dump is not available)
python database/import_from_csv.py --input ./database_export/csv --db-name cpak --db-user postgres --db-password your_password
```

### 2. Backend Deployment

```bash
# Navigate to the backend directory
cd backend

# Copy the environment example file
cp env.example .env

# Edit the .env file with your server's database credentials
# Use your favorite text editor to modify:
# - DB_USER
# - DB_PASSWORD
# - DB_HOST (use your database server's hostname or IP)
# - DB_PORT
# - DB_NAME

# Install dependencies
npm install

# Build the application (if needed)
# npm run build

# Start the backend server
# For development:
npm start

# For production (using PM2 process manager):
npm install -g pm2
pm2 start app.js --name cpak-backend
```

### 3. Frontend Deployment

For the frontend, you have two options:

#### Option 1: Build and serve static files (Recommended for production)

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Build the application
npm run build

# The build folder will contain static files that can be served by any web server
# Copy these files to your web server's document root or configure a virtual host
```

Configure your web server (Apache/Nginx) to serve the static files:

**Apache example (httpd.conf or .htaccess)**:
```
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/frontend/build
    
    <Directory "/path/to/frontend/build">
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Proxy API requests to the backend
    ProxyPass /api http://localhost:3001/api
    ProxyPassReverse /api http://localhost:3001/api
</VirtualHost>
```

**Nginx example (nginx.conf)**:
```
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/frontend/build;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Proxy API requests to the backend
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Option 2: Development server (Not recommended for production)

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Edit package.json to update the proxy setting to point to your backend server
# Change "proxy": "http://localhost:3001" to "proxy": "http://your-server-ip:3001"

# Start the development server
npm start
```

### 4. Accessing the Application

Once deployed, you can access the application at:

- If using Option 1 (production): http://your-domain.com or http://your-server-ip
- If using Option 2 (development): http://your-server-ip:3000

## Troubleshooting

### Backend Connection Issues

If the backend can't connect to the database:

1. Check that PostgreSQL is running on the server
2. Verify your database credentials in the `.env` file
3. Make sure the database exists and has data
4. Check the console for specific error messages
5. Ensure your server's firewall allows connections to the PostgreSQL port

### Frontend Connection Issues

If the frontend can't connect to the backend:

1. Make sure the backend is running
2. Check that the proxy setting in package.json is correct (for development server)
3. Verify that your web server is correctly configured to proxy API requests
4. Check browser console for CORS or network errors

### Server Configuration Issues

1. Make sure your web server has the necessary modules enabled:
   - Apache: mod_proxy, mod_proxy_http
   - Nginx: http_proxy module
2. Check your web server's error logs for configuration issues
3. Ensure your server's firewall allows connections to the necessary ports

## Security Considerations

For a production deployment, consider:

1. Setting up HTTPS with SSL certificates
2. Implementing proper authentication
3. Securing your PostgreSQL database
4. Using environment variables for sensitive information
5. Regularly updating dependencies for security patches

## Monitoring and Maintenance

1. Set up logging for both frontend and backend
2. Consider using a process manager like PM2 for the Node.js backend
3. Set up monitoring for server resources and application health
4. Implement regular database backups