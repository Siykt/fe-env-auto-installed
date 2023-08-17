import { ipcRenderer } from 'electron';
import { IPCChannel } from '@/modules/IPCEvent/Core';
import type { Progress } from 'electron-dl';
import { onUniqueIPCChannel } from './ipcHelper';

export async function downloadFileUseIPC(url: string, onProgress?: (progress: Progress) => void): Promise<string> {
  const [uid, cannel] = onUniqueIPCChannel(IPCChannel.DownloadFileProgress, (_, progress: Progress) =>
    onProgress?.(progress)
  );
  const path = await ipcRenderer.invoke(IPCChannel.DownloadFile, uid, url);
  cannel();
  return path;
}
