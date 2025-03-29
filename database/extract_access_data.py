#!/usr/bin/env python3
"""
CPak Access Database Data Extraction Script

This script extracts data from the Access database and exports it to CSV files
for import into a new database system.

Usage:
    python extract_access_data.py --source <access_db_path> --output <output_dir>

Requirements:
    - pyodbc
    - pandas
"""

import argparse
import csv
import json
import logging
import os
import sys
from datetime import datetime

try:
    import pyodbc
except ImportError:
    print("Error: pyodbc module not found. Please install it using 'pip install pyodbc'.")
    sys.exit(1)

try:
    import pandas as pd
except ImportError:
    print("Error: pandas module not found. Please install it using 'pip install pandas'.")
    sys.exit(1)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('data_extraction.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Extract data from Access database.')
    parser.add_argument('--source', required=True, help='Path to the Access database file')
    parser.add_argument('--output', default='./extracted_data', help='Directory to output extracted data')
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

def get_query_names(conn):
    """Get all query names from the Access database."""
    cursor = conn.cursor()
    queries = []
    
    try:
        # Query to get queries (views)
        for row in cursor.tables(tableType='VIEW'):
            query_name = row.table_name
            queries.append(query_name)
        
        logger.info(f"Found {len(queries)} queries in the database")
        return queries
    except Exception as e:
        logger.error(f"Error getting queries: {e}")
        return []

def extract_table_to_csv(conn, table_name, output_dir):
    """Extract a table to a CSV file."""
    cursor = conn.cursor()
    
    try:
        # Get column names
        cursor.execute(f"SELECT * FROM [{table_name}] WHERE 1=0")
        columns = [column[0] for column in cursor.description]
        
        # Get data
        cursor.execute(f"SELECT * FROM [{table_name}]")
        rows = cursor.fetchall()
        
        # Create DataFrame
        data = []
        for row in rows:
            # Convert row to list and handle None values
            row_list = ['' if val is None else val for val in row]
            data.append(row_list)
        
        df = pd.DataFrame(data, columns=columns)
        
        # Save to CSV
        csv_path = os.path.join(output_dir, f"{table_name}.csv")
        df.to_csv(csv_path, index=False, quoting=csv.QUOTE_NONNUMERIC)
        
        logger.info(f"Extracted {len(rows)} rows from table '{table_name}' to {csv_path}")
        return csv_path
    except Exception as e:
        logger.error(f"Error extracting table '{table_name}': {e}")
        return None

def extract_query_to_csv(conn, query_name, output_dir):
    """Extract a query to a CSV file."""
    cursor = conn.cursor()
    
    try:
        # Get column names
        cursor.execute(f"SELECT * FROM [{query_name}] WHERE 1=0")
        columns = [column[0] for column in cursor.description]
        
        # Get data
        cursor.execute(f"SELECT * FROM [{query_name}]")
        rows = cursor.fetchall()
        
        # Create DataFrame
        data = []
        for row in rows:
            # Convert row to list and handle None values
            row_list = ['' if val is None else val for val in row]
            data.append(row_list)
        
        df = pd.DataFrame(data, columns=columns)
        
        # Save to CSV
        csv_path = os.path.join(output_dir, f"query_{query_name}.csv")
        df.to_csv(csv_path, index=False, quoting=csv.QUOTE_NONNUMERIC)
        
        logger.info(f"Extracted {len(rows)} rows from query '{query_name}' to {csv_path}")
        return csv_path
    except Exception as e:
        logger.error(f"Error extracting query '{query_name}': {e}")
        return None

def generate_metadata_json(tables, queries, output_dir):
    """Generate a metadata JSON file."""
    metadata = {
        'extraction_date': datetime.now().isoformat(),
        'tables': tables,
        'queries': queries
    }
    
    metadata_path = os.path.join(output_dir, 'metadata.json')
    with open(metadata_path, 'w') as f:
        json.dump(metadata, f, indent=2, default=str)
    
    logger.info(f"Generated metadata file: {metadata_path}")
    return metadata_path

def main():
    """Main function."""
    args = parse_args()
    
    # Start time
    start_time = datetime.now()
    logger.info(f"Data extraction started at {start_time}")
    
    # Connect to Access database
    access_conn = connect_to_access(args.source)
    
    # Create output directory
    output_dir = args.output
    os.makedirs(output_dir, exist_ok=True)
    
    # Get table and query names
    table_names = get_table_names(access_conn)
    query_names = get_query_names(access_conn)
    
    # Extract tables
    tables = []
    for table_name in table_names:
        logger.info(f"Extracting table: {table_name}")
        csv_path = extract_table_to_csv(access_conn, table_name, output_dir)
        if csv_path:
            tables.append({
                'name': table_name,
                'csv_path': csv_path
            })
    
    # Extract queries
    queries = []
    for query_name in query_names:
        logger.info(f"Extracting query: {query_name}")
        csv_path = extract_query_to_csv(access_conn, query_name, output_dir)
        if csv_path:
            queries.append({
                'name': query_name,
                'csv_path': csv_path
            })
    
    # Generate metadata
    generate_metadata_json(tables, queries, output_dir)
    
    # Close Access connection
    access_conn.close()
    
    # End time
    end_time = datetime.now()
    duration = end_time - start_time
    logger.info(f"Data extraction completed at {end_time}")
    logger.info(f"Total duration: {duration}")
    logger.info(f"Extracted {len(tables)} tables and {len(queries)} queries to {output_dir}")
    
    # Print summary
    print(f"\nData Extraction Summary:")
    print(f"- Tables extracted: {len(tables)}")
    print(f"- Queries extracted: {len(queries)}")
    print(f"- Output directory: {output_dir}")
    print(f"- Duration: {duration}")

if __name__ == "__main__":
    main()