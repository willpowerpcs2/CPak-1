# CPak Project Setup Guide

This guide provides step-by-step instructions for setting up and running the CPak project after successfully exporting your database.

## Prerequisites

- Node.js (v14+) and npm
- PostgreSQL database with your exported data
- Git (for version control)

## Project Structure

The project consists of three main components:

1. **Database** - PostgreSQL database with your migrated data
2. **Backend** - Node.js/Express API server
3. **Frontend** - React application with Material UI

## Setup Instructions

### 1. Database Setup

If you've already run the migration script and exported your database, you should have a PostgreSQL database named `cpak` with all your data. If not, follow these steps:

```bash
# Import from SQL dump (if available)
psql -U postgres -d cpak -f ./database_export/cpak_dump.sql

# OR import from CSV files (if SQL dump is not available)
python database/import_from_csv.py --input ./database_export/csv --db-name cpak --db-user postgres --db-password your_password
```

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Copy the environment example file
cp env.example .env

# Edit the .env file with your database credentials
# Use your favorite text editor to modify:
# - DB_USER
# - DB_PASSWORD
# - DB_HOST
# - DB_PORT
# - DB_NAME

# Install dependencies
npm install

# Start the backend server
npm start
```

The backend server should start on port 3001 (default). You should see a message like:
```
Server running on port 3001
Database connected successfully at: [timestamp]
```

### 3. Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```

The frontend development server should start on port 3000 (default) and automatically open in your browser. If it doesn't, you can access it at http://localhost:3000.

## Using the Application

Once both the backend and frontend are running, you can:

1. **View Database Tables** - The sidebar shows all tables in your database
2. **Browse Table Data** - Click on any table to view its data in a paginated grid
3. **Dashboard** - View summary information about your database

## Troubleshooting

### Backend Connection Issues

If the backend can't connect to the database:

1. Check that PostgreSQL is running
2. Verify your database credentials in the `.env` file
3. Make sure the database exists and has data
4. Check the console for specific error messages

### Frontend Connection Issues

If the frontend can't connect to the backend:

1. Make sure the backend is running on port 3001
2. Check the browser console for CORS or network errors
3. Verify that the proxy setting in `package.json` is set to `http://localhost:3001`

### Missing Tables or Data

If tables or data are missing:

1. Check that the database was properly exported and imported
2. Verify that the database user has permissions to access all tables
3. Check the database directly using a tool like pgAdmin or psql

## Next Steps for Development

Now that you have the basic application running, you can:

1. **Add Authentication** - Implement user login and access control
2. **Enhance the UI** - Add more features to the frontend
3. **Create Forms** - Add forms for data entry and editing
4. **Add Reports** - Create custom reports and visualizations
5. **Implement Business Logic** - Add specific business rules and workflows

## Need Help?

If you encounter any issues or need assistance, please:

1. Check the error messages in the console
2. Review the documentation
3. Reach out for support