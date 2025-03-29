#!/usr/bin/env python3
"""
CPak Migration Execution Script

This script orchestrates the migration process by running the analysis, extraction,
and import scripts in sequence, or directly performing the import if needed.

Usage:
    python run_migration.py --source <access_db_path> --output <output_dir> [--skip-analysis-extraction]

Requirements:
    - All dependencies required by the individual scripts
"""

import argparse
import logging
import os
import subprocess
import sys
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('migration_execution.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Execute the CPak migration process.')
    parser.add_argument('--source', required=True, help='Path to the Access database file')
    parser.add_argument('--output', default='./migration_output', help='Directory to output migration files')
    parser.add_argument('--db-name', default='cpak', help='PostgreSQL database name')
    parser.add_argument('--db-user', required=True, help='PostgreSQL database user')
    parser.add_argument('--db-password', required=True, help='PostgreSQL database password')
    parser.add_argument('--db-host', default='localhost', help='PostgreSQL database host')
    parser.add_argument('--db-port', default='5432', help='PostgreSQL database port')
    parser.add_argument('--skip-analysis-extraction', action='store_true', 
                        help='Skip the analysis and extraction steps, directly run the import')
    return parser.parse_args()

def run_command(command, description):
    """Run a command and log the output."""
    logger.info(f"Running {description}...")
    try:
        result = subprocess.run(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True
        )
        logger.info(f"{description} completed successfully")
        logger.debug(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        logger.error(f"{description} failed with error code {e.returncode}")
        logger.error(e.stderr)
        return False

def main():
    """Main function."""
    args = parse_args()
    
    # Start time
    start_time = datetime.now()
    logger.info(f"Migration execution started at {start_time}")
    
    # Create output directories
    os.makedirs(args.output, exist_ok=True)
    analysis_output = os.path.join(args.output, 'analysis')
    extracted_data = os.path.join(args.output, 'extracted_data')

    # If not skipping, run database analysis and data extraction
    if not args.skip_analysis_extraction:
        # Step 1: Run database analysis
        analysis_command = [
            'python', 'database/analyze_access_db.py',
            '--source', args.source,
            '--output', analysis_output
        ]
        if not run_command(analysis_command, "Database analysis"):
            logger.error("Migration aborted due to analysis failure")
            sys.exit(1)
        
        # Step 2: Extract data from Access
        extraction_command = [
            'python', 'database/extract_access_data.py',
            '--source', args.source,
            '--output', extracted_data
        ]
        if not run_command(extraction_command, "Data extraction"):
            logger.error("Migration aborted due to extraction failure")
            sys.exit(1)
    
    # Step 3: Import data to PostgreSQL
    schema_file = os.path.join(analysis_output, 'sql', 'schema.sql') if not args.skip_analysis_extraction else './migration_output/extracted_data/schema.sql'
    import_command = [
        'python', 'database/import_to_postgres.py',
        '--input', extracted_data,
        '--db-name', args.db_name,
        '--db-user', args.db_user,
        '--db-password', args.db_password,
        '--db-host', args.db_host,
        '--db-port', args.db_port,
        '--schema-file', schema_file
    ]
    if not run_command(import_command, "Data import"):
        logger.error("Migration aborted due to import failure")
        sys.exit(1)
    
    # End time
    end_time = datetime.now()
    duration = end_time - start_time
    logger.info(f"Migration execution completed at {end_time}")
    logger.info(f"Total duration: {duration}")
    
    # Print summary
    print(f"\nMigration Execution Summary:")
    print(f"- Started: {start_time}")
    print(f"- Completed: {end_time}")
    print(f"- Duration: {duration}")
    print(f"- Analysis output: {analysis_output}")
    print(f"- Extracted data: {extracted_data}")
    print(f"- Database: {args.db_name} on {args.db_host}:{args.db_port}")
    print("\nMigration completed successfully!")

if __name__ == "__main__":
    main()
