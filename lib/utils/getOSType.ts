import { OSType } from '@/modules/OS/Core';
import { platform } from 'node:os';

export default function getOSType(): OSType {
  const osType = platform();
  if (osType.includes('darwin')) return OSType.Mac;
  if (osType.includes('win')) return OSType.Windows;
  if (osType.includes('linux')) return OSType.Linux;
  return OSType.Unknown;
}

export const OS_TYPE = getOSType();
export const isWindows = () => OS_TYPE === OSType.Windows;
export const isMac = () => OS_TYPE === OSType.Mac;
export const isLinux = () => OS_TYPE === OSType.Linux;
