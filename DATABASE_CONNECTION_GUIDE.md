# CPak Database Connection Guide

This guide will help you fix the PostgreSQL database connection issue you're experiencing with your CPak application.

## The Issue

You're seeing the following error when trying to start the backend:

```
Server running on port 3001
Database connection error: error: password authentication failed for user "postgres"
```

This means that the PostgreSQL server is rejecting the connection because the password in your `.env` file doesn't match the actual password for the PostgreSQL user.

## Quick Fix

1. Run the database connection fix script:
   - On Windows: Double-click `fix_database.bat`
   - On Linux/Mac: Run `chmod +x fix_database.sh` and then `./fix_database.sh`

2. The script will:
   - Test your current database connection
   - Allow you to update your database credentials
   - Save the new credentials to your `.env` file

3. After fixing the connection, you can start the backend:
   ```bash
   cd backend
   npm start
   ```

## Manual Fix

If you prefer to fix the issue manually:

1. Open the `.env` file in the `backend` directory
2. Update the database credentials:
   ```
   DB_USER=postgres
   DB_PASSWORD=your_actual_postgres_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=cpak
   ```
3. Save the file and restart the backend

## PostgreSQL Password Reset

If you don't remember your PostgreSQL password, you can reset it:

### Windows

1. Open Command Prompt as Administrator
2. Stop PostgreSQL service:
   ```
   net stop postgresql-x64-17
   ```
   (Use the correct service name for your PostgreSQL version)
3. Login as the postgres user:
   ```
   runas /user:postgres "cmd.exe"
   ```
4. Connect to PostgreSQL with no password:
   ```
   psql -U postgres -d postgres
   ```
5. Change the password:
   ```
   postgres=# ALTER USER postgres WITH PASSWORD 'new_password';
   postgres=# \q
   ```
6. Start PostgreSQL service:
   ```
   net start postgresql-x64-17
   ```

### Linux/Mac

1. Switch to the postgres user:
   ```
   sudo -i -u postgres
   ```
2. Connect to PostgreSQL:
   ```
   psql
   ```
3. Change the password:
   ```
   postgres=# ALTER USER postgres WITH PASSWORD 'new_password';
   postgres=# \q
   ```

## Next Steps

After fixing the database connection:

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

3. Access the application at http://localhost:3000

## Troubleshooting

If you still have issues:

1. Make sure PostgreSQL is running
2. Verify that the database exists:
   ```
   psql -U postgres -c "SELECT datname FROM pg_database WHERE datname='cpak';"
   ```
3. If the database doesn't exist, create it:
   ```
   psql -U postgres -c "CREATE DATABASE cpak;"
   ```
4. Import your database export:
   ```
   psql -U postgres -d cpak -f database_export/schema.sql
   ```

## Need More Help?

If you continue to have issues, please provide more details about:
1. Your PostgreSQL version
2. The exact error message
3. The steps you've already tried