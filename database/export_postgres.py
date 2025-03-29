#!/usr/bin/env python3
"""
CPak Database Export Script

This script exports data from a PostgreSQL database to SQL dump file and CSV files.
It can be used to create a backup of the database for sharing or version control.

Usage:
    python export_postgres.py --db-name <database_name> --db-user <database_user> --db-password <database_password> --db-host <database_host> --db-port <database_port> --output <output_dir>

Requirements:
    - pandas
    - psycopg2
    - pg_dump (PostgreSQL command-line tool)
"""

import argparse
import logging
import os
import subprocess
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
except ImportError:
    print("Error: psycopg2 module not found. Please install it using 'pip install psycopg2-binary'.")
    sys.exit(1)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('export_postgres.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Export data from PostgreSQL database.')
    parser.add_argument('--output', default='./database_export', help='Directory to output export files')
    parser.add_argument('--db-name', required=True, help='PostgreSQL database name')
    parser.add_argument('--db-user', required=True, help='PostgreSQL database user')
    parser.add_argument('--db-password', required=True, help='PostgreSQL database password')
    parser.add_argument('--db-host', default='localhost', help='PostgreSQL database host')
    parser.add_argument('--db-port', default='5432', help='PostgreSQL database port')
    parser.add_argument('--format', default='both', choices=['sql', 'csv', 'both'], 
                        help='Export format: sql (pg_dump), csv (table data), or both')
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

def get_tables(conn):
    """Get all tables in the database."""
    try:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name
        """)
        tables = [row[0] for row in cursor.fetchall()]
        logger.info(f"Found {len(tables)} tables in the database")
        return tables
    except psycopg2.Error as e:
        logger.error(f"Error getting tables: {e}")
        return []

def export_table_to_csv(conn, table_name, output_dir):
    """Export a table to CSV file."""
    try:
        csv_path = os.path.join(output_dir, f"{table_name}.csv")
        
        # Query the table
        query = sql.SQL("SELECT * FROM {}").format(sql.Identifier(table_name))
        df = pd.read_sql_query(query, conn)
        
        # Write to CSV
        df.to_csv(csv_path, index=False)
        
        logger.info(f"Exported table {table_name} to {csv_path} ({len(df)} rows)")
        return True
    except Exception as e:
        logger.error(f"Error exporting table {table_name} to CSV: {e}")
        return False

def export_database_to_sql(db_name, db_user, db_password, db_host, db_port, output_dir):
    """Export the entire database to a SQL dump file using pg_dump."""
    try:
        # Create the output file path
        sql_path = os.path.join(output_dir, f"{db_name}_dump.sql")
        
        # Set environment variables for password
        env = os.environ.copy()
        env["PGPASSWORD"] = db_password
        
        # Run pg_dump command
        cmd = [
            "pg_dump",
            "-h", db_host,
            "-p", db_port,
            "-U", db_user,
            "-d", db_name,
            "-f", sql_path,
            "--no-owner",
            "--no-acl"
        ]
        
        logger.info(f"Running pg_dump to export database to {sql_path}")
        result = subprocess.run(cmd, env=env, capture_output=True, text=True)
        
        if result.returncode == 0:
            logger.info(f"Successfully exported database to {sql_path}")
            return True
        else:
            logger.error(f"Error exporting database to SQL: {result.stderr}")
            return False
    except Exception as e:
        logger.error(f"Error running pg_dump: {e}")
        return False

def main():
    """Main function."""
    args = parse_args()
    
    # Start time
    start_time = datetime.now()
    logger.info(f"Database export started at {start_time}")
    
    # Create output directory
    os.makedirs(args.output, exist_ok=True)
    csv_output_dir = os.path.join(args.output, 'csv')
    if args.format in ['csv', 'both']:
        os.makedirs(csv_output_dir, exist_ok=True)
    
    # Export SQL dump if requested
    if args.format in ['sql', 'both']:
        export_database_to_sql(
            args.db_name,
            args.db_user,
            args.db_password,
            args.db_host,
            args.db_port,
            args.output
        )
    
    # Export CSV files if requested
    if args.format in ['csv', 'both']:
        # Connect to PostgreSQL
        pg_conn = connect_to_postgres(
            args.db_name,
            args.db_user,
            args.db_password,
            args.db_host,
            args.db_port
        )
        
        # Get tables
        tables = get_tables(pg_conn)
        
        # Export each table to CSV
        tables_exported = 0
        for table in tables:
            if export_table_to_csv(pg_conn, table, csv_output_dir):
                tables_exported += 1
        
        # Close connection
        pg_conn.close()
        
        logger.info(f"Exported {tables_exported} tables to CSV files")
    
    # End time
    end_time = datetime.now()
    duration = end_time - start_time
    logger.info(f"Database export completed at {end_time}")
    logger.info(f"Total duration: {duration}")
    
    # Print summary
    print(f"\nDatabase Export Summary:")
    print(f"- Started: {start_time}")
    print(f"- Completed: {end_time}")
    print(f"- Duration: {duration}")
    print(f"- Output directory: {args.output}")
    print(f"- Database: {args.db_name} on {args.db_host}:{args.db_port}")
    if args.format in ['csv', 'both']:
        print(f"- CSV files: {csv_output_dir}")
    if args.format in ['sql', 'both']:
        print(f"- SQL dump: {os.path.join(args.output, f'{args.db_name}_dump.sql')}")
    print("\nExport completed successfully!")

if __name__ == "__main__":
    main()