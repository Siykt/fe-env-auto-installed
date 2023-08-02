import { FC, useCallback, useEffect, useRef, useState } from 'react';
import * as SC from './styles';
import { checkCommand } from '../helper';
import InstallAPPStore from '../store';
import { AppMap } from '../types';
import { isWindows } from '@/lib/utils/getOSType';
import { ipcExec } from '@/lib/utils/command';

interface StepsProps {}

const CheckEnv: FC<StepsProps> = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const stepsContainerRef = useRef<HTMLDivElement | null>(null);

  const addMessages = useCallback((messages: string[]) => {
    setMessages((old) => [...old, ...messages]);
    requestAnimationFrame(() => {
      if (!stepsContainerRef.current) return;
      stepsContainerRef.current.scrollTo({
        top: 99999,
        behavior: 'smooth',
      });
    });
  }, []);

  const checkApp = useCallback(async (envName: AppMap) => {
    return await checkCommand(envName).catch(() => {
      InstallAPPStore.addDownload(envName);
      return 'Not Find.';
    });
  }, []);

  const checkZshEnv = useCallback(async (envName: AppMap) => {
    return await ipcExec(`zsh -c "echo \\"$ZSH/oh-my-zsh.sh\\""`).catch(() => {
      InstallAPPStore.addDownload(envName);
      return 'Not Find.';
    });
  }, []);

  // 环境检查
  const check = useCallback(async () => {
    setMessages(['Git 环境:']);
    const git = await checkApp(AppMap.Git);
    addMessages([git, 'Node 环境:']);
    const node = await checkApp(AppMap.Nodejs);
    addMessages([node, 'VSCode 环境:']);
    const code = await checkApp(AppMap.VSCode);
    addMessages([code, 'Pnpm 环境:']);
    const pnpm = await checkApp(AppMap.Pnpm);
    addMessages([pnpm, 'Zsh 环境:']);
    const zsh = await checkApp(AppMap.Zsh);
    addMessages([zsh, 'OhMyZsh 环境:']);
    const omz = await checkZshEnv(AppMap.OhMyZsh);
    addMessages([omz]);
    setTimeout(() => InstallAPPStore.nextStep(), 1000);
  }, [addMessages, checkApp, checkZshEnv]);

  // Step 3
  useEffect(() => {
    check();
  }, [check]);

  return (
    <SC.StepsContainer ref={stepsContainerRef}>
      {messages.map((message, index) => (
        <SC.Message key={index}>{message}</SC.Message>
      ))}
    </SC.StepsContainer>
  );
};

export default CheckEnv;
