#!/usr/bin/env python3
"""
CPak Access Database Migration Script

This script migrates data from the Access database to the new database system.
It uses pyodbc to connect to the Access database and a database-specific library
(e.g., psycopg2 for PostgreSQL) to connect to the target database.

Usage:
    python migration.py --source <access_db_path> --target <connection_string>

Requirements:
    - pyodbc
    - Database-specific library (e.g., psycopg2 for PostgreSQL)
"""

import argparse
import csv
import logging
import os
import sys
from datetime import datetime

try:
    import pyodbc
except ImportError:
    print("Error: pyodbc module not found. Please install it using 'pip install pyodbc'.")
    sys.exit(1)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('migration.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Migrate data from Access to a new database system.')
    parser.add_argument('--source', required=True, help='Path to the Access database file')
    parser.add_argument('--target', required=True, help='Connection string for the target database')
    parser.add_argument('--export-dir', default='./export', help='Directory to export CSV files')
    return parser.parse_args()

def connect_to_access(db_path):
    """Connect to the Access database."""
    try:
        # Connection string for Access
        conn_str = f'DRIVER={{Microsoft Access Driver (*.mdb, *.accdb)}};DBQ={db_path};'
        conn = pyodbc.connect(conn_str)
        logger.info(f"Connected to Access database: {db_path}")
        return conn
    except pyodbc.Error as e:
        logger.error(f"Error connecting to Access database: {e}")
        sys.exit(1)

def get_table_names(conn):
    """Get all table names from the Access database."""
    cursor = conn.cursor()
    tables = []
    
    # Query to get user tables (excluding system tables)
    for row in cursor.tables(tableType='TABLE'):
        table_name = row.table_name
        if not table_name.startswith('MSys'):
            tables.append(table_name)
    
    logger.info(f"Found {len(tables)} tables in the database")
    return tables

def export_table_to_csv(conn, table_name, export_dir):
    """Export a table to a CSV file."""
    cursor = conn.cursor()
    
    # Create export directory if it doesn't exist
    os.makedirs(export_dir, exist_ok=True)
    
    # File path for the CSV file
    file_path = os.path.join(export_dir, f"{table_name}.csv")
    
    try:
        # Get column names
        cursor.execute(f"SELECT * FROM [{table_name}] WHERE 1=0")
        columns = [column[0] for column in cursor.description]
        
        # Query all rows
        cursor.execute(f"SELECT * FROM [{table_name}]")
        rows = cursor.fetchall()
        
        # Write to CSV
        with open(file_path, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(columns)
            for row in rows:
                # Convert row to list and handle None values
                row_list = ['' if val is None else val for val in row]
                writer.writerow(row_list)
        
        logger.info(f"Exported {len(rows)} rows from table '{table_name}' to {file_path}")
        return file_path
    except Exception as e:
        logger.error(f"Error exporting table '{table_name}': {e}")
        return None

def export_all_tables(conn, export_dir):
    """Export all tables to CSV files."""
    tables = get_table_names(conn)
    exported_files = {}
    
    for table_name in tables:
        file_path = export_table_to_csv(conn, table_name, export_dir)
        if file_path:
            exported_files[table_name] = file_path
    
    return exported_files

def main():
    """Main function."""
    args = parse_args()
    
    # Start time
    start_time = datetime.now()
    logger.info(f"Migration started at {start_time}")
    
    # Connect to Access database
    access_conn = connect_to_access(args.source)
    
    # Export all tables to CSV
    export_dir = args.export_dir
    exported_files = export_all_tables(access_conn, export_dir)
    
    # Close Access connection
    access_conn.close()
    
    # End time
    end_time = datetime.now()
    duration = end_time - start_time
    logger.info(f"Migration completed at {end_time}")
    logger.info(f"Total duration: {duration}")
    logger.info(f"Exported {len(exported_files)} tables to {export_dir}")
    
    # Next steps would be to import the CSV files into the target database
    # This part would depend on the specific target database system
    logger.info("Next step: Import the CSV files into the target database")

if __name__ == "__main__":
    main()