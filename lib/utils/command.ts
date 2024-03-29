import { IPCChannel } from '@/modules/IPCEvent/Core';
import { isWindows } from './getOSType';

export async function exec(command: string) {
  // 避免渲染进程尝试执行命令
  const childProcess = await import('node:child_process');
  return new Promise<string>((resolve, reject) =>
    // chcp 65001: 解决 Windows 下乱码问题
    childProcess.exec(`${isWindows() ? 'chcp 65001&&' : ''}${command}`, (err, stdout) => {
      if (err) reject(err);
      else resolve(stdout);
    })
  );
}

export async function ipcExec(command: string) {
  const { ipcRenderer } = await import('electron');
  const stdout = await ipcRenderer.invoke(IPCChannel.Exec, command);
  return stdout.replace('Active code page: 65001', '').trim();
}
