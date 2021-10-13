import {
  app,
  BrowserWindow,
  ipcMain,
  nativeTheme,
  Menu,
  // MenuItem,
  // globalShortcut,
} from 'electron';
import path from 'path';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  // and load the index.html of the app.
  if (process.env.NODE_ENV === 'production') {
    mainWindow.loadFile('dist/index.html');
  } else {
    mainWindow.loadURL('http://localhost:3000');
  }
  // Keyboard Shortcuts
  // const menu = new Menu();
  // menu.append(
  //   new MenuItem({
  //     label: 'Electron',
  //     submenu: [
  //       {
  //         role: 'help',
  //         accelerator:
  //           process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
  //         click: () => {
  //           console.log('Electron rocks!');
  //         },
  //       },
  //     ],
  //   })
  // );

  // Menu.setApplicationMenu(menu);

  // Dark mode Test
  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light';
    } else {
      nativeTheme.themeSource = 'dark';
    }
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system';
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// app
//   .whenReady()
//   .then(() => {
//     globalShortcut.register('Alt+CommandOrControl+I', () => {
//       console.log('Electron loves global shortcuts!');
//     });
//   })
//   .then(() => {
//     createWindow();
//   });

const dockMenu = Menu.buildFromTemplate([
  {
    label: 'New Window with Settings',
    click() {
      console.log('New Window');
    },
  },
  {
    label: 'New Window with Settings',
    submenu: [
      {
        label: 'Basic',
      },
      {
        label: 'Pro',
      },
    ],
  },
  {
    label: 'New Command...',
  },
]);
app.whenReady().then(() => {
  createWindow();
  if (process.platform === 'darwin') {
    app.dock.setMenu(dockMenu);
  }
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// app.on('activate', function () {
//   if (BrowserWindow.getAllWindows().length === 0) createWindow();
// });
