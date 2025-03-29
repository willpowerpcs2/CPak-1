const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

console.log('Starting backend connection fix...');

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Path to .env file
const envPath = path.join(__dirname, '.env');

// Check if .env exists
let envExists = fs.existsSync(envPath);
let envContent = '';

if (envExists) {
  try {
    envContent = fs.readFileSync(envPath, 'utf8');
    console.log('Found existing .env file');
  } catch (error) {
    console.error('Error reading .env file:', error);
    envExists = false;
  }
}

// Function to prompt for database credentials
const promptForCredentials = () => {
  return new Promise((resolve) => {
    console.log('\nPlease enter your PostgreSQL database credentials:');
    
    rl.question('Database name (default: cpak): ', (dbName) => {
      dbName = dbName || 'cpak';
      
      rl.question('Database user (default: postgres): ', (dbUser) => {
        dbUser = dbUser || 'postgres';
        
        rl.question('Database password: ', (dbPassword) => {
          
          rl.question('Database host (default: localhost): ', (dbHost) => {
            dbHost = dbHost || 'localhost';
            
            rl.question('Database port (default: 5432): ', (dbPort) => {
              dbPort = dbPort || '5432';
              
              resolve({
                dbName,
                dbUser,
                dbPassword,
                dbHost,
                dbPort
              });
            });
          });
        });
      });
    });
  });
};

// Function to create or update .env file
const updateEnvFile = (credentials) => {
  const { dbName, dbUser, dbPassword, dbHost, dbPort } = credentials;
  
  // Create .env content with proper quoting for special characters
  const newEnvContent = `DB_NAME=${dbName}
DB_USER=${dbUser}
DB_PASSWORD="${dbPassword}"
DB_HOST=${dbHost}
DB_PORT=${dbPort}
PORT=3001
`;
  
  try {
    fs.writeFileSync(envPath, newEnvContent);
    console.log('\n.env file updated successfully!');
    return true;
  } catch (error) {
    console.error('Error writing .env file:', error);
    return false;
  }
};

// Function to create app.js if it doesn't exist
const createAppJs = () => {
  const appJsPath = path.join(__dirname, 'app.js');
  
  if (fs.existsSync(appJsPath)) {
    console.log('app.js already exists');
    return;
  }
  
  const appJsContent = `const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully');
  }
});

// API Routes

// Get all tables
app.get('/api/tables', async (req, res) => {
  try {
    const query = \`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    \`;
    
    const result = await pool.query(query);
    const tables = result.rows.map(row => row.table_name);
    
    res.json(tables);
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ error: 'Failed to fetch tables' });
  }
});

// Get table data with pagination
app.get('/api/tables/:tableName/data', async (req, res) => {
  const { tableName } = req.params;
  const { page = 1, limit = 100 } = req.query;
  
  const offset = (page - 1) * limit;
  
  try {
    // Get total count
    const countQuery = \`SELECT COUNT(*) FROM "\${tableName}"\`;
    const countResult = await pool.query(countQuery);
    const total = parseInt(countResult.rows[0].count);
    
    // Get data with pagination
    const dataQuery = \`SELECT * FROM "\${tableName}" LIMIT $1 OFFSET $2\`;
    const dataResult = await pool.query(dataQuery, [limit, offset]);
    
    res.json({
      data: dataResult.rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(\`Error fetching data from \${tableName}:\`, error);
    res.status(500).json({ error: \`Failed to fetch data from \${tableName}\` });
  }
});

// Get table schema
app.get('/api/tables/:tableName/schema', async (req, res) => {
  const { tableName } = req.params;
  
  try {
    const query = \`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = $1
      ORDER BY ordinal_position
    \`;
    
    const result = await pool.query(query, [tableName]);
    
    res.json(result.rows);
  } catch (error) {
    console.error(\`Error fetching schema for \${tableName}:\`, error);
    res.status(500).json({ error: \`Failed to fetch schema for \${tableName}\` });
  }
});

// Search across tables
app.get('/api/search', async (req, res) => {
  const { query, tables } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  
  try {
    // Get all tables if not specified
    let tableList = tables ? tables.split(',') : [];
    
    if (tableList.length === 0) {
      const tablesQuery = \`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      \`;
      
      const tablesResult = await pool.query(tablesQuery);
      tableList = tablesResult.rows.map(row => row.table_name);
    }
    
    // Search in each table
    const results = [];
    
    for (const tableName of tableList) {
      // Get columns for this table
      const columnsQuery = \`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = $1 AND data_type IN ('character varying', 'text')
      \`;
      
      const columnsResult = await pool.query(columnsQuery, [tableName]);
      const columns = columnsResult.rows.map(row => row.column_name);
      
      if (columns.length > 0) {
        // Build search query
        const searchConditions = columns.map((column, index) => 
          \`"\${column}"::text ILIKE $\${index + 1}\`
        ).join(' OR ');
        
        const searchQuery = \`
          SELECT * FROM "\${tableName}"
          WHERE \${searchConditions}
          LIMIT 100
        \`;
        
        const searchParams = columns.map(() => \`%\${query}%\`);
        
        const searchResult = await pool.query(searchQuery, searchParams);
        
        if (searchResult.rows.length > 0) {
          results.push({
            table: tableName,
            count: searchResult.rows.length,
            data: searchResult.rows
          });
        }
      }
    }
    
    res.json(results);
  } catch (error) {
    console.error('Error searching tables:', error);
    res.status(500).json({ error: 'Failed to search tables' });
  }
});

// Start server
app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});
`;
  
  try {
    fs.writeFileSync(appJsPath, appJsContent);
    console.log('Created app.js successfully');
  } catch (error) {
    console.error('Error creating app.js:', error);
  }
};

// Function to check if required packages are installed
const checkAndInstallPackages = () => {
  const packageJsonPath = path.join(__dirname, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log('package.json not found, creating it...');
    
    const packageJson = {
      "name": "cpak-backend",
      "version": "1.0.0",
      "description": "Backend for CPak application",
      "main": "app.js",
      "scripts": {
        "start": "node app.js",
        "dev": "nodemon app.js"
      },
      "dependencies": {
        "cors": "^2.8.5",
        "dotenv": "^16.0.3",
        "express": "^4.18.2",
        "pg": "^8.10.0"
      },
      "devDependencies": {
        "nodemon": "^2.0.22"
      }
    };
    
    try {
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('Created package.json');
    } catch (error) {
      console.error('Error creating package.json:', error);
      return false;
    }
  }
  
  console.log('Installing required packages...');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: __dirname });
    console.log('Packages installed successfully');
    return true;
  } catch (error) {
    console.error('Error installing packages:', error);
    return false;
  }
};

// Main function
const main = async () => {
  // Create app.js if it doesn't exist
  createAppJs();
  
  // Check and install required packages
  const packagesInstalled = checkAndInstallPackages();
  if (!packagesInstalled) {
    console.error('Failed to install required packages');
    rl.close();
    return;
  }
  
  // Prompt for database credentials
  const credentials = await promptForCredentials();
  
  // Update .env file
  const envUpdated = updateEnvFile(credentials);
  if (!envUpdated) {
    console.error('Failed to update .env file');
    rl.close();
    return;
  }
  
  console.log('\nBackend setup completed successfully!');
  console.log('\nTo start the backend, run:');
  console.log('npm start');
  
  rl.close();
};

// Run the main function
main();