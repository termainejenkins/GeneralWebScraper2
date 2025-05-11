// src/main.js

// Import necessary modules
import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import process from 'process';

// Check if the app is running in development mode
const isDev = isDevelopment();

console.log('isDev:', isDev); // Log the development mode status

let mainWindow; // Declare a variable to hold the reference to the main application window

// Function to create the main application window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800, // Set the width of the window
    height: 600, // Set the height of the window
    webPreferences: {
      nodeIntegration: true, // Enable Node.js integration in the renderer process
      devTools: true, // Enable DevTools and context menu
    },
  });

  if (isDev) {
    // Load the React app from the development server if in development mode
    mainWindow.loadURL('http://localhost:5173/');
  } else {
    // Load the React app from the local file if in production mode
    mainWindow.loadFile('../dist/index.html');
  }
}

// Function to check if the app is running in development mode
function isDevelopment() {
  return process.env.NODE_ENV !== 'production';
}

// Event listener for when the Electron app is ready
app.on('ready', createWindow);

// Event listener for when all windows are closed
app.on('window-all-closed', function () {
  // Quit the app if not on macOS (where apps typically stay open until the user explicitly quits)
  if (typeof process !== 'undefined' && process.platform !== 'darwin') app.quit();
});

// Event listener for when the app is activated (common behavior on macOS)
app.on('activate', function () {
  // Recreate the window if the app is activated and there is no window open
  if (mainWindow === null) createWindow();
});