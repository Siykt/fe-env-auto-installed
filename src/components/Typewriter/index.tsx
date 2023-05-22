import { Easing, Tween, update } from '@tweenjs/tween.js';
import { FC, useEffect, useState } from 'react';
import * as SC from './styles';

interface TypewriterProps {
  message?: string;
  del?: boolean;
  onCompleted?: () => void;
  onStart?: () => void;
}

const DEFAULT_SPEED = 80;
const DEL_DELAY = 1000;

const Typewriter: FC<TypewriterProps> = ({ message: propMessage, del, onCompleted, onStart }) => {
  const [message, setMassage] = useState('');

  useEffect(() => {
    if (!propMessage) return;
    const t = new Tween({ index: 0 })
      .to({ index: propMessage.length }, DEFAULT_SPEED * propMessage.length)
      .easing(Easing.Cubic.InOut)
      .onUpdate((data) => {
        setMassage(propMessage.slice(0, Math.round(data.index)));
      })
      .onStart(onStart);
    if (del) {
      t.chain(
        new Tween({ index: propMessage.length })
          .delay(DEL_DELAY)
          .to({ index: 0 }, DEFAULT_SPEED * propMessage.length)
          .easing(Easing.Cubic.InOut)
          .onUpdate((data) => {
            setMassage(propMessage.slice(0, Math.round(data.index)));
          })
          .onComplete(onCompleted)
      );
    } else {
      t.onComplete(onCompleted);
    }
    t.start();
  }, [propMessage, del, onCompleted, onStart]);

  useEffect(() => {
    let timer: number;
    const render = () => {
      timer = requestAnimationFrame(render);
      update();
      return () => cancelAnimationFrame(timer);
    };
    return render();
  }, []);

  return (
    <SC.TypewriterContainer>
      <SC.TypewriterText>{message}</SC.TypewriterText>
      <SC.TypewriterLine>|</SC.TypewriterLine>
    </SC.TypewriterContainer>
  );
};

export default Typewriter;
