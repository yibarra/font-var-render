import React, { createContext, useState, FunctionComponent, memo, useCallback } from 'react';

import useRequestAnimation from '../../uses/useRequestAnimation';

import { IAnimationContext, IAnimationProvider } from './interfaces';

// animation context
const AnimationContext = createContext({} as IAnimationContext);

// animation provider
const AnimationProvider: FunctionComponent<IAnimationProvider> = ({ children }: any) => {
  // text
  const [ current, setCurrent ]:any = useState(0);

  // total
  const total: any = process.env.REACT_APP_FONT_TIME || 0;

  // animation
  const animation = (deltaTime: number) => {
    setCurrent(() => {
      const percent = (deltaTime * 100) / total;
      const current = parseFloat(percent.toString()).toFixed(2);

      return parseFloat(current);
    });
  };

  // animation
  const requestAnimation = useRequestAnimation(animation);
  const { play, setPlay, onPlay, onStop } = requestAnimation;

  // play
  const onChange = useCallback(() => {
    const value = !play;

    if (value === true) {
      setPlay(value);
      onPlay();
    } else {
      onStop();
    }
  }, [ onPlay, onStop, play, setPlay ]);

  // render
  return (
    <AnimationContext.Provider value={{
      current,
      setCurrent,
      play,
      onPlay: onChange,
    }}>
      {children}
    </AnimationContext.Provider>
  );
};

export { AnimationContext, AnimationProvider };
export default memo(AnimationProvider);