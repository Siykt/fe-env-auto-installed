import { MutableRefObject, useCallback, useEffect } from 'react';
import InstallAPPStore from './store';
import { TypewriterClass } from 'typewriter-effect';

export function useStep(step: number, callback: () => void) {
  const { step: curStep } = InstallAPPStore.useState();

  useEffect(() => {
    if (curStep === step) callback();
  }, [callback, curStep, step]);
}
