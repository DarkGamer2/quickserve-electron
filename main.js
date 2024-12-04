const { app, BrowserWindow, Notification, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
    autoHideMenuBar: true, // Hide the menu bar by default
  });

  mainWindow.setMenuBarVisibility(false); // Completely remove the menu bar

  mainWindow.loadURL('http://localhost:1420'); // Adjust the URL to your React app
};

app.setName('QuickServe');

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('job-expiry-warning', (event, { jobName, days }) => {
  const notification = new Notification({
    title: 'QuickServe',
    body: `Warning: ${jobName} is about to expire in ${days} days.`,
  });
  notification.show();
});