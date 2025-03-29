@echo off
echo ===================================
echo CPak Database Connection Fix Script
echo ===================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed or not in PATH.
    echo Please install Python from https://www.python.org/downloads/
    echo.
    pause
    exit /b 1
)

REM Install required packages
echo Installing required packages...
pip install psycopg2-binary

REM Run the fix script
echo.
echo Running database connection fix script...
python database/fix_db_connection.py

echo.
pause