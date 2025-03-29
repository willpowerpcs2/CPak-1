#!/usr/bin/env python3
"""
CPak Simple Database Export Script

This script exports data from a PostgreSQL database to CSV files only.
It's a simplified version that doesn't rely on pg_dump, which can be problematic
on some systems.

Usage:
    python simple_export.py --db-name <database_name> --db-user <database_user> --db-password <database_password> --db-host <database_host> --db-port <database_port> --output <output_dir>
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
except ImportError:
    print("Error: psycopg2 module not found. Please install it using 'pip install psycopg2-binary'.")
    sys.exit(1)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('simple_export.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Export data from PostgreSQL database to CSV files.')
    parser.add_argument('--output', default='./database_export', help='Directory to output export files')
    parser.add_argument('--db-name', required=True, help='PostgreSQL database name')
    parser.add_argument('--db-user', required=True, help='PostgreSQL database user')
    parser.add_argument('--db-password', required=True, help='PostgreSQL database password')
    parser.add_argument('--db-host', default='localhost', help='PostgreSQL database host')
    parser.add_argument('--db-port', default='5432', help='PostgreSQL database port')
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

def export_schema(conn, output_dir):
    """Export database schema as a series of CREATE TABLE statements."""
    try:
        schema_path = os.path.join(output_dir, "schema.sql")
        
        # Get all tables
        tables = get_tables(conn)
        
        with open(schema_path, 'w') as f:
            # Write header
            f.write("-- CPak Database Schema\n")
            f.write(f"-- Generated on {datetime.now()}\n\n")
            
            # Process each table
            for table_name in tables:
                logger.info(f"Exporting schema for table: {table_name}")
                
                # Get column information
                cursor = conn.cursor()
                cursor.execute("""
                    SELECT 
                        column_name, 
                        data_type, 
                        character_maximum_length,
                        is_nullable,
                        column_default
                    FROM 
                        information_schema.columns 
                    WHERE 
                        table_name = %s
                    ORDER BY 
                        ordinal_position
                """, (table_name,))
                
                columns = cursor.fetchall()
                
                # Write CREATE TABLE statement
                f.write(f"-- Table: {table_name}\n")
                f.write(f"CREATE TABLE IF NOT EXISTS {table_name} (\n")
                
                # Process columns
                column_defs = []
                for col_name, data_type, max_length, is_nullable, default in columns:
                    # Build column definition
                    col_def = f"    \"{col_name}\" {data_type}"
                    
                    # Add length for character types
                    if max_length is not None:
                        col_def += f"({max_length})"
                    
                    # Add nullable constraint
                    if is_nullable == 'NO':
                        col_def += " NOT NULL"
                    
                    # Add default value if exists
                    if default is not None:
                        col_def += f" DEFAULT {default}"
                    
                    column_defs.append(col_def)
                
                # Join column definitions
                f.write(",\n".join(column_defs))
                f.write("\n);\n\n")
        
        logger.info(f"Exported database schema to {schema_path}")
        return True
    except Exception as e:
        logger.error(f"Error exporting schema: {e}")
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
    os.makedirs(csv_output_dir, exist_ok=True)
    
    # Connect to PostgreSQL
    pg_conn = connect_to_postgres(
        args.db_name,
        args.db_user,
        args.db_password,
        args.db_host,
        args.db_port
    )
    
    # Export schema
    export_schema(pg_conn, args.output)
    
    # Get tables
    tables = get_tables(pg_conn)
    
    # Export each table to CSV
    tables_exported = 0
    for table in tables:
        if export_table_to_csv(pg_conn, table, csv_output_dir):
            tables_exported += 1
    
    # Close connection
    pg_conn.close()
    
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
    print(f"- CSV files: {csv_output_dir}")
    print(f"- Schema file: {os.path.join(args.output, 'schema.sql')}")
    print(f"- Tables exported: {tables_exported} of {len(tables)}")
    print(f"- Database: {args.db_name} on {args.db_host}:{args.db_port}")
    print("\nExport completed successfully!")

if __name__ == "__main__":
    main()