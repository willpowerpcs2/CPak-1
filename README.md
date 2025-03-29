# CPak Migration Project

This project aims to migrate the CPak Access database (`consumerpakFixed - BackupCopy-2-24-25.accdb`) to a web application.

## Getting Started

### Prerequisites

- Windows 11 with WSL (Windows Subsystem for Linux)
- Python 3.7+
- Node.js and npm
- PostgreSQL database
- Microsoft Access Database Engine (for ODBC connectivity)

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/willpowerpcs/CPak.git
   cd CPak
   ```

2. Make the setup script executable and run it:
   ```bash
   chmod +x setup_migration_env.sh
   ./setup_migration_env.sh
   ```

3. Edit the database credentials in `backend/.env`

4. Run the migration scripts:
   ```bash
   # Analyze the Access database structure
   python database/analyze_access_db.py --source "consumerpakFixed - BackupCopy-2-24-25.accdb" --output ./database/analysis_output

   # Extract data from the Access database
   python database/extract_access_data.py --source "consumerpakFixed - BackupCopy-2-24-25.accdb" --output ./database/extracted_data

   # Import the data into PostgreSQL
   python database/import_to_postgres.py --input ./database/extracted_data --db-name cpak --db-user <username> --db-password <password> --schema-file ./database/analysis_output/sql/schema.sql
   ```

Alternatively, you can use the all-in-one migration script:
```bash
python run_migration.py --source "consumerpakFixed - BackupCopy-2-24-25.accdb" --output ./migration_output --db-name cpak --db-user <username> --db-password <password>
```

## Project Structure

- `database/` - Database schema and migration scripts
- `backend/` - Backend API server
- `frontend/` - Frontend web application
- `docs/` - Documentation

## Migration Plan

1. **Analysis Phase**
   - Analyze the Access database structure
   - Document tables, queries, forms, and reports
   - Identify business logic and workflows

2. **Design Phase**
   - Design the database schema for the web application
   - Design the API endpoints
   - Design the UI/UX for the web application

3. **Implementation Phase**
   - Set up the database
   - Implement the backend API
   - Implement the frontend web application
   - Migrate data from Access to the new database

4. **Testing Phase**
   - Test the web application
   - Validate data migration
   - User acceptance testing

5. **Deployment Phase**
   - Deploy the web application
   - Train users
   - Monitor and support

## Technology Stack

- **Database**: PostgreSQL
- **Backend**: Node.js with Express
- **Frontend**: React with Material-UI
- **Deployment**: Docker, Cloud (AWS/Azure/GCP)