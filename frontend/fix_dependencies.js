const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting frontend dependency fix...');

// Path to package.json
const packageJsonPath = path.join(__dirname, 'package.json');

// Read the current package.json
let packageJson;
try {
  packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  console.log('Successfully read package.json');
} catch (error) {
  console.error('Error reading package.json:', error);
  process.exit(1);
}

// Ensure all required dependencies are present
const requiredDependencies = {
  '@mui/x-date-pickers': '^6.4.0',
  'date-fns': '^2.30.0',
};

let dependenciesChanged = false;

// Update dependencies if needed
Object.entries(requiredDependencies).forEach(([pkg, version]) => {
  if (!packageJson.dependencies[pkg] || packageJson.dependencies[pkg] !== version) {
    console.log(`Adding/updating ${pkg}@${version}`);
    packageJson.dependencies[pkg] = version;
    dependenciesChanged = true;
  }
});

// Write the updated package.json if changes were made
if (dependenciesChanged) {
  try {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('Updated package.json with required dependencies');
  } catch (error) {
    console.error('Error writing package.json:', error);
    process.exit(1);
  }
}

// Create a custom DatePicker component that works with the current setup
const datePickerComponentPath = path.join(__dirname, 'src', 'components', 'DatePickerWrapper.js');
const datePickerContent = `import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';

/**
 * A wrapper component for MUI DatePicker that handles the LocalizationProvider
 * This simplifies usage across the application
 */
const DatePickerWrapper = ({ value, onChange, label, ...props }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        slotProps={{ textField: { fullWidth: true, ...props } }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerWrapper;
`;

// Create the components directory if it doesn't exist
const componentsDir = path.join(__dirname, 'src', 'components');
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
  console.log('Created components directory');
}

// Write the DatePickerWrapper component
try {
  fs.writeFileSync(datePickerComponentPath, datePickerContent);
  console.log('Created DatePickerWrapper component');
} catch (error) {
  console.error('Error creating DatePickerWrapper component:', error);
}

// Update PaymentManager.js to use the wrapper component
const paymentManagerPath = path.join(__dirname, 'src', 'pages', 'PaymentManager.js');
if (fs.existsSync(paymentManagerPath)) {
  try {
    let paymentManagerContent = fs.readFileSync(paymentManagerPath, 'utf8');
    
    // Replace imports
    paymentManagerContent = paymentManagerContent.replace(
      /import \{ DatePicker \} from '@mui\/x-date-pickers\/DatePicker';\nimport \{ AdapterDateFns \} from '@mui\/x-date-pickers\/AdapterDateFns';\nimport \{ LocalizationProvider \} from '@mui\/x-date-pickers\/LocalizationProvider';/g,
      "import DatePickerWrapper from '../components/DatePickerWrapper';"
    );
    
    // Replace LocalizationProvider usage
    paymentManagerContent = paymentManagerContent.replace(
      /<LocalizationProvider dateAdapter={AdapterDateFns}>/g,
      '<>'
    );
    
    paymentManagerContent = paymentManagerContent.replace(
      /<\/LocalizationProvider>/g,
      '</>'
    );
    
    // Replace DatePicker usage
    paymentManagerContent = paymentManagerContent.replace(
      /<DatePicker\s+label="([^"]+)"\s+value={([^}]+)}\s+onChange={\([^)]+\) => ([^}]+)}\s+renderInput={\([^)]+\) => <TextField [^>]+\/>\s*}/g,
      '<DatePickerWrapper label="$1" value={$2} onChange={(newDate) => $3} />'
    );
    
    fs.writeFileSync(paymentManagerPath, paymentManagerContent);
    console.log('Updated PaymentManager.js');
  } catch (error) {
    console.error('Error updating PaymentManager.js:', error);
  }
}

// Update ZoneManager.js to use the wrapper component
const zoneManagerPath = path.join(__dirname, 'src', 'pages', 'ZoneManager.js');
if (fs.existsSync(zoneManagerPath)) {
  try {
    let zoneManagerContent = fs.readFileSync(zoneManagerPath, 'utf8');
    
    // Replace imports
    zoneManagerContent = zoneManagerContent.replace(
      /import \{ DatePicker \} from '@mui\/x-date-pickers\/DatePicker';\nimport \{ AdapterDateFns \} from '@mui\/x-date-pickers\/AdapterDateFns';\nimport \{ LocalizationProvider \} from '@mui\/x-date-pickers\/LocalizationProvider';/g,
      "import DatePickerWrapper from '../components/DatePickerWrapper';"
    );
    
    // Replace LocalizationProvider usage
    zoneManagerContent = zoneManagerContent.replace(
      /<LocalizationProvider dateAdapter={AdapterDateFns}>/g,
      '<>'
    );
    
    zoneManagerContent = zoneManagerContent.replace(
      /<\/LocalizationProvider>/g,
      '</>'
    );
    
    // Replace DatePicker usage
    zoneManagerContent = zoneManagerContent.replace(
      /<DatePicker\s+label="([^"]+)"\s+value={([^}]+)}\s+onChange={\([^)]+\) => ([^}]+)}\s+renderInput={\([^)]+\) => <TextField [^>]+\/>\s*}/g,
      '<DatePickerWrapper label="$1" value={$2} onChange={(newDate) => $3} />'
    );
    
    fs.writeFileSync(zoneManagerPath, zoneManagerContent);
    console.log('Updated ZoneManager.js');
  } catch (error) {
    console.error('Error updating ZoneManager.js:', error);
  }
}

console.log('Frontend dependency fix completed!');
console.log('Now run "npm install" to install the dependencies, then "npm run start_custom" to start the application.');