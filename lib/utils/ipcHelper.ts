import type { IPCChannel } from '@/modules/IPCEvent/Core';
import { ipcRenderer } from 'electron';
import { nanoid } from 'nanoid';

export function getUniqueIPCChannel(channel: IPCChannel, uid: string) {
  return `${channel}-${uid}`;
}

export function onUniqueIPCChannel(
  channel: IPCChannel,
  callback: Parameters<typeof ipcRenderer.on>[1]
): readonly [string, () => void] {
  const uid = nanoid();
  const uniqueIChannel = getUniqueIPCChannel(channel, uid);
  ipcRenderer.on(uniqueIChannel, callback);
  const cancel = () => ipcRenderer.removeAllListeners(uniqueIChannel);
  return [uid, cancel] as const;
}
