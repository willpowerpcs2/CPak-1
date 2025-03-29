#!/usr/bin/env python3
"""
CPak Database Export Debug Script

This script helps debug issues with the database export process.
It provides more detailed error messages and checks for common problems.

Usage:
    python debug_export.py --db-name <database_name> --db-user <database_user> --db-password <database_password> --db-host <database_host> --db-port <database_port> --output <output_dir>
"""

import argparse
import logging
import os
import subprocess
import sys
import traceback
from datetime import datetime

# Configure logging with more detailed format
logging.basicConfig(
    level=logging.DEBUG,  # Use DEBUG level for more detailed logs
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('debug_export.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Debug database export issues.')
    parser.add_argument('--output', default='./database_export', help='Directory to output export files')
    parser.add_argument('--db-name', required=True, help='PostgreSQL database name')
    parser.add_argument('--db-user', required=True, help='PostgreSQL database user')
    parser.add_argument('--db-password', required=True, help='PostgreSQL database password')
    parser.add_argument('--db-host', default='localhost', help='PostgreSQL database host')
    parser.add_argument('--db-port', default='5432', help='PostgreSQL database port')
    return parser.parse_args()

def check_postgres_connection(db_name, db_user, db_password, db_host, db_port):
    """Check if we can connect to PostgreSQL."""
    logger.info("Checking PostgreSQL connection...")
    
    try:
        # First check if psycopg2 is installed
        try:
            import psycopg2
            from psycopg2 import sql
        except ImportError:
            logger.error("psycopg2 module not found. Please install it using 'pip install psycopg2-binary'.")
            return False
        
        # Try to connect
        conn = psycopg2.connect(
            dbname=db_name,
            user=db_user,
            password=db_password,
            host=db_host,
            port=db_port
        )
        
        # Check if connection is working by executing a simple query
        cursor = conn.cursor()
        cursor.execute("SELECT version();")
        version = cursor.fetchone()
        logger.info(f"Connected to PostgreSQL: {version[0]}")
        
        # Check if we can list tables
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        """)
        tables = cursor.fetchall()
        table_count = len(tables)
        logger.info(f"Found {table_count} tables in the database")
        
        if table_count == 0:
            logger.warning("No tables found in the database. This might indicate a problem with the migration.")
        else:
            # List the first 10 tables
            table_names = [row[0] for row in tables[:10]]
            logger.info(f"Sample tables: {', '.join(table_names)}")
            
            # Check row counts for a few tables
            for table in table_names[:3]:  # Check first 3 tables
                cursor.execute(f"SELECT COUNT(*) FROM \"{table}\"")
                row_count = cursor.fetchone()[0]
                logger.info(f"Table {table} has {row_count} rows")
        
        conn.close()
        return True
    
    except Exception as e:
        logger.error(f"Error connecting to PostgreSQL: {e}")
        logger.error(traceback.format_exc())
        return False

def check_pg_dump_availability():
    """Check if pg_dump is available."""
    logger.info("Checking pg_dump availability...")
    
    try:
        result = subprocess.run(
            ["pg_dump", "--version"],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            logger.info(f"pg_dump is available: {result.stdout.strip()}")
            return True
        else:
            logger.error(f"pg_dump check failed: {result.stderr}")
            return False
    
    except FileNotFoundError:
        logger.error("pg_dump command not found. Please ensure PostgreSQL client tools are installed and in your PATH.")
        return False
    except Exception as e:
        logger.error(f"Error checking pg_dump: {e}")
        logger.error(traceback.format_exc())
        return False

def check_pandas_availability():
    """Check if pandas is available."""
    logger.info("Checking pandas availability...")
    
    try:
        import pandas as pd
        logger.info(f"pandas is available: {pd.__version__}")
        return True
    except ImportError:
        logger.error("pandas module not found. Please install it using 'pip install pandas'.")
        return False
    except Exception as e:
        logger.error(f"Error checking pandas: {e}")
        logger.error(traceback.format_exc())
        return False

def check_output_directory(output_dir):
    """Check if output directory can be created and written to."""
    logger.info(f"Checking output directory: {output_dir}")
    
    try:
        # Try to create the directory
        os.makedirs(output_dir, exist_ok=True)
        
        # Check if we can write to it
        test_file = os.path.join(output_dir, "test_write.txt")
        with open(test_file, "w") as f:
            f.write("Test write")
        
        # Clean up
        os.remove(test_file)
        
        logger.info(f"Output directory is writable: {output_dir}")
        return True
    
    except Exception as e:
        logger.error(f"Error with output directory: {e}")
        logger.error(traceback.format_exc())
        return False

def test_export_table(db_name, db_user, db_password, db_host, db_port, output_dir):
    """Test exporting a single table to CSV."""
    logger.info("Testing table export to CSV...")
    
    try:
        import pandas as pd
        import psycopg2
        from psycopg2 import sql
        
        # Connect to PostgreSQL
        conn = psycopg2.connect(
            dbname=db_name,
            user=db_user,
            password=db_password,
            host=db_host,
            port=db_port
        )
        
        # Get a table to test with
        cursor = conn.cursor()
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            LIMIT 1
        """)
        
        table_result = cursor.fetchone()
        if not table_result:
            logger.error("No tables found to test export")
            return False
        
        test_table = table_result[0]
        logger.info(f"Testing export with table: {test_table}")
        
        # Create test directory
        test_dir = os.path.join(output_dir, "test")
        os.makedirs(test_dir, exist_ok=True)
        
        # Export the table
        csv_path = os.path.join(test_dir, f"{test_table}.csv")
        query = f"SELECT * FROM \"{test_table}\""
        df = pd.read_sql_query(query, conn)
        df.to_csv(csv_path, index=False)
        
        # Verify the file was created
        if os.path.exists(csv_path):
            file_size = os.path.getsize(csv_path)
            logger.info(f"Successfully exported test table to {csv_path} (size: {file_size} bytes)")
            return True
        else:
            logger.error(f"Failed to create CSV file at {csv_path}")
            return False
    
    except Exception as e:
        logger.error(f"Error testing table export: {e}")
        logger.error(traceback.format_exc())
        return False

def test_pg_dump(db_name, db_user, db_password, db_host, db_port, output_dir):
    """Test running pg_dump."""
    logger.info("Testing pg_dump...")
    
    try:
        # Create test directory
        test_dir = os.path.join(output_dir, "test")
        os.makedirs(test_dir, exist_ok=True)
        
        # Set up test dump file
        test_dump = os.path.join(test_dir, "test_dump.sql")
        
        # Set environment variables for password
        env = os.environ.copy()
        env["PGPASSWORD"] = db_password
        
        # Run pg_dump with limited output (schema only for speed)
        cmd = [
            "pg_dump",
            "-h", db_host,
            "-p", db_port,
            "-U", db_user,
            "-d", db_name,
            "-f", test_dump,
            "--schema-only",  # Schema only for a quick test
            "--no-owner",
            "--no-acl"
        ]
        
        logger.info(f"Running test pg_dump command: {' '.join(cmd)}")
        result = subprocess.run(cmd, env=env, capture_output=True, text=True)
        
        if result.returncode == 0:
            if os.path.exists(test_dump):
                file_size = os.path.getsize(test_dump)
                logger.info(f"Successfully created test dump at {test_dump} (size: {file_size} bytes)")
                return True
            else:
                logger.error(f"pg_dump reported success but no file was created at {test_dump}")
                return False
        else:
            logger.error(f"pg_dump failed with error code {result.returncode}")
            logger.error(f"Error output: {result.stderr}")
            return False
    
    except Exception as e:
        logger.error(f"Error testing pg_dump: {e}")
        logger.error(traceback.format_exc())
        return False

def main():
    """Main function."""
    print("\n=== CPak Database Export Debug Tool ===\n")
    
    args = parse_args()
    
    # Start time
    start_time = datetime.now()
    logger.info(f"Debug process started at {start_time}")
    
    # Run checks
    checks = [
        ("PostgreSQL Connection", check_postgres_connection(
            args.db_name, args.db_user, args.db_password, args.db_host, args.db_port
        )),
        ("pandas Availability", check_pandas_availability()),
        ("pg_dump Availability", check_pg_dump_availability()),
        ("Output Directory", check_output_directory(args.output)),
        ("Test Table Export", test_export_table(
            args.db_name, args.db_user, args.db_password, args.db_host, args.db_port, args.output
        )),
        ("Test pg_dump", test_pg_dump(
            args.db_name, args.db_user, args.db_password, args.db_host, args.db_port, args.output
        ))
    ]
    
    # End time
    end_time = datetime.now()
    duration = end_time - start_time
    
    # Print summary
    print("\n=== Debug Results ===\n")
    
    all_passed = True
    for check_name, result in checks:
        status = "PASSED" if result else "FAILED"
        if not result:
            all_passed = False
        print(f"{check_name}: {status}")
    
    print(f"\nTotal duration: {duration}")
    
    if all_passed:
        print("\n✅ All checks passed! You should be able to run the export script successfully.")
        print("\nTry running the export script with:")
        print(f"python database/export_postgres.py --db-name {args.db_name} --db-user {args.db_user} --db-password <your-password> --db-host {args.db_host} --db-port {args.db_port} --output {args.output}")
    else:
        print("\n❌ Some checks failed. Please review the debug.log file for details.")
        print("\nCommon issues:")
        print("1. PostgreSQL is not running")
        print("2. Database credentials are incorrect")
        print("3. Required Python packages are not installed")
        print("4. pg_dump is not installed or not in PATH")
        print("5. Permission issues with the output directory")
    
    print("\nFor more details, check the debug_export.log file.")

if __name__ == "__main__":
    main()