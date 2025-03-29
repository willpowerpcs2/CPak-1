const fs = require('fs');
const path = require('path');

console.log('Fixing webpack allowedHosts configuration...');

// Create a simplified .env file without problematic settings
const envContent = `BROWSER=none
PORT=3000
REACT_APP_API_URL=http://localhost:3001
`;

fs.writeFileSync(path.join(__dirname, '.env'), envContent);
console.log('Created simplified .env file without problematic settings');

// Check if public directory exists and has all required files
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  console.log('Created public directory');
}

// Check if index.html exists
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

// Check if manifest.json exists
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

// Check if robots.txt exists
const robotsPath = path.join(publicDir, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  const robotsContent = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:
`;
  fs.writeFileSync(robotsPath, robotsContent);
  console.log('Created robots.txt');
}

// Create a simple favicon.ico if it doesn't exist
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

console.log('Frontend configuration fixed successfully!');
console.log('You can now start the frontend with: npm start');