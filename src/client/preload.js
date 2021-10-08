"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('darkMode', {
    toggle: function () { return electron_1.ipcRenderer.invoke('dark-mode:toggle'); },
    system: function () { return electron_1.ipcRenderer.invoke('dark-mode:system'); }
});
