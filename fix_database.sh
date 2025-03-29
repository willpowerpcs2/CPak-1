#!/bin/bash

echo "==================================="
echo "CPak Database Connection Fix Script"
echo "==================================="
echo

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Python is not installed or not in PATH."
    echo "Please install Python from https://www.python.org/downloads/"
    echo
    read -p "Press Enter to continue..."
    exit 1
fi

# Install required packages
echo "Installing required packages..."
pip3 install psycopg2-binary

# Run the fix script
echo
echo "Running database connection fix script..."
python3 database/fix_db_connection.py

echo
read -p "Press Enter to continue..."