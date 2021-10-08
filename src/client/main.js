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
            preload: path_1["default"].join(__dirname, 'preload.js'),
            sandbox: true
        }
    });
    // and load the index.html of the app.
    if (process.env.NODE_ENV === 'production') {
        mainWindow.loadFile('dist/index.html');
    }
    else {
        mainWindow.loadURL('http://localhost:3000');
    }
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
electron_1.app.whenReady().then(function () {
    createWindow();
    electron_1.app.on('activate', function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
