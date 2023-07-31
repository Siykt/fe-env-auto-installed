import { FC, useEffect, useState } from 'react';
import * as SC from './styles';
import { checkCommand } from '../helper';

interface StepsProps {}

const CheckEnv: FC<StepsProps> = () => {
  const [messages, setMessages] = useState<string[]>([]);

  // 环境检查
  async function check() {
    setMessages(['Git 环境:']);
    const git = await checkCommand('git');
    setMessages((messages) => [...messages, git, 'Node 环境:']);
    const node = await checkCommand('node');
    setMessages((messages) => [...messages, node, 'VSCode 环境:']);
    const code = await checkCommand('code');
    setMessages((messages) => [...messages, code]);
    const test = await checkCommand('tx');
    setMessages((messages) => [...messages, 'tx:', test]);
  }

  // Step 3
  useEffect(() => {
    check();
  }, []);

  return (
    <SC.StepsContainer>
      {messages.map((message, index) => (
        <SC.Message key={index}>{message}</SC.Message>
      ))}
    </SC.StepsContainer>
  );
};

export default CheckEnv;
