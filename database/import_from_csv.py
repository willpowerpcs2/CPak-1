#!/usr/bin/env python3
"""
CPak Database Import from CSV Script

This script imports data from CSV files into a PostgreSQL database.
It is designed to work with CSV files exported by the export_postgres.py script.

Usage:
    python import_from_csv.py --input <input_dir> --db-name <database_name> --db-user <database_user> --db-password <database_password> --db-host <database_host> --db-port <database_port>

Requirements:
    - pandas
    - psycopg2
"""

import argparse
import logging
import os
import sys
from datetime import datetime

try:
    import pandas as pd
except ImportError:
    print("Error: pandas module not found. Please install it using 'pip install pandas'.")
    sys.exit(1)

try:
    import psycopg2
    from psycopg2 import sql
    from psycopg2.extras import execute_values
except ImportError:
    print("Error: psycopg2 module not found. Please install it using 'pip install psycopg2-binary'.")
    sys.exit(1)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('import_from_csv.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Import data from CSV files into PostgreSQL database.')
    parser.add_argument('--input', required=True, help='Directory containing CSV files to import')
    parser.add_argument('--db-name', required=True, help='PostgreSQL database name')
    parser.add_argument('--db-user', required=True, help='PostgreSQL database user')
    parser.add_argument('--db-password', required=True, help='PostgreSQL database password')
    parser.add_argument('--db-host', default='localhost', help='PostgreSQL database host')
    parser.add_argument('--db-port', default='5432', help='PostgreSQL database port')
    parser.add_argument('--schema-file', help='SQL schema file to execute before importing data')
    return parser.parse_args()

def connect_to_postgres(db_name, db_user, db_password, db_host, db_port):
    """Connect to PostgreSQL database."""
    try:
        conn = psycopg2.connect(
            dbname=db_name,
            user=db_user,
            password=db_password,
            host=db_host,
            port=db_port
        )
        logger.info(f"Connected to PostgreSQL database: {db_name} on {db_host}:{db_port}")
        return conn
    except psycopg2.Error as e:
        logger.error(f"Error connecting to PostgreSQL database: {e}")
        sys.exit(1)

def execute_schema_file(conn, schema_file):
    """Execute SQL schema file."""
    try:
        with open(schema_file, 'r') as f:
            schema_sql = f.read()
        
        cursor = conn.cursor()
        cursor.execute(schema_sql)
        conn.commit()
        logger.info(f"Executed schema file: {schema_file}")
        return True
    except Exception as e:
        logger.error(f"Error executing schema file: {e}")
        conn.rollback()
        return False

def get_csv_files(input_dir):
    """Get all CSV files in the input directory."""
    csv_files = []
    
    for file in os.listdir(input_dir):
        if file.endswith('.csv'):
            csv_files.append(os.path.join(input_dir, file))
    
    return csv_files

def get_table_name_from_csv(csv_file):
    """Get table name from CSV file name."""
    base_name = os.path.basename(csv_file)
    return base_name[:-4]  # Remove .csv extension

def create_table_from_csv(conn, csv_file):
    """Create a table based on CSV file structure."""
    table_name = get_table_name_from_csv(csv_file)
    
    try:
        # Read CSV file
        df = pd.read_csv(csv_file)
        
        # Generate column definitions
        columns = []
        for col in df.columns:
            # Determine column type based on data
            if df[col].dtype == 'int64':
                col_type = 'INTEGER'
            elif df[col].dtype == 'float64':
                col_type = 'FLOAT'
            elif df[col].dtype == 'bool':
                col_type = 'BOOLEAN'
            elif df[col].dtype == 'datetime64[ns]':
                col_type = 'TIMESTAMP'
            else:
                col_type = 'TEXT'
            
            columns.append(f'"{col}" {col_type}')
        
        # Create table
        create_table_sql = f'CREATE TABLE IF NOT EXISTS "{table_name}" ({", ".join(columns)})'
        
        cursor = conn.cursor()
        cursor.execute(create_table_sql)
        conn.commit()
        
        logger.info(f"Created table: {table_name}")
        return True
    except Exception as e:
        logger.error(f"Error creating table from CSV file {csv_file}: {e}")
        conn.rollback()
        return False

def import_csv_to_table(conn, csv_file):
    """Import CSV data into a table."""
    table_name = get_table_name_from_csv(csv_file)
    
    try:
        # Read CSV file
        df = pd.read_csv(csv_file)
        
        # Prepare data for insertion
        columns = df.columns.tolist()
        values = [tuple(row) for row in df.values]
        
        # Insert data
        cursor = conn.cursor()
        
        # Truncate table first
        cursor.execute(f'TRUNCATE TABLE "{table_name}" CASCADE')
        
        # Insert data using execute_values for better performance
        if values:
            columns_str = ', '.join(f'"{col}"' for col in columns)
            insert_sql = f'INSERT INTO "{table_name}" ({columns_str}) VALUES %s'
            execute_values(cursor, insert_sql, values)
        
        conn.commit()
        
        logger.info(f"Imported {len(values)} rows into table: {table_name}")
        return True
    except Exception as e:
        logger.error(f"Error importing data from CSV file {csv_file}: {e}")
        conn.rollback()
        return False

def main():
    """Main function."""
    args = parse_args()
    
    # Start time
    start_time = datetime.now()
    logger.info(f"CSV import started at {start_time}")
    
    # Connect to PostgreSQL
    pg_conn = connect_to_postgres(
        args.db_name,
        args.db_user,
        args.db_password,
        args.db_host,
        args.db_port
    )
    
    # Execute schema file if provided
    if args.schema_file:
        if not execute_schema_file(pg_conn, args.schema_file):
            logger.error("Failed to execute schema file. Aborting import.")
            pg_conn.close()
            sys.exit(1)
    
    # Get CSV files
    csv_files = get_csv_files(args.input)
    
    if not csv_files:
        logger.error(f"No CSV files found in {args.input}")
        pg_conn.close()
        sys.exit(1)
    
    # Create tables and import data
    tables_created = 0
    tables_imported = 0
    
    for csv_file in csv_files:
        logger.info(f"Processing file: {csv_file}")
        
        # Create table
        if create_table_from_csv(pg_conn, csv_file):
            tables_created += 1
            
            # Import data
            if import_csv_to_table(pg_conn, csv_file):
                tables_imported += 1
    
    # Close connection
    pg_conn.close()
    
    # End time
    end_time = datetime.now()
    duration = end_time - start_time
    logger.info(f"CSV import completed at {end_time}")
    logger.info(f"Total duration: {duration}")
    logger.info(f"Created {tables_created} tables and imported data into {tables_imported} tables")
    
    # Print summary
    print(f"\nCSV Import Summary:")
    print(f"- Tables created: {tables_created}")
    print(f"- Tables imported: {tables_imported}")
    print(f"- Database: {args.db_name} on {args.db_host}:{args.db_port}")
    print(f"- Duration: {duration}")
    print("\nImport completed successfully!")

if __name__ == "__main__":
    main()