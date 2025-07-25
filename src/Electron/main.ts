import { app, BrowserWindow, Tray } from "electron";
import { ipcMainHandle, isDev } from "./utils.js";
import { pollResources, getStaticData } from "./resourceManager.js";
import { getAssetPath, getPreloadPath, getUIPath } from "./pathResolver.js";
import path from "path";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  pollResources(mainWindow);

  ipcMainHandle("getStaticData", () => {
    return getStaticData();
  });

  new Tray(
    path.join(
      getAssetPath(),
      // Windows process.platform === "win32"
      process.platform === "darwin" ? "trayIcon.png" : "trayIcon.png"
    )
  );

  mainWindow.on("close", (e) => {
    e.preventDefault();
  });
});
