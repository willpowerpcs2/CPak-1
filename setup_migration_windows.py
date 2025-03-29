#!/usr/bin/env python3
"""
CPak Migration Environment Setup Script for Windows
This script sets up the environment for the CPak migration project on Windows
"""

import os
import subprocess
import sys
import argparse
from pathlib import Path

def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Set up CPak migration environment on Windows.')
    parser.add_argument('--python-path', default='python', help='Path to Python executable')
    parser.add_argument('--node-path', default='npm', help='Path to npm executable')
    return parser.parse_args()

def run_command(command, description):
    """Run a command and print the output."""
    print(f"Running {description}...")
    try:
        result = subprocess.run(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True
        )
        print(f"{description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"{description} failed with error code {e.returncode}")
        print(e.stderr)
        return False
    except FileNotFoundError:
        print(f"Command not found. Please make sure {command[0]} is installed and in your PATH.")
        return False

def create_directory_structure():
    """Create the project directory structure."""
    print("Creating project directory structure...")
    
    directories = [
        "database/analysis_output/markdown",
        "database/analysis_output/json",
        "database/analysis_output/sql",
        "database/extracted_data",
        "backend",
        "frontend",
        "docs"
    ]
    
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
    
    print("Directory structure created successfully")

def install_python_dependencies(python_path):
    """Install Python dependencies."""
    dependencies = ["pyodbc", "pandas", "tabulate", "psycopg2-binary"]
    
    for dependency in dependencies:
        if not run_command([python_path, "-m", "pip", "install", dependency], f"Installing {dependency}"):
            print(f"Failed to install {dependency}. Please install it manually.")

def setup_backend(node_path):
    """Set up the backend environment."""
    os.chdir("backend")
    
    # Initialize package.json if it doesn't exist
    if not os.path.exists("package.json"):
        run_command([node_path, "init", "-y"], "Initializing package.json")
    
    # Install dependencies
    dependencies = ["express", "cors", "helmet", "morgan", "pg", "dotenv", "bcrypt", "jsonwebtoken"]
    dev_dependencies = ["nodemon", "jest", "supertest"]
    
    run_command([node_path, "install", "--save"] + dependencies, "Installing backend dependencies")
    run_command([node_path, "install", "--save-dev"] + dev_dependencies, "Installing backend dev dependencies")
    
    # Create .env file
    with open(".env", "w") as f:
        f.write("""# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cpak

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
""")
    
    os.chdir("..")

def setup_frontend(node_path):
    """Set up the frontend environment."""
    os.chdir("frontend")
    
    # Initialize package.json if it doesn't exist
    if not os.path.exists("package.json"):
        run_command([node_path, "init", "-y"], "Initializing package.json")
    
    # Install dependencies
    dependencies = [
        "react", "react-dom", "react-router-dom", 
        "@mui/material", "@mui/icons-material", 
        "@emotion/react", "@emotion/styled", 
        "@mui/x-data-grid", "axios", 
        "chart.js", "react-chartjs-2"
    ]
    dev_dependencies = ["react-scripts"]
    
    run_command([node_path, "install", "--save"] + dependencies, "Installing frontend dependencies")
    run_command([node_path, "install", "--save-dev"] + dev_dependencies, "Installing frontend dev dependencies")
    
    os.chdir("..")

def main():
    """Main function."""
    args = parse_args()
    
    print("Setting up CPak migration environment on Windows...")
    
    # Create directory structure
    create_directory_structure()
    
    # Install Python dependencies
    install_python_dependencies(args.python_path)
    
    # Set up backend and frontend if Node.js is available
    try:
        subprocess.run([args.node_path, "--version"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        setup_backend(args.node_path)
        setup_frontend(args.node_path)
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("Node.js/npm not found. Skipping backend and frontend setup.")
    
    print("\nEnvironment setup complete!")
    print("\nNext steps:")
    print("1. Edit backend/.env to set your database credentials")
    print("2. Run the migration analysis script:")
    print(f"   {args.python_path} database/analyze_access_db.py --source \"consumerpakFixed - BackupCopy-2-24-25.accdb\" --output ./database/analysis_output")
    print("3. Extract data from the Access database:")
    print(f"   {args.python_path} database/extract_access_data.py --source \"consumerpakFixed - BackupCopy-2-24-25.accdb\" --output ./database/extracted_data")
    print("4. Import the data into PostgreSQL:")
    print(f"   {args.python_path} database/import_to_postgres.py --input ./database/extracted_data --db-name cpak --db-user <username> --db-password <password> --schema-file ./database/analysis_output/sql/schema.sql")
    print("\nAlternatively, you can use the all-in-one migration script:")
    print(f"   {args.python_path} run_migration.py --source \"consumerpakFixed - BackupCopy-2-24-25.accdb\" --output ./migration_output --db-name cpak --db-user <username> --db-password <password>")

if __name__ == "__main__":
    main()