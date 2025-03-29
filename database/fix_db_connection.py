#!/usr/bin/env python3
"""
CPak Database Connection Fix Script

This script helps you test and fix database connection issues by:
1. Testing your current database connection
2. Helping you update your .env file with correct credentials
3. Providing guidance on PostgreSQL password reset if needed

Usage:
    python fix_db_connection.py
"""

import os
import sys
import getpass
import subprocess
import platform

try:
    import psycopg2
except ImportError:
    print("Error: psycopg2 module not found. Please install it using 'pip install psycopg2-binary'.")
    sys.exit(1)

def read_env_file(env_path):
    """Read environment variables from .env file."""
    env_vars = {}
    if os.path.exists(env_path):
        with open(env_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    env_vars[key] = value
    return env_vars

def write_env_file(env_path, env_vars):
    """Write environment variables to .env file."""
    with open(env_path, 'w') as f:
        for section in ["# Server Configuration", "# Database Configuration", "# JWT Configuration"]:
            f.write(f"{section}\n")
            if section == "# Server Configuration":
                f.write(f"PORT={env_vars.get('PORT', '3001')}\n")
                f.write(f"NODE_ENV={env_vars.get('NODE_ENV', 'development')}\n")
                f.write("\n")
            elif section == "# Database Configuration":
                f.write(f"DB_USER={env_vars.get('DB_USER', 'postgres')}\n")
                f.write(f"DB_PASSWORD={env_vars.get('DB_PASSWORD', '')}\n")
                f.write(f"DB_HOST={env_vars.get('DB_HOST', 'localhost')}\n")
                f.write(f"DB_PORT={env_vars.get('DB_PORT', '5432')}\n")
                f.write(f"DB_NAME={env_vars.get('DB_NAME', 'cpak')}\n")
                f.write("\n")
            elif section == "# JWT Configuration":
                f.write(f"JWT_SECRET={env_vars.get('JWT_SECRET', 'your_jwt_secret')}\n")
                f.write(f"JWT_EXPIRES_IN={env_vars.get('JWT_EXPIRES_IN', '1d')}\n")

def test_connection(db_name, db_user, db_password, db_host, db_port):
    """Test PostgreSQL connection."""
    try:
        conn = psycopg2.connect(
            dbname=db_name,
            user=db_user,
            password=db_password,
            host=db_host,
            port=db_port
        )
        cursor = conn.cursor()
        cursor.execute("SELECT version();")
        version = cursor.fetchone()[0]
        conn.close()
        return True, version
    except Exception as e:
        return False, str(e)

def print_postgres_reset_instructions():
    """Print instructions for resetting PostgreSQL password."""
    print("\n=== PostgreSQL Password Reset Instructions ===")
    
    if platform.system() == "Windows":
        print("""
Windows Instructions:
1. Open Command Prompt as Administrator
2. Stop PostgreSQL service:
   > net stop postgresql-x64-17
   (Use the correct service name for your PostgreSQL version)
3. Login as the postgres user:
   > runas /user:postgres "cmd.exe"
4. Connect to PostgreSQL with no password:
   > psql -U postgres -d postgres
5. Change the password:
   postgres=# ALTER USER postgres WITH PASSWORD 'new_password';
   postgres=# \q
6. Start PostgreSQL service:
   > net start postgresql-x64-17
        """)
    else:
        print("""
Linux/Mac Instructions:
1. Switch to the postgres user:
   $ sudo -i -u postgres
2. Connect to PostgreSQL:
   $ psql
3. Change the password:
   postgres=# ALTER USER postgres WITH PASSWORD 'new_password';
   postgres=# \q
        """)

def main():
    """Main function."""
    print("=== CPak Database Connection Fix ===")
    
    # Find backend directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.abspath(os.path.join(script_dir, '..', 'backend'))
    env_path = os.path.join(backend_dir, '.env')
    
    # Read current .env file
    env_vars = read_env_file(env_path)
    
    # Get current database settings
    db_user = env_vars.get('DB_USER', 'postgres')
    db_password = env_vars.get('DB_PASSWORD', '')
    db_host = env_vars.get('DB_HOST', 'localhost')
    db_port = env_vars.get('DB_PORT', '5432')
    db_name = env_vars.get('DB_NAME', 'cpak')
    
    print(f"\nCurrent database settings:")
    print(f"- Database: {db_name}")
    print(f"- User: {db_user}")
    print(f"- Host: {db_host}:{db_port}")
    print(f"- Password: {'*' * len(db_password) if db_password else 'not set'}")
    
    # Test current connection
    print("\nTesting database connection...")
    success, message = test_connection(db_name, db_user, db_password, db_host, db_port)
    
    if success:
        print(f"✅ Connection successful! PostgreSQL version: {message}")
        print("\nYour database connection is working correctly.")
        return
    
    print(f"❌ Connection failed: {message}")
    
    # Ask if user wants to update settings
    update = input("\nWould you like to update your database settings? (y/n): ").lower() == 'y'
    
    if update:
        # Get new settings
        print("\nEnter new database settings (press Enter to keep current value):")
        new_db_user = input(f"Database user [{db_user}]: ") or db_user
        new_db_password = getpass.getpass(f"Database password: ") or db_password
        new_db_host = input(f"Database host [{db_host}]: ") or db_host
        new_db_port = input(f"Database port [{db_port}]: ") or db_port
        new_db_name = input(f"Database name [{db_name}]: ") or db_name
        
        # Test new connection
        print("\nTesting new database connection...")
        success, message = test_connection(new_db_name, new_db_user, new_db_password, new_db_host, new_db_port)
        
        if success:
            print(f"✅ Connection successful! PostgreSQL version: {message}")
            
            # Update .env file
            env_vars['DB_USER'] = new_db_user
            env_vars['DB_PASSWORD'] = new_db_password
            env_vars['DB_HOST'] = new_db_host
            env_vars['DB_PORT'] = new_db_port
            env_vars['DB_NAME'] = new_db_name
            
            write_env_file(env_path, env_vars)
            print(f"\n✅ Updated .env file with new database settings: {env_path}")
            
            print("\nYou can now start the backend server:")
            print("cd backend")
            print("npm start")
        else:
            print(f"❌ Connection with new settings failed: {message}")
            print_postgres_reset_instructions()
    else:
        print_postgres_reset_instructions()

if __name__ == "__main__":
    main()