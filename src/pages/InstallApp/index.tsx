import { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import * as SC from './styles';
import Typewriter, { type TypewriterClass } from 'typewriter-effect';

interface InstallAppProps {}

const DEFAULT_MESSAGES = ['欢迎使用 FE 自动配置工具'];

const InstallApp: FC<InstallAppProps> = () => {
  const typewriterRef = useRef<TypewriterClass>();

  useEffect(() => {
    setTimeout(async () => {
      const typewriter = typewriterRef.current;
      if (!typewriter) return;
      typewriter.typeString('作者：<a href="https://github.com/Siykt">Siykt</a>');
    }, 60);
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
