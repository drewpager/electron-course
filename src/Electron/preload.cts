const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback) => {
    ipcRenderer.on("statistics", (_: any, stats: Statistics) => {
      callback(stats);
    });
  },
  getStaticData: () => ipcRenderer.invoke("getStaticData"),
} satisfies Window["electron"]);
