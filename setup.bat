@echo off
echo CPak Web Application Setup Script
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js is installed.
echo.

REM Check if backend directory exists
if not exist backend (
    echo ERROR: Backend directory not found.
    echo Please make sure you're running this script from the root of the CPak-1 repository.
    pause
    exit /b 1
)

REM Check if frontend directory exists
if not exist frontend (
    echo ERROR: Frontend directory not found.
    echo Please make sure you're running this script from the root of the CPak-1 repository.
    pause
    exit /b 1
)

echo Setting up backend...
cd backend

REM Check if app.js exists, if not create it
if not exist app.js (
    echo app.js not found, creating it...
    node fix_missing_app.js
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to create app.js
        cd ..
        pause
        exit /b 1
    )
)

REM Check if .env exists, if not create it
if not exist .env (
    echo Creating .env file from template...
    copy env.example .env
    echo Please edit the .env file with your database credentials.
    notepad .env
)

REM Install backend dependencies
echo Installing backend dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install backend dependencies.
    cd ..
    pause
    exit /b 1
)

echo Backend setup complete.
echo.

REM Setup frontend
echo Setting up frontend...
cd ../frontend

REM Install frontend dependencies
echo Installing frontend dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install frontend dependencies.
    cd ..
    pause
    exit /b 1
)

echo Frontend setup complete.
echo.

cd ..

echo ================================
echo Setup completed successfully!
echo.
echo To start the application:
echo.
echo 1. Start the backend:
echo    cd backend
echo    npm start
echo.
echo 2. In a new terminal, start the frontend:
echo    cd frontend
echo    npm start
echo.
echo The application will be available at http://localhost:3000
echo.
echo Would you like to start the backend now? (Y/N)
set /p START_BACKEND=

if /i "%START_BACKEND%"=="Y" (
    echo Starting backend...
    start cmd /k "cd backend && npm start"
    
    echo Would you like to start the frontend as well? (Y/N)
    set /p START_FRONTEND=
    
    if /i "%START_FRONTEND%"=="Y" (
        echo Starting frontend...
        start cmd /k "cd frontend && npm start"
    )
)

echo.
echo Thank you for using CPak Web Application!
pause