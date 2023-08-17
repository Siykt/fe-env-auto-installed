import { exec } from '@/lib/utils/command';
import { getUniqueIPCChannel } from '@/lib/utils/ipcHelper';
import { IPCChannel } from '@/modules/IPCEvent/Core';
import { BrowserWindow, ipcMain } from 'electron';
import { download } from 'electron-dl';
import { join } from 'node:path';

export function registerIPCHandle(win: BrowserWindow) {
  // 下载文件
  ipcMain.handle(IPCChannel.DownloadFile, async (_event, uid: string, url: string) => {
    try {
      const { savePath } = await download(win, url, {
        directory: join(__dirname, '/download'),
        onProgress: (progress) =>
          // 通过唯一的IPCChannel来发送进度
          win.webContents.send(getUniqueIPCChannel(IPCChannel.DownloadFileProgress, uid), progress),
      });
      return savePath;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  // 执行命令
  ipcMain.handle(IPCChannel.Exec, (_event, command: string, args: string[]) => {
    try {
      return exec(command);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
}
