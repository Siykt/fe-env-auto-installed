import { isDevMode } from '@/lib/utils/env';
import { BrowserWindow } from 'electron';
import { join } from 'node:path';
import { update } from './update';

let win: BrowserWindow | null = null;

export default async function createWindow() {
  const preload = join(__dirname, '../preload/index.js');
  const url = process.env.VITE_DEV_SERVER_URL;
  const indexHtml = join(process.env.DIST, 'index.html');

  win = new BrowserWindow({
    title: 'Main window',
    icon: join(process.env.PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (url) {
    win.loadURL(url);
    isDevMode() && win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }

  update(win);
}

export function getMainWindow() {
  return win;
}

export function clearMainWindow() {
  win = null;
}
