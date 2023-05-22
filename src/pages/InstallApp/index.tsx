import { FC, useEffect, useMemo, useRef, useState } from 'react';
import * as SC from './styles';
import Typewriter from '@/components/Typewriter';

interface InstallAppProps {}

const InstallApp: FC<InstallAppProps> = () => {
  const [message, setMessage] = useState('欢迎使用 FE 自动配置工具');
  const [del, setDel] = useState(false);
  const isCompleted = useRef(false);

  useEffect(() => {
    console.log('useEffect', isCompleted.current);
  }, [isCompleted]);

  return (
    <SC.InstallAppContainer>
      <SC.Message>
        <Typewriter
          message={message}
          del={del}
          onStart={() => {
            isCompleted.current = false;
          }}
          onCompleted={() => {
            isCompleted.current = true;
          }}
        />
      </SC.Message>
    </SC.InstallAppContainer>
  );
};

export default InstallApp;
