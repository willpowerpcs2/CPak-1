#!/usr/bin/env python3
"""
CPak Access Database Analysis Script

This script analyzes the structure of an Access database and generates
documentation about its tables, queries, forms, and reports.

Usage:
    python analyze_access_db.py --source <access_db_path> --output <output_dir>

Requirements:
    - pyodbc
    - pandas
    - tabulate
"""

import argparse
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

try:
    from tabulate import tabulate
except ImportError:
    print("Error: tabulate module not found. Please install it using 'pip install tabulate'.")
    sys.exit(1)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('access_analysis.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def parse_args():
    parser = argparse.ArgumentParser(description='Analyze Access database structure.')
    parser.add_argument('--source', required=True, help='Path to the Access database file')
    parser.add_argument('--output', default='./analysis_output', help='Directory to output analysis files')
    return parser.parse_args()

def connect_to_access(db_path):
    try:
        conn_str = f'DRIVER={{Microsoft Access Driver (*.mdb, *.accdb)}};DBQ={db_path};'
        conn = pyodbc.connect(conn_str)
        logger.info(f"Connected to Access database: {db_path}")
        return conn
    except pyodbc.Error as e:
        logger.error(f"Error connecting to Access database: {e}")
        sys.exit(1)

def get_table_names(conn):
    cursor = conn.cursor()
    tables = [row.table_name for row in cursor.tables(tableType='TABLE') if not row.table_name.startswith('MSys')]
    logger.info(f"Found {len(tables)} tables in the database")
    return tables

def analyze_table(conn, table_name):
    cursor = conn.cursor()
    try:
        cursor.execute(f"SELECT * FROM [{table_name}] WHERE 1=0")
        columns = [{'name': col[0], 'type': col[1].__name__, 'size': col[3], 'nullable': col[6]} for col in cursor.description]
        cursor.execute(f"SELECT COUNT(*) FROM [{table_name}]")
        row_count = cursor.fetchone()[0]
        return {'name': table_name, 'columns': columns, 'row_count': row_count}
    except Exception as e:
        logger.error(f"Error analyzing table '{table_name}': {e}")
        return {}

def generate_json_report(tables_info, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    report_path = os.path.join(output_dir, 'tables.json')
    with open(report_path, 'w') as f:
        json.dump(tables_info, f, indent=2)
    logger.info(f"Generated JSON report: {report_path}")

def main():
    args = parse_args()
    start_time = datetime.now()
    logger.info(f"Analysis started at {start_time}")
    conn = connect_to_access(args.source)
    tables = get_table_names(conn)
    tables_info = [analyze_table(conn, table) for table in tables]
    conn.close()
    generate_json_report(tables_info, args.output)
    end_time = datetime.now()
    logger.info(f"Analysis completed at {end_time}")
    logger.info(f"Total duration: {end_time - start_time}")
    print(f"Analysis completed. Reports saved in {args.output}")

if __name__ == "__main__":
    main()