#!/bin/bash

# CPak Migration Environment Setup Script for WSL
# This script sets up the environment for the CPak migration project

echo "Setting up CPak migration environment..."

# Create project directory structure
mkdir -p database/analysis_output/{markdown,json,sql}
mkdir -p database/extracted_data
mkdir -p backend
mkdir -p frontend
mkdir -p docs

# Clone the repository if not already cloned
if [ ! -d ".git" ]; then
  echo "Cloning the CPak repository..."
  git clone https://github.com/willpowerpcs/CPak.git .
else
  echo "Repository already cloned, pulling latest changes..."
  git pull
fi

# Install Python dependencies
echo "Installing Python dependencies..."
pip install pyodbc pandas tabulate psycopg2-binary

# Install Node.js dependencies for backend
echo "Installing Node.js dependencies for backend..."
cd backend
npm init -y
npm install express cors helmet morgan pg dotenv bcrypt jsonwebtoken
npm install --save-dev nodemon jest supertest
cd ..

# Install Node.js dependencies for frontend
echo "Installing Node.js dependencies for frontend..."
cd frontend
npm init -y
npm install react react-dom react-router-dom @mui/material @mui/icons-material @emotion/react @emotion/styled @mui/x-data-grid axios chart.js react-chartjs-2
npm install --save-dev react-scripts
cd ..

# Create .env file for backend
echo "Creating .env file for backend..."
cat > backend/.env << EOL
# Server Configuration
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
EOL

echo "Environment setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env to set your database credentials"
echo "2. Run the migration analysis script:"
echo "   python database/analyze_access_db.py --source \"consumerpakFixed - BackupCopy-2-24-25.accdb\" --output ./database/analysis_output"
echo "3. Extract data from the Access database:"
echo "   python database/extract_access_data.py --source \"consumerpakFixed - BackupCopy-2-24-25.accdb\" --output ./database/extracted_data"
echo "4. Import the data into PostgreSQL:"
echo "   python database/import_to_postgres.py --input ./database/extracted_data --db-name cpak --db-user <username> --db-password <password> --schema-file ./database/analysis_output/sql/schema.sql"