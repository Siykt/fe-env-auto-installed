import { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import * as SC from './styles';
import Typewriter, { type TypewriterClass } from 'typewriter-effect';
import getOSType from '@/lib/utils/getOSType';
import downloadFile from '@/lib/utils/downloadFile';
import { OSType } from '@/modules/OS/Core';
import { isDevMode } from '@/lib/utils/env';

interface InstallAppProps {}

const downloadVSCode = async () => {
  const osType = getOSType();
  let baseDownloadUrl = 'https://code.visualstudio.com/sha/download?build=stable&os=';
  switch (osType) {
    case OSType.Windows:
      baseDownloadUrl += 'win32-x64-user';
      break;
    case OSType.Mac:
      baseDownloadUrl += 'darwin-universal';
      break;
    case OSType.Linux:
      baseDownloadUrl += 'linux-x64';
      break;
  }
  const vscodePath = await downloadFile(baseDownloadUrl, (progress) => {
    if (isDevMode()) {
      console.log('[DownloadProgress]', progress);
    }
  });
  return vscodePath;
};

const DEFAULT_MESSAGES = ['欢迎使用 FE 自动配置工具', '检查配置文件...'];

const InstallApp: FC<InstallAppProps> = () => {
  const typewriterRef = useRef<TypewriterClass>();

  useEffect(() => {
    setTimeout(async () => {
      const typewriter = typewriterRef.current;
      if (!typewriter) return;
      const osType = getOSType();
      typewriter.typeString(`平台：${getOSType()}`).pauseFor(1000).deleteAll();

      typewriter
        .typeString('开始下载VSCode...')
        .pauseFor(1000)
        .callFunction(async () => {
          typewriter
            .deleteAll()
            .typeString(`下载完成, VSCode地址为：${await downloadVSCode()}`)
            .pauseFor(1000)
            .deleteAll();
          typewriter.typeString('开始下载Node.js...').pauseFor(1000);
        });
    }, 100);
  }, []);

  return (
    <SC.InstallAppContainer>
      <SC.Message>
        <Typewriter
          options={{
            strings: DEFAULT_MESSAGES,
            autoStart: true,
          }}
          onInit={(typewriter) => {
            typewriterRef.current = typewriter;
          }}
        />
      </SC.Message>
    </SC.InstallAppContainer>
  );
};

export default InstallApp;
