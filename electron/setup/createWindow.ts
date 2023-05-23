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
    icon: join(process.env.PUBLIC, 'favicon.ico'),
    minHeight: 600,
    minWidth: 800,
    maxWidth: 1140,
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#4a5358',
      symbolColor: '#fff',
      height: 28,
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
