import { ipcExec } from '@/lib/utils/command';
import { downloadFileUseIPC } from '@/lib/utils/downloadFile';
import { OS_TYPE } from '@/lib/utils/getOSType';
import { OSType } from '@/modules/OS/Core';
import type { Progress } from 'electron-dl';

/**
 * 下载 VSCode
 */
export const downloadVSCode = async (onProgress?: (progress: Progress) => void) => {
  let baseDownloadUrl = 'https://code.visualstudio.com/sha/download?build=stable&os=';
  switch (OS_TYPE) {
    case OSType.Windows:
      baseDownloadUrl += 'win32-x64-user';
      break;
    case OSType.Mac:
      baseDownloadUrl += 'darwin-universal';
      break;
    case OSType.Linux:
      baseDownloadUrl += 'linux-x64';
      break;
    default:
      throw new Error('操作系统环境不支持');
  }
  return await downloadFileUseIPC(baseDownloadUrl, onProgress);
};

// TODO 可以考虑通过抓取GIT官网的版本号来实现自动更新
const GIT_VERSION = '2.40.1'; // Git Version 2.40.1 By 2023-04-25

/**
 * 下载 Git
 * @see https://git-scm.com/download/win
 */
export const downloadGit = async (onProgress?: (progress: Progress) => void) => {
  const WIN_URL = `https://github.com/git-for-windows/git/releases/download/v${GIT_VERSION}.windows.1/Git-${GIT_VERSION}-64-bit.exe`;
  switch (OS_TYPE) {
    case OSType.Windows:
      return await downloadFileUseIPC(WIN_URL, onProgress);
    case OSType.Mac:
      return await ipcExec('brew install git');
    case OSType.Linux:
      return await ipcExec('sudo apt-get install git');
    default:
      throw new Error('操作系统环境不支持');
  }
};

const NODEJS_VERSION = '16.20.0';

/**
 * 安装 Nodejs
 * @see https://nodejs.org/en/download/
 */
export const downloadNodejs = async (onProgress?: (progress: Progress) => void) => {
  let baseDownloadUrl = 'https://nodejs.org/dist';
  switch (OS_TYPE) {
    case OSType.Windows:
      baseDownloadUrl += `/v${NODEJS_VERSION}/node-v${NODEJS_VERSION}-x64.msi`;
      break;
    case OSType.Mac:
      baseDownloadUrl += `/v${NODEJS_VERSION}/node-v${NODEJS_VERSION}-darwin-x64.tar.gz`;
      break;
    case OSType.Linux:
      baseDownloadUrl += `/v${NODEJS_VERSION}/node-v${NODEJS_VERSION}-linux-x64.tar.gz`;
      break;
    default:
      throw new Error('操作系统环境不支持');
  }
  return await downloadFileUseIPC(baseDownloadUrl, onProgress);
};

/**
 * 检查命令是否存在
 * @param command 命令
 */
export const checkCommand = async (command: string) => {
  switch (OS_TYPE) {
    case OSType.Windows:
      return await ipcExec(`where ${command}`);
    case OSType.Mac:
      return await ipcExec(`which ${command}`);
    case OSType.Linux:
      return await ipcExec(`which ${command}`);
    default:
      throw new Error('操作系统环境不支持');
  }
};
