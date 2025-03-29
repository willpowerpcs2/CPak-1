# CPak Migration Guide

This guide provides step-by-step instructions for migrating the CPak Access database to a web application.

## Prerequisites

Before starting the migration, ensure you have the following:

1. **Python 3.7+** installed on your system
2. **PostgreSQL** database server installed and running
3. **Microsoft Access Database Engine** installed (for ODBC connectivity)
4. The following Python packages installed:
   ```
   pip install pyodbc pandas tabulate psycopg2-binary
   ```

## Migration Process

The migration process consists of three main steps:

1. **Database Analysis**: Analyze the Access database structure and generate documentation
2. **Data Extraction**: Extract data from the Access database to CSV files
3. **Data Import**: Import the extracted data into a PostgreSQL database

These steps can be executed individually or all at once using the provided scripts.

### Option 1: Run the Complete Migration Process

To run the complete migration process in one go, use the `run_migration.py` script:

```bash
python run_migration.py \
  --source "consumerpakFixed - BackupCopy-2-24-25.accdb" \
  --output ./migration_output \
  --db-name cpak \
  --db-user <your-db-username> \
  --db-password <your-db-password> \
  --db-host localhost \
  --db-port 5432
```

This script will:
1. Analyze the Access database structure
2. Extract data from the Access database
3. Import the data into PostgreSQL

### Option 2: Run Each Step Individually

If you prefer to run each step individually, you can use the following scripts:

#### Step 1: Analyze the Access Database

```bash
python database/analyze_access_db.py \
  --source "consumerpakFixed - BackupCopy-2-24-25.accdb" \
  --output ./analysis_output
```

This will generate documentation about the database structure in the `./analysis_output` directory, including:
- Markdown reports in `./analysis_output/markdown/`
- JSON reports in `./analysis_output/json/`
- SQL schema in `./analysis_output/sql/`

#### Step 2: Extract Data from Access

```bash
python database/extract_access_data.py \
  --source "consumerpakFixed - BackupCopy-2-24-25.accdb" \
  --output ./extracted_data
```

This will extract all tables and queries from the Access database to CSV files in the `./extracted_data` directory.

#### Step 3: Import Data to PostgreSQL

```bash
python database/import_to_postgres.py \
  --input ./extracted_data \
  --db-name cpak \
  --db-user <your-db-username> \
  --db-password <your-db-password> \
  --db-host localhost \
  --db-port 5432 \
  --schema-file ./analysis_output/sql/schema.sql
```

This will create the database schema and import the data from the CSV files into PostgreSQL.

## Troubleshooting

### ODBC Connection Issues

If you encounter issues connecting to the Access database, ensure:
- Microsoft Access Database Engine is installed
- You're using the correct ODBC driver name in the connection string
- The Access database file path is correct and accessible

### PostgreSQL Connection Issues

If you encounter issues connecting to PostgreSQL, ensure:
- PostgreSQL server is running
- The database exists (or the user has permissions to create it)
- The username and password are correct
- The host and port are correct

### Data Type Conversion Issues

If you encounter data type conversion issues during import:
- Check the generated schema file for appropriate data type mappings
- Modify the schema file if necessary to match your data
- Check the CSV files for any data formatting issues

## Next Steps

After completing the database migration, you can:

1. **Set up the Backend API**:
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Set up the Frontend Application**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Test the Web Application**:
   - Verify that all data has been migrated correctly
   - Test all functionality to ensure it works as expected
   - Compare with the original Access application to ensure feature parity

## Support

If you encounter any issues during the migration process, please check the log files:
- `migration_execution.log`: Main migration log
- `access_analysis.log`: Database analysis log
- `data_extraction.log`: Data extraction log
- `import_postgres.log`: Data import log