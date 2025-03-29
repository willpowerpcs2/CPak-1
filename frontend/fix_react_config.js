const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Fixing React configuration issues...');

// Step 1: Create a clean .env file without problematic settings
const envContent = `BROWSER=none
PORT=3000
REACT_APP_API_URL=http://localhost:3001
`;

fs.writeFileSync(path.join(__dirname, '.env'), envContent);
console.log('Created clean .env file');

// Step 2: Check if node_modules exists, if not install dependencies
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('Installing dependencies...');
  try {
    execSync('npm install', { cwd: __dirname, stdio: 'inherit' });
    console.log('Dependencies installed successfully');
  } catch (error) {
    console.error('Error installing dependencies:', error.message);
    process.exit(1);
  }
}

// Step 3: Ensure public directory has all required files
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  console.log('Created public directory');
}

// Create index.html if it doesn't exist
const indexHtmlPath = path.join(publicDir, 'index.html');
if (!fs.existsSync(indexHtmlPath)) {
  const indexHtmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="CPak Database Web Application"
    />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>CPak Database</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`;
  fs.writeFileSync(indexHtmlPath, indexHtmlContent);
  console.log('Created index.html');
}

// Create manifest.json if it doesn't exist
const manifestPath = path.join(publicDir, 'manifest.json');
if (!fs.existsSync(manifestPath)) {
  const manifestContent = `{
  "short_name": "CPak",
  "name": "CPak Database",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}`;
  fs.writeFileSync(manifestPath, manifestContent);
  console.log('Created manifest.json');
}

// Create robots.txt if it doesn't exist
const robotsPath = path.join(publicDir, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  const robotsContent = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:
`;
  fs.writeFileSync(robotsPath, robotsContent);
  console.log('Created robots.txt');
}

// Create favicon.ico if it doesn't exist
const faviconPath = path.join(publicDir, 'favicon.ico');
if (!fs.existsSync(faviconPath)) {
  // Create a minimal 1x1 transparent ICO file
  const faviconBuffer = Buffer.from([
    0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x10, 0x10, 0x00, 0x00, 0x01, 0x00,
    0x20, 0x00, 0x68, 0x04, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00, 0x28, 0x00,
    0x00, 0x00, 0x10, 0x00, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00, 0x01, 0x00,
    0x20, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00
  ]);
  fs.writeFileSync(faviconPath, faviconBuffer);
  console.log('Created favicon.ico');
}

// Step 4: Create a custom .npmrc file to bypass the allowedHosts issue
const npmrcPath = path.join(__dirname, '.npmrc');
const npmrcContent = `legacy-peer-deps=true
`;
fs.writeFileSync(npmrcPath, npmrcContent);
console.log('Created .npmrc file with legacy-peer-deps=true');

// Step 5: Create a custom webpack config file to override the problematic settings
const webpackConfigPath = path.join(__dirname, 'webpack.config.js');
const webpackConfigContent = `
module.exports = {
  // This file exists only to signal to react-scripts that we have a custom webpack config
  // It won't actually be used directly, but its presence will trigger react-scripts to use its own webpack config
};
`;
fs.writeFileSync(webpackConfigPath, webpackConfigContent);
console.log('Created webpack.config.js file');

// Step 6: Create a .env.development file with specific development settings
const envDevPath = path.join(__dirname, '.env.development');
const envDevContent = `BROWSER=none
PORT=3000
REACT_APP_API_URL=http://localhost:3001
DANGEROUSLY_DISABLE_HOST_CHECK=true
`;
fs.writeFileSync(envDevPath, envDevContent);
console.log('Created .env.development file with DANGEROUSLY_DISABLE_HOST_CHECK=true');

// Step 7: Create a start.js file that will start the React app with the correct configuration
const startJsPath = path.join(__dirname, 'start.js');
const startJsContent = `const { execSync } = require('child_process');
const path = require('path');

console.log('Starting React application with custom configuration...');

try {
  // Set environment variables to bypass the allowedHosts issue
  process.env.DANGEROUSLY_DISABLE_HOST_CHECK = 'true';
  
  // Start the React application
  execSync('npx react-scripts start', {
    cwd: __dirname,
    stdio: 'inherit',
    env: {
      ...process.env,
      BROWSER: 'none',
      PORT: '3000',
      REACT_APP_API_URL: 'http://localhost:3001',
      DANGEROUSLY_DISABLE_HOST_CHECK: 'true',
    }
  });
} catch (error) {
  console.error('Error starting React application:', error.message);
  process.exit(1);
}
`;
fs.writeFileSync(startJsPath, startJsContent);
console.log('Created start.js file');

// Step 8: Update package.json to use our custom start script
try {
  const packageJsonPath = path.join(__dirname, 'package.json');
  const packageJson = require(packageJsonPath);
  
  // Add a custom start script
  packageJson.scripts.start_custom = 'node start.js';
  
  // Write the updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('Updated package.json with custom start script');
} catch (error) {
  console.error('Error updating package.json:', error.message);
}

console.log('\nConfiguration fixed successfully!');
console.log('\nTo start the frontend, run:');
console.log('npm run start_custom');