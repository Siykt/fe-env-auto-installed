import { AnimatePresence, useAnimate, type Variants } from 'framer-motion';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Typewriter, { TypewriterState, type TypewriterClass } from 'typewriter-effect';
import CheckEnv from './Steps/CheckEnv';
import InstallAPPStore from './store';
import * as SC from './styles';
import DownloadApp from './Steps/DownloadApp';
import DownloadZSHPlugins from './Steps/DownloadZSHPlugins';

interface InstallAppProps {}

const DEFAULT_MESSAGES = ['欢迎使用 FE 自动配置工具', '本工具将帮你检查与配置前端开发环境'];

const MessageVariants: Variants = {
  init: { color: '#666' },
  runtime: { transition: { duration: 0.4 }, color: '#fff' },
};

const InstallApp: FC<InstallAppProps> = () => {
  const [typewriterRendered, setTypewriterRendered] = useState(false);
  const typewriterRef = useRef<TypewriterClass>();
  const { step, downloadSet } = InstallAPPStore.useState();
  const [installAppContainerScope, installAppContainerAnimate] = useAnimate();

  const runTypewriter = async (str: string) => {
    const typewriter = typewriterRef.current;
    if (!typewriter) return Promise.reject(new Error('Typewriter not found.'));
    return new Promise<TypewriterState>((resolve) => {
      typewriter.deleteAll();
      if (str) typewriter.typeString(str);
      typewriter.start().callFunction(resolve);
    });
  };

  // Step 1
  useEffect(() => {
    if (!typewriterRendered) return;
    runTypewriter('是否开始?').then(() => InstallAPPStore.nextStep());
    setTypewriterRendered(false);
    return () => setTypewriterRendered(false);
  }, [typewriterRendered]);

  // Step 2
  const toStep2 = useCallback(async () => {
    InstallAPPStore.toStep(2);
    await runTypewriter('');
    await installAppContainerAnimate(installAppContainerScope.current, {
      transition: { duration: 0.2 },
      background: '#282c34',
    });
    await installAppContainerAnimate(installAppContainerScope.current, {
      transition: { duration: 0.4 },
      height: '50vh',
    });
    await runTypewriter('开始检查环境...');
    InstallAPPStore.nextStep();
  }, [installAppContainerAnimate, installAppContainerScope]);

  // Step 3 Pass
  // Step 4
  useEffect(() => {
    if (step !== 4) return;
    if (downloadSet.size > 0) {
      runTypewriter('开始下载APP...').then(() => InstallAPPStore.nextStep());
    } else {
      runTypewriter('没有需要下载的APP').then(() => InstallAPPStore.toStep(6));
    }
  }, [downloadSet, step]);

  // Step 5 Pass
  // Step 6
  useEffect(() => {
    if (step !== 6) return;
    runTypewriter('开始安装ZSH Plugins...').then(() => InstallAPPStore.nextStep());
  }, [downloadSet, step]);

  // Step 7
  useEffect(() => {
    if (step !== 6) return;
    runTypewriter('请选择你需要安装的ZSH Plugins');
  }, [downloadSet, step]);

  // Stop
  useEffect(() => {
    if (step !== 999) return;
    runTypewriter('全部环境已安装！感谢使用，欢迎<a href="https://github.com/Siykt/fe-env-auto-installed">Star</a>！');
  }, [step]);

  console.log('step ->', step);

  return (
    <SC.InstallAppContainer ref={installAppContainerScope}>
      <SC.Message variants={MessageVariants} animate={step > 1 ? 'runtime' : 'init'}>
        <Typewriter
          options={{
            strings: DEFAULT_MESSAGES,
            autoStart: true,
          }}
          onInit={(typewriter) => {
            typewriterRef.current = typewriter;
            setTypewriterRendered(true);
          }}
        />
        <AnimatePresence>
          {step === 1 && (
            <SC.Button
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.2, backgroundColor: '#f2f6f9' }}
              whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
              style={{ y: '-50%' }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0.7 }}
              onClick={toStep2}
            >
              开始配置环境
            </SC.Button>
          )}
        </AnimatePresence>
      </SC.Message>
      <AnimatePresence>
        {[3, 4].includes(step) && <CheckEnv />}
        {step === 5 && <DownloadApp />}
        {step === 7 && <DownloadZSHPlugins />}
      </AnimatePresence>
    </SC.InstallAppContainer>
  );
};

export default InstallApp;
