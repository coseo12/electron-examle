"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var electron_1 = require("electron");
var path_1 = __importDefault(require("path"));
function createWindow() {
    var mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path_1["default"].join(__dirname, 'preload.js')
        }
    });
    // and load the index.html of the app.
    if (process.env.NODE_ENV === 'production') {
        mainWindow.loadFile('dist/index.html');
    }
    else {
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
    electron_1.ipcMain.handle('dark-mode:toggle', function () {
        if (electron_1.nativeTheme.shouldUseDarkColors) {
            electron_1.nativeTheme.themeSource = 'light';
        }
        else {
            electron_1.nativeTheme.themeSource = 'dark';
        }
        return electron_1.nativeTheme.shouldUseDarkColors;
    });
    electron_1.ipcMain.handle('dark-mode:system', function () {
        electron_1.nativeTheme.themeSource = 'system';
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
var dockMenu = electron_1.Menu.buildFromTemplate([
    {
        label: 'New Window with Settings',
        click: function () {
            console.log('New Window');
        }
    },
    {
        label: 'New Window with Settings',
        submenu: [
            {
                label: 'Basic'
            },
            {
                label: 'Pro'
            },
        ]
    },
    {
        label: 'New Command...'
    },
]);
electron_1.app.whenReady().then(function () {
    createWindow();
    if (process.platform === 'darwin') {
        electron_1.app.dock.setMenu(dockMenu);
    }
    electron_1.app.on('activate', function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
// app.on('activate', function () {
//   if (BrowserWindow.getAllWindows().length === 0) createWindow();
// });
