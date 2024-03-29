import type { IPCChannel } from '@/modules/IPCEvent/Core';
import { ipcRenderer } from 'electron';

export function getUniqueIPCChannel(channel: IPCChannel, uid: string) {
  return `${channel}-${uid}`;
}

export async function onUniqueIPCChannel(channel: IPCChannel, callback: Parameters<typeof ipcRenderer.on>[1]) {
  const { nanoid } = await import('nanoid');
  const uid = nanoid();
  const uniqueIChannel = getUniqueIPCChannel(channel, uid);
  ipcRenderer.on(uniqueIChannel, callback);
  const cancel = () => ipcRenderer.removeAllListeners(uniqueIChannel);
  return [uid, cancel] as const;
}
