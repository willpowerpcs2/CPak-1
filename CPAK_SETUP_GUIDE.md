# CPak Application Setup Guide

This guide will help you set up the CPak application with a working frontend and backend connected to your PostgreSQL database.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Your database should be populated with the CPak data (using the migration scripts)

## Quick Setup

For a quick setup, you can use the provided batch files:

1. **Fix Backend Connection**:
   ```
   fix_backend.bat
   ```
   This will:
   - Create the necessary backend files
   - Install required dependencies
   - Set up the database connection

2. **Fix Frontend Dependencies**:
   ```
   fix_frontend_dependencies.bat
   ```
   This will:
   - Install required frontend dependencies
   - Fix issues with the DatePicker component
   - Set up the frontend configuration

## Manual Setup

If you prefer to set up the application manually, follow these steps:

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a `.env` file with your database credentials:
   ```
   DB_NAME=cpak
   DB_USER=postgres
   DB_PASSWORD="YourPassword"
   DB_HOST=localhost
   DB_PORT=5432
   PORT=3001
   ```
   Note: If your password contains special characters, make sure to enclose it in quotes.

3. Install dependencies:
   ```
   npm install
   ```

4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run start_custom
   ```

## Accessing the Application

Once both the backend and frontend are running:

- The frontend will be available at: http://localhost:3000
- The backend API will be available at: http://localhost:3001

## Troubleshooting

### Backend Issues

1. **Database Connection Error**:
   - Verify your PostgreSQL service is running
   - Check your database credentials in the `.env` file
   - Make sure the database exists and has been populated with data

2. **Missing app.js**:
   - Run `node fix_backend_connection.js` in the backend directory to create it

3. **Port Already in Use**:
   - Change the PORT value in the `.env` file

### Frontend Issues

1. **DatePicker Component Errors**:
   - Run `node fix_dependencies.js` in the frontend directory

2. **"Invalid options object" Error**:
   - Use `npm run start_custom` instead of `npm start`

3. **"Cannot GET /" Error**:
   - Make sure both backend and frontend are running
   - Access the application via http://localhost:3000, not http://localhost:3001

## Database Structure

The CPak application uses the following main tables:

- `main_table`: Contains customer information
- `data_table`: Contains transaction data
- `ink_and_paper_color`: Contains color information
- `city_names`: Contains city information

## Application Features

The CPak application provides the following features:

1. **Main Dashboard**: Central hub with buttons for all major functions
2. **Past Due Balances**: View and manage past due accounts
3. **Customer Inquiries**: Search and view customer details
4. **Edit Merchant**: Edit existing merchant information
5. **New Merchant**: Add new merchants to the system
6. **Zone Management**: Assign zones to customers and calculate costs

## Need Help?

If you encounter any issues not covered in this guide, please check the other documentation files or contact support.