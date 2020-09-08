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

    for (let i = 0; i < letters.length; i++) {
      const letter: any = letters[i];

      if (letter instanceof Object) {
        const { frames } = letter;
        const frame = frames[current];

        if (frame instanceof Object) {
          const { src, height, width, x, y } = frame;

          const ctx = parent.getContext('2d');
          const img = new Image();

          img.onload = () => ctx.drawImage(img, x, y, width, height);
          img.src = src;
          console.log('image', x, y, width, height);
          //ctx.drawImage(src, x, y, width, height);
        }
      }
    }
  }, [ letters, element ]);

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