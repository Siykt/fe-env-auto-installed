import { IPCEvent } from '@/modules/IPCEvent/Core';
import { BrowserWindow, ipcMain, shell } from 'electron';
import { download } from 'electron-dl';
import { join } from 'node:path';

export function ipcRegister(win: BrowserWindow) {
  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('main-process-message', new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) shell.openExternal(url);
    return { action: 'deny' };
  });

  // 下载文件
  ipcMain.on(IPCEvent.DownloadFile, async (_event, url: string) => {
    try {
      if (!win) throw new Error('[IPCMainError] Window is not ready');
      await download(win, url, {
        directory: join(__dirname, '/download'),
        onProgress: (progress) => win.webContents.send(IPCEvent.DownloadFileProgress, progress),
        onCompleted: (item) => win.webContents.send(IPCEvent.DownloadFileComplete, item.path),
      });
    } catch (error) {
      console.error(error);
      win?.webContents.send(IPCEvent.DownloadFileError, error);
    }
  });
}
