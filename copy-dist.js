const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'frontend', 'dist');
const destination = path.join(__dirname, 'dist');

try {
  // Copy the compiled frontend assets to the root dist folder
  fs.cpSync(source, destination, { recursive: true });
  console.log('Successfully copied frontend/dist to root dist folder.');
} catch (err) {
  console.error('Failed to copy files:', err);
  process.exit(1);
}
