import React, { memo, useContext, useEffect, useCallback, useRef } from 'react';

import { AnimationContext } from '../../providers/AnimationProvider';
import { LettersContext } from '../../providers/LettersProvider';

// canvas render
const CanvasRender = ({ id, width, height }: any) => {
  // context
  const animationContext = useContext(AnimationContext);
  const lettersContext = useContext(LettersContext);

  const { current } = animationContext;
  const { letters } = lettersContext;

  // element
  const element = useRef(null);

  // create frame
  const createFrame = useCallback((current: any) => {
    const parent: any = element.current;

    if (parent instanceof Object) {
      parent.setAttribute('width', width);
      parent.setAttribute('height', height);

      const ctx = parent.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();

      if (ctx) {
        let x = 190;

        for (let i = 0; i < letters.length; i++) {
          const letter: any = letters[i];
    
          if (letter instanceof Object) {
            const { frames } = letter;
            const frame = frames[current];
    
            if (frame instanceof Object) {
              console.log(x, i);

              const { src, index } = frame;
              const frameWidth = frame.width;
              const frameHeight = frame.height;

              const cas = index.split('-');
              const line = cas[1];
              x += parseInt(frameWidth.toString(), 10);
              console.log(x, frameWidth);

              ctx.drawImage(src, x, (height / 2) - ((line + 1) * (frameHeight / 2)));
              //const { src, index } = frame;
              //ctx.drawImage(img, x, (realHeight / 2) - ((line + 1) * (realHeight / 2)));
            }
          }
        }
      }
    }
  }, [ letters, element, height, width ]);

  // use effect
  useEffect(() => {
    createFrame(parseInt(Math.floor(current).toString(), 10));
  }, [ current, createFrame ]);

  // render
  return (
    <canvas id={id} width={width} height={height} ref={element} />
  );
};

export default memo(CanvasRender);