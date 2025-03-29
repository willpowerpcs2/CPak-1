# CPak Database Export and Import Guide

This guide provides instructions for exporting your local PostgreSQL database and importing it into another environment.

## Exporting the Database

After running the migration script (`run_migration.py`) and successfully importing the Access database into PostgreSQL, you can export the database for sharing or version control using the provided export script.

### Prerequisites

- PostgreSQL installed and running
- Python 3.7+ with the following packages:
  ```
  pip install pandas psycopg2-binary
  ```
- The `pg_dump` command-line tool (comes with PostgreSQL installation)

### Export Process

1. Run the export script with your database credentials:

```bash
python database/export_postgres.py \
  --db-name cpak \
  --db-user <your-db-username> \
  --db-password <your-db-password> \
  --db-host localhost \
  --db-port 5432 \
  --output ./database_export
```

This will create:
- A SQL dump file (`cpak_dump.sql`) in the output directory
- CSV files for each table in the `csv` subdirectory

2. Add the exported files to the repository:

```bash
git add database_export/
git commit -m "Add database export"
git push
```

## Importing the Database

To import the database into another environment:

### Using the SQL Dump

1. Create a new database:

```bash
createdb -U <your-db-username> cpak
```

2. Import the SQL dump:

```bash
psql -U <your-db-username> -d cpak -f database_export/cpak_dump.sql
```

### Using CSV Files (Alternative Method)

If you prefer to import from CSV files:

1. Create the database schema:

```bash
psql -U <your-db-username> -d cpak -f database_export/schema.sql
```

2. Import the CSV files:

```bash
python database/import_from_csv.py \
  --input ./database_export/csv \
  --db-name cpak \
  --db-user <your-db-username> \
  --db-password <your-db-password> \
  --db-host localhost \
  --db-port 5432
```

## Continuing Development

After importing the database, you can continue development:

1. Set up the backend:

```bash
cd backend
cp env.example .env
# Edit .env with your database credentials
npm install
npm start
```

2. Set up the frontend:

```bash
cd frontend
npm install
npm start
```

The application should now be running with your imported database.

## Troubleshooting

### Export Issues

- Ensure PostgreSQL is running
- Verify your database credentials
- Check that you have write permissions to the output directory
- Make sure `pg_dump` is in your PATH

### Import Issues

- Ensure PostgreSQL is running
- Verify your database credentials
- Check for any error messages during import
- Ensure the database exists and is accessible

If you encounter any issues, check the log files:
- `export_postgres.log`: Database export log
- `import_postgres.log`: Database import log