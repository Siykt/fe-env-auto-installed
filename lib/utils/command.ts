import { IPCEvent } from '@/modules/IPCEvent/Core';

export async function exec(command: string) {
  // 避免渲染进程尝试执行命令
  const childProcess = await import('node:child_process');
  return new Promise<string>((resolve, reject) =>
    childProcess.exec(command, (err, stdout) => {
      if (err) reject(err);
      else resolve(stdout);
    })
  );
}

export async function ipcExec(command: string) {
  const { ipcRenderer } = await import('electron');
  return new Promise<string>((resolve, reject) => {
    ipcRenderer.send(IPCEvent.Exec, command);
    ipcRenderer.on(IPCEvent.ExecReply, (_event, stdout) => resolve(stdout));
    ipcRenderer.on(IPCEvent.ExecError, (_event, error) => reject(error));
  });
}
