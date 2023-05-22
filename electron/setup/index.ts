import getOSType from '@/lib/utils/getOSType';
import { OSType } from '@/modules/OS/Core';
import { app, BrowserWindow } from 'electron';
import { release } from 'node:os';
import { join } from 'node:path';
import createWindow, { clearMainWindow, getMainWindow } from './createWindow';
import { ipcRegister } from './ipc';

process.env.DIST_ELECTRON = join(__dirname, '../');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? join(process.env.DIST_ELECTRON, '../public') : process.env.DIST;

export default async function setup() {
  const osType = getOSType();
  if (release().startsWith('6.1')) app.disableHardwareAcceleration();
  if (osType === OSType.Windows) app.setAppUserModelId(app.getName());
  if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
  }

  await app.whenReady();

  await createWindow();

  let win = getMainWindow();

  if (win) ipcRegister(win);

  app.on('window-all-closed', () => {
    clearMainWindow();
    if (osType !== OSType.Mac) app.quit();
  });

  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  app.on('activate', async () => {
    const allWindows = BrowserWindow.getAllWindows();
    if (allWindows.length) {
      allWindows[0].focus();
    } else {
      await createWindow();
      win = getMainWindow();
      if (win) ipcRegister(win);
    }
  });
}
