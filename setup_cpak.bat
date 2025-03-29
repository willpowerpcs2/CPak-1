@echo off
echo ===================================
echo CPak Application Setup
echo ===================================
echo.
echo This script will set up both the backend and frontend for the CPak application.
echo.
echo 1. First, we'll set up the backend and database connection.
echo 2. Then, we'll set up the frontend with all required dependencies.
echo.
echo Press any key to continue...
pause > nul

echo.
echo ===================================
echo Step 1: Setting up the backend
echo ===================================
echo.
call fix_backend.bat

echo.
echo ===================================
echo Step 2: Setting up the frontend
echo ===================================
echo.
call fix_frontend_dependencies.bat

echo.
echo ===================================
echo Setup Complete!
echo ===================================
echo.
echo To start the application:
echo.
echo 1. Start the backend:
echo    cd backend
echo    npm start
echo.
echo 2. In a separate terminal, start the frontend:
echo    cd frontend
echo    npm run start_custom
echo.
echo 3. Access the application at: http://localhost:3000
echo.
echo For more information, please refer to the CPAK_SETUP_GUIDE.md file.
echo.
pause