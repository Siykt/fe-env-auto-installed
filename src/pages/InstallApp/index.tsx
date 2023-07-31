import { AnimatePresence, useAnimate, type Variants } from 'framer-motion';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Typewriter, { type TypewriterClass } from 'typewriter-effect';
import CheckEnv from './Steps/CheckEnv';
import InstallAPPStore from './store';
import * as SC from './styles';

interface InstallAppProps {}

const DEFAULT_MESSAGES = ['欢迎使用 FE 自动配置工具', '作者：<a href="https://github.com/Siykt">Siykt</a>'];

const MessageVariants: Variants = {
  init: { color: '#666' },
  runtime: { transition: { duration: 0.4 }, color: '#fff' },
};

const InstallApp: FC<InstallAppProps> = () => {
  const [typewriterRendered, setTypewriterRendered] = useState(false);
  const typewriterRef = useRef<TypewriterClass>();
  const { step } = InstallAPPStore.useState();
  const [installAppContainerScope, installAppContainerAnimate] = useAnimate();

  // Step 1
  useEffect(() => {
    const typewriter = typewriterRef.current;
    if (!typewriterRendered || !typewriter) return;
    typewriter.typeString('是否开始?').callFunction(() => InstallAPPStore.nextStep());
    setTypewriterRendered(false);
    return () => setTypewriterRendered(false);
  }, [typewriterRendered]);

  // Step 2
  const toStep2 = useCallback(() => {
    InstallAPPStore.toStep(2);
    const typewriter = typewriterRef.current;
    if (!typewriter) return;

    typewriter
      .deleteAll()
      .start()
      .callFunction(async () => {
        await installAppContainerAnimate(installAppContainerScope.current, {
          transition: { duration: 0.2 },
          background: '#282c34',
        });
        await installAppContainerAnimate(installAppContainerScope.current, {
          transition: { duration: 0.4 },
          height: '50vh',
        });
        typewriter
          .typeString('开始检查环境...')
          .start()
          .callFunction(() => InstallAPPStore.nextStep());
      });
  }, [installAppContainerAnimate, installAppContainerScope]);

  console.log('step ->', step);

  return (
    <SC.InstallAppContainer ref={installAppContainerScope}>
      <SC.Message variants={MessageVariants} animate={step > 2 ? 'runtime' : 'init'}>
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
        {step === 3 && <CheckEnv />}
      </SC.Message>
    </SC.InstallAppContainer>
  );
};

export default InstallApp;
