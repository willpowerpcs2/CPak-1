# CPak Database Explorer Setup Guide

This guide will help you set up and run the CPak Database Explorer application, which allows you to interact with your PostgreSQL database through a web interface.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Your exported database files (from the database_export directory)

## Database Setup

1. Make sure your PostgreSQL server is running
2. Create a new database for the application:
   ```sql
   CREATE DATABASE cpak;
   ```
3. Import the database schema and data using one of the following methods:

   **Option 1: Using the SQL dump file**
   ```bash
   psql -U postgres -d cpak -f ./database_export/cpak_dump.sql
   ```

   **Option 2: Using the CSV files**
   ```bash
   python database/import_from_csv.py \
     --db-name cpak \
     --db-user postgres \
     --db-password your_password \
     --db-host localhost \
     --db-port 5432 \
     --csv-dir ./database_export/csv
   ```

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file by copying the example:
   ```bash
   cp env.example .env
   ```

3. Edit the `.env` file with your database credentials:
   ```
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=cpak
   PORT=3001
   NODE_ENV=development
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

   The backend server should now be running on http://localhost:3001

## Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

   The frontend application should now be running on http://localhost:3000

## Using the Application

Once both the backend and frontend are running, you can access the application at http://localhost:3000. The application provides the following features:

1. **Dashboard**: Overview of your database with statistics and charts
2. **Table Browser**: Browse all tables in the database
3. **Table Detail**: View and search data within a specific table
4. **Search**: Search across all tables in the database

## Troubleshooting

### Backend Connection Issues

If the backend cannot connect to the database:

1. Check that your PostgreSQL server is running
2. Verify the database credentials in the `.env` file
3. Make sure the database exists and has been properly imported
4. Check the backend logs for specific error messages

### Frontend Connection Issues

If the frontend cannot connect to the backend:

1. Make sure the backend server is running on port 3001
2. Check that the proxy setting in `frontend/package.json` is set to `"http://localhost:3001"`
3. Restart the frontend development server

### Data Import Issues

If you encounter issues importing the data:

1. Check that the CSV files are properly formatted
2. Verify that you have the necessary permissions to create and modify the database
3. Try using the SQL dump file instead of the CSV files

## Deployment

### Production Deployment

To deploy the application to a production environment:

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Configure the backend for production:
   ```
   NODE_ENV=production
   ```

3. Serve the frontend build directory with your web server (Apache, Nginx, etc.)
4. Run the backend server with a process manager like PM2:
   ```bash
   npm install -g pm2
   cd backend
   pm2 start app.js
   ```

### Web Server Configuration

#### Nginx Example

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /path/to/frontend/build;
        try_files $uri $uri/ /index.html;
    }

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

#### Apache Example

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/frontend/build

    <Directory "/path/to/frontend/build">
        AllowOverride All
        Require all granted
        Options -Indexes +FollowSymLinks
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    ProxyPass /api http://localhost:3001
    ProxyPassReverse /api http://localhost:3001
</VirtualHost>
```

## Support

If you encounter any issues or have questions, please contact the development team for assistance.