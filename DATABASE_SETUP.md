# Database Setup Guide

This guide will help you set up the database connection for the CPak application.

## Prerequisites

- PostgreSQL installed and running
- Node.js and npm installed
- CPak database created and populated

## Setting Up the Database Connection

### Option 1: Using the Setup Script (Recommended)

We've created a setup script that will help you configure your database connection. This script will:

1. Test your current database connection
2. Allow you to update your database credentials if needed
3. Save the updated credentials to the `.env` file

To use the setup script:

```bash
cd backend
npm run setup-db
```

Follow the prompts to configure your database connection.

### Option 2: Manual Configuration

If you prefer to configure the database connection manually:

1. Navigate to the backend directory:

```bash
cd backend
```

2. Open the `.env` file in a text editor:

```bash
# On Windows
notepad .env

# On macOS/Linux
nano .env
```

3. Update the database configuration section:

```
# Database Configuration
DB_USER=postgres
DB_PASSWORD="YourPasswordHere"
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cpak
```

**Important Notes:**
- Make sure to put your password in quotes, especially if it contains special characters
- The default database name is `cpak`
- The default port for PostgreSQL is `5432`

## Troubleshooting Database Connection Issues

If you're having trouble connecting to the database:

### 1. Check PostgreSQL Service

Make sure PostgreSQL is running:

- **Windows**: Check Services app to ensure PostgreSQL service is running
- **macOS**: Run `brew services list` to check if PostgreSQL is running
- **Linux**: Run `sudo systemctl status postgresql` to check service status

### 2. Verify Database Exists

Make sure the `cpak` database exists:

```bash
psql -U postgres -c "SELECT datname FROM pg_database WHERE datname='cpak';"
```

If it doesn't exist, create it:

```bash
psql -U postgres -c "CREATE DATABASE cpak;"
```

### 3. Check Password Special Characters

If your password contains special characters, make sure it's properly quoted in the `.env` file:

```
DB_PASSWORD="YourPassword#$%^"
```

### 4. Test Connection Directly

Test the connection directly with PostgreSQL client:

```bash
psql -U postgres -h localhost -p 5432 -d cpak
```

If this works but the application still can't connect, there might be an issue with how the application is reading the credentials.

## Starting the Application

After setting up the database connection:

1. Start the backend:

```bash
cd backend
npm start
```

2. Start the frontend (in a separate terminal):

```bash
cd frontend
npm start
```

The application should now be running and connected to your database.