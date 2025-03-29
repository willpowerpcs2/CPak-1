def fix_schema_file(schema_file):
    """Fix the schema file by replacing 'DATETIME' with 'TIMESTAMP'."""
    if os.path.exists(schema_file):
        with open(schema_file, 'r') as file:
            schema_content = file.read()
        
        # Replace 'DATETIME' with 'TIMESTAMP'
        schema_content = schema_content.replace('DATETIME', 'TIMESTAMP')
        
        with open(schema_file, 'w') as file:
            file.write(schema_content)
        logger.info(f"Schema file {schema_file} updated with TIMESTAMP instead of DATETIME.")
    else:
        logger.error(f"Schema file {schema_file} does not exist.")
        sys.exit(1)

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
    
    # Determine the schema file to use
    if args.schema_file:
        # Use the provided schema file if given
        schema_file = args.schema_file
    else:
        # Default to the one from the analysis output if not skipping analysis/extraction
        schema_file = os.path.join(analysis_output, 'sql', 'schema.sql') if not args.skip_analysis_extraction else './migration_output/extracted_data/schema.sql'

    # Fix schema file if needed
    fix_schema_file(schema_file)
    
    # Step 3: Import data to PostgreSQL
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
