import { OSType } from '@/modules/OS/Core';
import getOSType from './getOSType';
import { exec } from './command';

const env = process.env || import.meta.env;

/**
 * Get environment variables
 */
export function getEnv() {
  return env.NODE_ENV;
}

/**
 * Is it a development mode
 */
export function isDevMode(): boolean {
  return getEnv() === 'development';
}

/**
 * Is it a production mode
 */
export function isProdMode(): boolean {
  return getEnv() === 'production';
}

/**
 * 持久化存储环境变量
 * @param key key
 * @param value value
 */
export async function setEnv(key: string, value: string | number) {
  const osType = getOSType();
  let command = '';
  switch (osType) {
    case OSType.Windows:
      command = `setx ${key} ${value}`;
      break;
    case OSType.Mac:
    case OSType.Linux:
      command = `echo "export ${key}=${value}" >> ~/.zshrc && source ~/.zshrc`;
      break;
    default:
      // 移交微任务队列处理, 避免主进程down掉
      return Promise.reject('Failed to set environment variable.');
  }

  return exec(command);
}
