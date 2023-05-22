import { OSType } from '@/modules/OS/Core';
import { platform } from 'node:os';

export default function getOSType(): OSType {
  const osType = platform();
  if (osType.includes('darwin')) return OSType.Mac;
  if (osType.includes('win')) return OSType.Windows;
  if (osType.includes('linux')) return OSType.Linux;
  return OSType.Unknown;
}
