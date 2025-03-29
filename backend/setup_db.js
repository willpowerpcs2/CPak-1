/**
 * Database Setup Helper
 * 
 * This script helps users set up their database connection by:
 * 1. Testing the connection with the current credentials
 * 2. Allowing users to update credentials if needed
 * 3. Saving the updated credentials to .env file
 */

const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Load current .env file
const envPath = path.join(__dirname, '.env');
let envContent = '';
try {
  envContent = fs.readFileSync(envPath, 'utf8');
} catch (error) {
  console.error('Error reading .env file:', error);
  process.exit(1);
}

// Parse current database settings
const dbSettings = {
  user: (envContent.match(/DB_USER=(.*)/) || [])[1] || 'postgres',
  password: (envContent.match(/DB_PASSWORD=(.*)/) || [])[1] || '',
  host: (envContent.match(/DB_HOST=(.*)/) || [])[1] || 'localhost',
  port: (envContent.match(/DB_PORT=(.*)/) || [])[1] || '5432',
  database: (envContent.match(/DB_NAME=(.*)/) || [])[1] || 'cpak'
};

// Remove quotes if they exist
Object.keys(dbSettings).forEach(key => {
  if (dbSettings[key].startsWith('"') && dbSettings[key].endsWith('"')) {
    dbSettings[key] = dbSettings[key].slice(1, -1);
  }
});

console.log('Current database settings:');
console.log('- User:', dbSettings.user);
console.log('- Password:', dbSettings.password ? '********' : '(not set)');
console.log('- Host:', dbSettings.host);
console.log('- Port:', dbSettings.port);
console.log('- Database:', dbSettings.database);
console.log('\nTesting connection with these settings...');

// Test connection with current settings
const pool = new Pool({
  user: dbSettings.user,
  password: dbSettings.password,
  host: dbSettings.host,
  port: dbSettings.port,
  database: dbSettings.database,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    console.log('\nWould you like to update your database settings? (y/n)');
    
    rl.question('> ', (answer) => {
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        updateSettings();
      } else {
        console.log('Exiting without changes.');
        rl.close();
        process.exit(0);
      }
    });
  } else {
    console.log('Database connection successful!');
    console.log('Connected at:', res.rows[0].now);
    rl.close();
    process.exit(0);
  }
});

// Function to update database settings
function updateSettings() {
  console.log('\nEnter new database settings (press Enter to keep current value):');
  
  rl.question(`Database user (${dbSettings.user}): `, (user) => {
    dbSettings.user = user || dbSettings.user;
    
    rl.question(`Database password: `, (password) => {
      dbSettings.password = password || dbSettings.password;
      
      rl.question(`Database host (${dbSettings.host}): `, (host) => {
        dbSettings.host = host || dbSettings.host;
        
        rl.question(`Database port (${dbSettings.port}): `, (port) => {
          dbSettings.port = port || dbSettings.port;
          
          rl.question(`Database name (${dbSettings.database}): `, (database) => {
            dbSettings.database = database || dbSettings.database;
            
            // Test new connection
            console.log('\nTesting connection with new settings...');
            
            const newPool = new Pool({
              user: dbSettings.user,
              password: dbSettings.password,
              host: dbSettings.host,
              port: dbSettings.port,
              database: dbSettings.database,
            });
            
            newPool.query('SELECT NOW()', (err, res) => {
              if (err) {
                console.error('Database connection failed with new settings:', err.message);
                console.log('\nWould you like to save these settings anyway? (y/n)');
                
                rl.question('> ', (answer) => {
                  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
                    saveSettings();
                  } else {
                    console.log('Exiting without changes.');
                    rl.close();
                    process.exit(0);
                  }
                });
              } else {
                console.log('Database connection successful with new settings!');
                console.log('Connected at:', res.rows[0].now);
                saveSettings();
              }
            });
          });
        });
      });
    });
  });
}

// Function to save settings to .env file
function saveSettings() {
  // Update .env content with new settings
  let newEnvContent = envContent
    .replace(/DB_USER=.*/, `DB_USER=${dbSettings.user}`)
    .replace(/DB_PASSWORD=.*/, `DB_PASSWORD="${dbSettings.password}"`)
    .replace(/DB_HOST=.*/, `DB_HOST=${dbSettings.host}`)
    .replace(/DB_PORT=.*/, `DB_PORT=${dbSettings.port}`)
    .replace(/DB_NAME=.*/, `DB_NAME=${dbSettings.database}`);
  
  // Write updated content to .env file
  try {
    fs.writeFileSync(envPath, newEnvContent);
    console.log('\nSettings saved to .env file successfully!');
    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('Error saving settings to .env file:', error);
    rl.close();
    process.exit(1);
  }
}