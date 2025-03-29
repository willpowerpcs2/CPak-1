#!/usr/bin/env python3
"""
CPak Database Import Script

This script imports data from CSV files into a PostgreSQL database.
It assumes that the CSV files were generated using the extract_access_data.py script.

Usage:
    python import_to_postgres.py --input <input_dir> --db-name <database_name> --db-user <database_user> --db-password <database_password> --db-host <database_host> --db-port <database_port>

Requirements:
    - pandas
    - psycopg2
"""

import argparse
import json
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
        logging.FileHandler('import_postgres.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Import data into PostgreSQL database.')
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
        cursor.close()
        
        logger.info(f"Executed schema file: {schema_file}")
    except Exception as e:
        logger.error(f"Error executing schema file: {e}")
        conn.rollback()
        sys.exit(1)

def get_metadata(input_dir):
    """Get metadata from the metadata.json file."""
    metadata_path = os.path.join(input_dir, 'metadata.json')
    try:
        with open(metadata_path, 'r') as f:
            metadata = json.load(f)
        return metadata
    except Exception as e:
        logger.error(f"Error reading metadata file: {e}")
        return None

def create_table_from_csv(conn, csv_path, table_name):
    """Create a table based on CSV file structure."""
    try:
        # Read CSV file
        df = pd.read_csv(csv_path)
        
        # Generate column definitions
        columns = []
        for col in df.columns:
            # Infer column type
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
            
            # Clean column name (remove spaces, special chars)
            clean_col = col.replace(' ', '_').replace('-', '_').lower()
            
            columns.append(f"{clean_col} {col_type}")
        
        # Create table
        cursor = conn.cursor()
        create_table_sql = f"CREATE TABLE IF NOT EXISTS {table_name} (\n    {',\n    '.join(columns)}\n);"
        cursor.execute(create_table_sql)
        conn.commit()
        cursor.close()
        
        logger.info(f"Created table: {table_name}")
        return True
    except Exception as e:
        logger.error(f"Error creating table {table_name}: {e}")
        conn.rollback()
        return False

def import_csv_to_table(conn, csv_path, table_name):
    """Import CSV data into a table."""
    try:
        # Read CSV file
        df = pd.read_csv(csv_path)
        
        # Clean column names
        df.columns = [col.replace(' ', '_').replace('-', '_').lower() for col in df.columns]
        
        # Prepare data for insertion
        data = df.values.tolist()
        columns = df.columns.tolist()
        
        # Insert data
        cursor = conn.cursor()
        
        # Build the INSERT statement
        insert_stmt = sql.SQL("INSERT INTO {} ({}) VALUES %s").format(
            sql.Identifier(table_name),
            sql.SQL(', ').join(map(sql.Identifier, columns))
        )
        
        # Execute the INSERT statement with all data
        execute_values(cursor, insert_stmt, data)
        
        conn.commit()
        cursor.close()
        
        logger.info(f"Imported {len(data)} rows into table: {table_name}")
        return True
    except Exception as e:
        logger.error(f"Error importing data into table {table_name}: {e}")
        conn.rollback()
        return False

def main():
    """Main function."""
    args = parse_args()
    
    # Start time
    start_time = datetime.now()
    logger.info(f"Import started at {start_time}")
    
    # Connect to PostgreSQL
    conn = connect_to_postgres(
        args.db_name,
        args.db_user,
        args.db_password,
        args.db_host,
        args.db_port
    )
    
    # Execute schema file if provided
    if args.schema_file:
        execute_schema_file(conn, args.schema_file)
    
    # Get metadata
    metadata = get_metadata(args.input)
    if not metadata:
        logger.error("No metadata found. Exiting.")
        sys.exit(1)
    
    # Import tables
    tables_imported = 0
    for table in metadata.get('tables', []):
        table_name = table['name']
        csv_path = table['csv_path']
        
        # Make sure the CSV file exists
        if not os.path.exists(csv_path):
            # Try with input directory as base
            csv_path = os.path.join(args.input, os.path.basename(csv_path))
            if not os.path.exists(csv_path):
                logger.error(f"CSV file not found: {csv_path}")
                continue
        
        logger.info(f"Importing table: {table_name}")
        
        # Create table if schema file was not provided
        if not args.schema_file:
            if not create_table_from_csv(conn, csv_path, table_name):
                continue
        
        # Import data
        if import_csv_to_table(conn, csv_path, table_name):
            tables_imported += 1
    
    # Import queries as views
    queries_imported = 0
    for query in metadata.get('queries', []):
        query_name = query['name']
        csv_path = query['csv_path']
        
        # Make sure the CSV file exists
        if not os.path.exists(csv_path):
            # Try with input directory as base
            csv_path = os.path.join(args.input, os.path.basename(csv_path))
            if not os.path.exists(csv_path):
                logger.error(f"CSV file not found: {csv_path}")
                continue
        
        logger.info(f"Importing query as table: {query_name}")
        
        # Create table
        table_name = f"view_{query_name}"
        if not create_table_from_csv(conn, csv_path, table_name):
            continue
        
        # Import data
        if import_csv_to_table(conn, csv_path, table_name):
            queries_imported += 1
    
    # Close connection
    conn.close()
    
    # End time
    end_time = datetime.now()
    duration = end_time - start_time
    logger.info(f"Import completed at {end_time}")
    logger.info(f"Total duration: {duration}")
    logger.info(f"Imported {tables_imported} tables and {queries_imported} queries")
    
    # Print summary
    print(f"\nImport Summary:")
    print(f"- Tables imported: {tables_imported}")
    print(f"- Queries imported as tables: {queries_imported}")
    print(f"- Database: {args.db_name} on {args.db_host}:{args.db_port}")
    print(f"- Duration: {duration}")

if __name__ == "__main__":
    main()