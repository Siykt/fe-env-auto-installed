import { ipcRenderer } from 'electron';
import { IPCEvent } from '@/modules/IPCEvent/Core';
import type { Progress } from 'electron-dl';

export default function downloadFile(url: string, onProgress?: (progress: Progress) => void) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send(IPCEvent.DownloadFile, url);
    ipcRenderer.on(IPCEvent.DownloadFileComplete, (_event, data) => resolve(data));
    ipcRenderer.on(IPCEvent.DownloadFileError, (_event, error) => reject(error));
    ipcRenderer.on(IPCEvent.DownloadFileProgress, (_event, progress) => onProgress?.(progress));
  });
}
