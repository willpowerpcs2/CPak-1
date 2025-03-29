# CPak Migration Setup for Windows

This guide provides step-by-step instructions for setting up the CPak migration environment on Windows.

## Prerequisites

Before starting the migration, ensure you have the following installed on your Windows system:

1. **Python 3.7+** - [Download from python.org](https://www.python.org/downloads/)
2. **PostgreSQL** - [Download from postgresql.org](https://www.postgresql.org/download/windows/)
3. **Microsoft Access Database Engine** - Required for ODBC connectivity to Access databases
   - [Download from Microsoft](https://www.microsoft.com/en-us/download/details.aspx?id=54920)
   - Choose the version (32-bit or 64-bit) that matches your Python installation
4. **Node.js and npm** (optional, for frontend/backend development) - [Download from nodejs.org](https://nodejs.org/en/download/)

## Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/willpowerpcs/CPak.git
cd CPak
```

### 2. Run the Setup Script

The setup script will create the necessary directory structure and install required dependencies:

```
python setup_migration_windows.py
```

If your Python or npm executables are in non-standard locations, you can specify them:

```
python setup_migration_windows.py --python-path C:\path\to\python.exe --node-path C:\path\to\npm.cmd
```

### 3. Configure Database Connection

Edit the `backend/.env` file to set your PostgreSQL database credentials:

```
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cpak
```

### 4. Run the Migration Process

#### Option 1: Run the Complete Migration Process

To run the complete migration process in one go:

```
python run_migration.py --source "consumerpakFixed - BackupCopy-2-24-25.accdb" --output ./migration_output --db-name cpak --db-user your_username --db-password your_password
```

#### Option 2: Run Each Step Individually

If you prefer to run each step individually:

1. **Analyze the Access Database**:
   ```
   python database/analyze_access_db.py --source "consumerpakFixed - BackupCopy-2-24-25.accdb" --output ./database/analysis_output
   ```

2. **Extract Data from Access**:
   ```
   python database/extract_access_data.py --source "consumerpakFixed - BackupCopy-2-24-25.accdb" --output ./database/extracted_data
   ```

3. **Import Data to PostgreSQL**:
   ```
   python database/import_to_postgres.py --input ./database/extracted_data --db-name cpak --db-user your_username --db-password your_password --schema-file ./database/analysis_output/sql/schema.sql
   ```

## Troubleshooting

### ODBC Connection Issues

If you encounter issues connecting to the Access database:

1. Verify that the Microsoft Access Database Engine is installed
2. Ensure you've installed the correct version (32-bit or 64-bit) that matches your Python installation
3. Check that the Access database file path is correct and accessible
4. Try using the full path to the Access database file

### Python Module Import Errors

If you encounter module import errors:

```
pip install pyodbc pandas tabulate psycopg2-binary
```

### PostgreSQL Connection Issues

If you encounter issues connecting to PostgreSQL:

1. Verify that PostgreSQL is running
2. Check that the database exists (or the user has permissions to create it)
3. Verify that the username and password are correct
4. Ensure the host and port are correct

## Next Steps

After completing the database migration:

1. **Set up the Backend API**:
   ```
   cd backend
   npm install
   npm start
   ```

2. **Set up the Frontend Application**:
   ```
   cd frontend
   npm install
   npm start
   ```

3. **Test the Web Application**:
   - Verify that all data has been migrated correctly
   - Test all functionality to ensure it works as expected
   - Compare with the original Access application to ensure feature parity