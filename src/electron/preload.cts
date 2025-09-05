const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
    hey: () => console.log("hey"),
});