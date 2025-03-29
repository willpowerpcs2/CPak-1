#!/bin/bash

echo "CPak Web Application Setup Script"
echo "================================"
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed or not in PATH."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node.js is installed."
echo

# Check if backend directory exists
if [ ! -d "backend" ]; then
    echo "ERROR: Backend directory not found."
    echo "Please make sure you're running this script from the root of the CPak-1 repository."
    exit 1
fi

# Check if frontend directory exists
if [ ! -d "frontend" ]; then
    echo "ERROR: Frontend directory not found."
    echo "Please make sure you're running this script from the root of the CPak-1 repository."
    exit 1
fi

echo "Setting up backend..."
cd backend

# Check if app.js exists, if not create it
if [ ! -f "app.js" ]; then
    echo "app.js not found, creating it..."
    node fix_missing_app.js
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to create app.js"
        cd ..
        exit 1
    fi
fi

# Check if .env exists, if not create it
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp env.example .env
    echo "Please edit the .env file with your database credentials."
    if command -v nano &> /dev/null; then
        nano .env
    elif command -v vim &> /dev/null; then
        vim .env
    else
        echo "Please edit the .env file manually with a text editor."
    fi
fi

# Install backend dependencies
echo "Installing backend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install backend dependencies."
    cd ..
    exit 1
fi

echo "Backend setup complete."
echo

# Setup frontend
echo "Setting up frontend..."
cd ../frontend

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies."
    cd ..
    exit 1
fi

echo "Frontend setup complete."
echo

cd ..

echo "================================"
echo "Setup completed successfully!"
echo
echo "To start the application:"
echo
echo "1. Start the backend:"
echo "   cd backend"
echo "   npm start"
echo
echo "2. In a new terminal, start the frontend:"
echo "   cd frontend"
echo "   npm start"
echo
echo "The application will be available at http://localhost:3000"
echo

read -p "Would you like to start the backend now? (y/n): " START_BACKEND

if [[ $START_BACKEND == "y" || $START_BACKEND == "Y" ]]; then
    echo "Starting backend..."
    gnome-terminal -- bash -c "cd backend && npm start" 2>/dev/null || 
    xterm -e "cd backend && npm start" 2>/dev/null || 
    konsole -e "cd backend && npm start" 2>/dev/null || 
    terminal -e "cd backend && npm start" 2>/dev/null || 
    cd backend && npm start &
    
    read -p "Would you like to start the frontend as well? (y/n): " START_FRONTEND
    
    if [[ $START_FRONTEND == "y" || $START_FRONTEND == "Y" ]]; then
        echo "Starting frontend..."
        gnome-terminal -- bash -c "cd frontend && npm start" 2>/dev/null || 
        xterm -e "cd frontend && npm start" 2>/dev/null || 
        konsole -e "cd frontend && npm start" 2>/dev/null || 
        terminal -e "cd frontend && npm start" 2>/dev/null || 
        cd frontend && npm start &
    fi
fi

echo
echo "Thank you for using CPak Web Application!"