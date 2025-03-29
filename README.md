# CPak Web Application

A web-based interface for interacting with your CPak PostgreSQL database.

## Quick Start

### Windows Users

1. Run the setup script by double-clicking `setup.bat` or running it from the command prompt:
   ```
   setup.bat
   ```

2. Follow the prompts to set up the backend and frontend.

3. When prompted, enter your database credentials in the .env file.

4. The script will ask if you want to start the backend and frontend automatically.

### Linux/Mac Users

1. Make the setup script executable:
   ```bash
   chmod +x setup.sh
   ```

2. Run the setup script:
   ```bash
   ./setup.sh
   ```

3. Follow the prompts to set up the backend and frontend.

4. When prompted, enter your database credentials in the .env file.

5. The script will ask if you want to start the backend and frontend automatically.

## Manual Setup

If you prefer to set up the application manually, follow these steps:

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. If app.js is missing, run the fix script:
   ```bash
   node fix_missing_app.js
   ```

3. Create a .env file from the example:
   ```bash
   cp env.example .env
   ```

4. Edit the .env file with your database credentials.

5. Install dependencies:
   ```bash
   npm install
   ```

6. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

## Accessing the Application

Once both the backend and frontend are running, you can access the application at http://localhost:3000.

## Troubleshooting

If you encounter any issues, please refer to the [TROUBLESHOOTING.md](TROUBLESHOOTING.md) file for common problems and solutions.

## Deployment

For information on deploying the application to a web server, please refer to the [SETUP_GUIDE.md](SETUP_GUIDE.md) file.

## Features

- **Dashboard**: Overview of your database with statistics and charts
- **Table Browser**: Browse all tables in your database
- **Table Detail**: View and search data within a specific table
- **Search**: Search across all tables in your database