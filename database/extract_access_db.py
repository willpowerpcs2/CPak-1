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
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Analyze Access database structure.')
    parser.add_argument('--source', required=True, help='Path to the Access database file')
    parser.add_argument('--output', default='./analysis_output', help='Directory to output analysis files')
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

def get_table_columns(conn, table_name):
    """Get column information for a table."""
    cursor = conn.cursor()
    columns = []
    
    try:
        # Get column information
        cursor.execute(f"SELECT * FROM [{table_name}] WHERE 1=0")
        for column in cursor.description:
            col_name = column[0]
            col_type = column[1].__name__
            col_size = column[3]
            col_nullable = column[6]
            
            columns.append({
                'name': col_name,
                'type': col_type,
                'size': col_size,
                'nullable': col_nullable
            })
        
        return columns
    except Exception as e:
        logger.error(f"Error getting columns for table '{table_name}': {e}")
        return []

def get_primary_keys(conn, table_name):
    """Get primary key information for a table."""
    cursor = conn.cursor()
    primary_keys = []
    
    try:
        # This is a simplified approach - Access doesn't expose primary key info directly via pyodbc
        # We'll look for indexes that are primary
        for row in cursor.statistics(table_name):
            if row.type == 1:  # Primary key
                primary_keys.append(row.column_name)
        
        return primary_keys
    except Exception as e:
        logger.error(f"Error getting primary keys for table '{table_name}': {e}")
        return []

def get_foreign_keys(conn, table_name):
    """Get foreign key information for a table."""
    # Note: This is a placeholder. Access doesn't expose foreign key info directly via pyodbc
    # A more complex approach would be needed to extract this information
    return []

def get_indexes(conn, table_name):
    """Get index information for a table."""
    cursor = conn.cursor()
    indexes = []
    
    try:
        # Get index information
        for row in cursor.statistics(table_name):
            if row.index_name and not row.index_name.startswith('MSys'):
                index_name = row.index_name
                column_name = row.column_name
                non_unique = row.non_unique
                
                # Check if this index is already in our list
                index_exists = False
                for idx in indexes:
                    if idx['name'] == index_name:
                        idx['columns'].append(column_name)
                        index_exists = True
                        break
                
                if not index_exists:
                    indexes.append({
                        'name': index_name,
                        'columns': [column_name],
                        'unique': not non_unique
                    })
        
        return indexes
    except Exception as e:
        logger.error(f"Error getting indexes for table '{table_name}': {e}")
        return []

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

def get_query_sql(conn, query_name):
    """Get the SQL for a query."""
    # Note: This is a placeholder. Access doesn't expose query SQL directly via pyodbc
    # A more complex approach would be needed to extract this information
    return "-- SQL not available via pyodbc"

def get_form_names(conn):
    """Get all form names from the Access database."""
    # Note: This is a placeholder. Access doesn't expose forms directly via pyodbc
    # A more complex approach would be needed to extract this information
    return []

def get_report_names(conn):
    """Get all report names from the Access database."""
    # Note: This is a placeholder. Access doesn't expose reports directly via pyodbc
    # A more complex approach would be needed to extract this information
    return []

def get_table_row_count(conn, table_name):
    """Get the number of rows in a table."""
    cursor = conn.cursor()
    
    try:
        cursor.execute(f"SELECT COUNT(*) FROM [{table_name}]")
        count = cursor.fetchone()[0]
        return count
    except Exception as e:
        logger.error(f"Error getting row count for table '{table_name}': {e}")
        return 0

def get_table_sample_data(conn, table_name, limit=10):
    """Get sample data from a table."""
    cursor = conn.cursor()
    
    try:
        cursor.execute(f"SELECT TOP {limit} * FROM [{table_name}]")
        columns = [column[0] for column in cursor.description]
        rows = cursor.fetchall()
        
        # Convert to list of dicts
        sample_data = []
        for row in rows:
            row_dict = {}
            for i, value in enumerate(row):
                row_dict[columns[i]] = value
            sample_data.append(row_dict)
        
        return sample_data
    except Exception as e:
        logger.error(f"Error getting sample data for table '{table_name}': {e}")
        return []

def analyze_table(conn, table_name):
    """Analyze a table and return its structure."""
    columns = get_table_columns(conn, table_name)
    primary_keys = get_primary_keys(conn, table_name)
    foreign_keys = get_foreign_keys(conn, table_name)
    indexes = get_indexes(conn, table_name)
    row_count = get_table_row_count(conn, table_name)
    sample_data = get_table_sample_data(conn, table_name)
    
    return {
        'name': table_name,
        'columns': columns,
        'primary_keys': primary_keys,
        'foreign_keys': foreign_keys,
        'indexes': indexes,
        'row_count': row_count,
        'sample_data': sample_data
    }

def analyze_query(conn, query_name):
    """Analyze a query and return its structure."""
    sql = get_query_sql(conn, query_name)
    
    return {
        'name': query_name,
        'sql': sql
    }

def generate_markdown_report(tables_info, queries_info, output_dir):
    """Generate a markdown report of the database structure."""
    os.makedirs(output_dir, exist_ok=True)
    
    # Generate tables markdown
    tables_md = os.path.join(output_dir, 'tables.md')
    with open(tables_md, 'w') as f:
        f.write("# Database Tables\n\n")
        
        for table in tables_info:
            f.write(f"## {table['name']}\n\n")
            f.write(f"Row count: {table['row_count']}\n\n")
            
            # Write columns
            f.write("### Columns\n\n")
            columns_data = []
            for col in table['columns']:
                columns_data.append([
                    col['name'],
                    col['type'],
                    col['size'],
                    'Yes' if col['nullable'] else 'No'
                ])
            
            f.write(tabulate(columns_data, 
                            headers=['Name', 'Type', 'Size', 'Nullable'],
                            tablefmt='pipe'))
            f.write("\n\n")
            
            # Write primary keys
            if table['primary_keys']:
                f.write("### Primary Keys\n\n")
                for pk in table['primary_keys']:
                    f.write(f"- {pk}\n")
                f.write("\n")
            
            # Write foreign keys
            if table['foreign_keys']:
                f.write("### Foreign Keys\n\n")
                for fk in table['foreign_keys']:
                    f.write(f"- {fk}\n")
                f.write("\n")
            
            # Write indexes
            if table['indexes']:
                f.write("### Indexes\n\n")
                for idx in table['indexes']:
                    columns_str = ', '.join(idx['columns'])
                    unique_str = 'Unique' if idx['unique'] else 'Non-unique'
                    f.write(f"- {idx['name']}: {unique_str} ({columns_str})\n")
                f.write("\n")
            
            # Write sample data
            if table['sample_data']:
                f.write("### Sample Data\n\n")
                df = pd.DataFrame(table['sample_data'])
                f.write(tabulate(df, headers='keys', tablefmt='pipe'))
                f.write("\n\n")
    
    # Generate queries markdown
    queries_md = os.path.join(output_dir, 'queries.md')
    with open(queries_md, 'w') as f:
        f.write("# Database Queries\n\n")
        
        for query in queries_info:
            f.write(f"## {query['name']}\n\n")
            f.write("```sql\n")
            f.write(query['sql'])
            f.write("\n```\n\n")
    
    # Generate summary markdown
    summary_md = os.path.join(output_dir, 'summary.md')
    with open(summary_md, 'w') as f:
        f.write("# Database Summary\n\n")
        
        f.write(f"## Tables ({len(tables_info)})\n\n")
        for table in tables_info:
            f.write(f"- {table['name']} ({table['row_count']} rows, {len(table['columns'])} columns)\n")
        f.write("\n")
        
        f.write(f"## Queries ({len(queries_info)})\n\n")
        for query in queries_info:
            f.write(f"- {query['name']}\n")
        f.write("\n")
    
    logger.info(f"Generated markdown reports in {output_dir}")
    return [tables_md, queries_md, summary_md]

def generate_json_report(tables_info, queries_info, output_dir):
    """Generate a JSON report of the database structure."""
    os.makedirs(output_dir, exist_ok=True)
    
    # Generate tables JSON
    tables_json = os.path.join(output_dir, 'tables.json')
    with open(tables_json, 'w') as f:
        json.dump(tables_info, f, indent=2, default=str)
    
    # Generate queries JSON
    queries_json = os.path.join(output_dir, 'queries.json')
    with open(queries_json, 'w') as f:
        json.dump(queries_info, f, indent=2, default=str)
    
    # Generate summary JSON
    summary_json = os.path.join(output_dir, 'summary.json')
    with open(summary_json, 'w') as f:
        summary = {
            'tables_count': len(tables_info),
            'queries_count': len(queries_info),
            'tables': [{'name': t['name'], 'row_count': t['row_count'], 'columns_count': len(t['columns'])} for t in tables_info],
            'queries': [{'name': q['name']} for q in queries_info]
        }
        json.dump(summary, f, indent=2)
    
    logger.info(f"Generated JSON reports in {output_dir}")
    return [tables_json, queries_json, summary_json]

def generate_sql_schema(tables_info, output_dir):
    """Generate SQL schema for the database."""
    os.makedirs(output_dir, exist_ok=True)
    
    sql_schema = os.path.join(output_dir, 'schema.sql')
    with open(sql_schema, 'w') as f:
        f.write("-- Generated SQL schema from Access database\n")
        f.write("-- Generated on: " + datetime.now().strftime("%Y-%m-%d %H:%M:%S") + "\n\n")
        
        for table in tables_info:
            f.write(f"-- Table: {table['name']}\n")
            f.write(f"CREATE TABLE {table['name']} (\n")
            
            # Columns
            column_defs = []
            for col in table['columns']:
                nullable = "" if col['nullable'] else " NOT NULL"
                
                # Map Access types to SQL types (simplified)
                sql_type = "VARCHAR(255)"  # Default
                if col['type'] == 'int':
                    sql_type = "INTEGER"
                elif col['type'] == 'float':
                    sql_type = "FLOAT"
                elif col['type'] == 'str':
                    sql_type = f"VARCHAR({col['size'] if col['size'] else 255})"
                elif col['type'] == 'datetime':
                    sql_type = "DATETIME"
                elif col['type'] == 'bool':
                    sql_type = "BOOLEAN"
                
                column_defs.append(f"    {col['name']} {sql_type}{nullable}")
            
            # Primary key
            if table['primary_keys']:
                pk_cols = ', '.join(table['primary_keys'])
                column_defs.append(f"    PRIMARY KEY ({pk_cols})")
            
            f.write(',\n'.join(column_defs))
            f.write("\n);\n\n")
            
            # Indexes
            for idx in table['indexes']:
                if idx['name'] != 'PrimaryKey':  # Skip primary key index
                    unique = "UNIQUE " if idx['unique'] else ""
                    cols = ', '.join(idx['columns'])
                    f.write(f"CREATE {unique}INDEX {idx['name']} ON {table['name']} ({cols});\n")
            
            f.write("\n")
    
    logger.info(f"Generated SQL schema in {sql_schema}")
    return sql_schema

def main():
    """Main function."""
    args = parse_args()
    
    # Start time
    start_time = datetime.now()
    logger.info(f"Analysis started at {start_time}")
    
    # Connect to Access database
    access_conn = connect_to_access(args.source)
    
    # Get table and query names
    table_names = get_table_names(access_conn)
    query_names = get_query_names(access_conn)
    
    # Analyze tables
    tables_info = []
    for table_name in table_names:
        logger.info(f"Analyzing table: {table_name}")
        table_info = analyze_table(access_conn, table_name)
        tables_info.append(table_info)
    
    # Analyze queries
    queries_info = []
    for query_name in query_names:
        logger.info(f"Analyzing query: {query_name}")
        query_info = analyze_query(access_conn, query_name)
        queries_info.append(query_info)
    
    # Close Access connection
    access_conn.close()
    
    # Generate reports
    output_dir = args.output
    os.makedirs(output_dir, exist_ok=True)
    
    md_reports = generate_markdown_report(tables_info, queries_info, os.path.join(output_dir, 'markdown'))
    json_reports = generate_json_report(tables_info, queries_info, os.path.join(output_dir, 'json'))
    sql_schema = generate_sql_schema(tables_info, os.path.join(output_dir, 'sql'))
    
    # End time
    end_time = datetime.now()
    duration = end_time - start_time
    logger.info(f"Analysis completed at {end_time}")
    logger.info(f"Total duration: {duration}")
    logger.info(f"Generated reports in {output_dir}")
    
    # Print summary
    print(f"\nAnalysis Summary:")
    print(f"- Tables: {len(tables_info)}")
    print(f"- Queries: {len(queries_info)}")
    print(f"- Reports generated in: {output_dir}")
    print(f"- Duration: {duration}")

if __name__ == "__main__":
    main()