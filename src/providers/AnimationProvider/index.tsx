import React, { createContext, useState, FunctionComponent, useEffect, useCallback } from 'react';

import useRequestAnimation from '../../uses/useRequestAnimation';
import { IAnimationContext, IAnimationProvider } from './interfaces';

// animation context
const AnimationContext = createContext({} as IAnimationContext);

// animation provider
const AnimationProvider: FunctionComponent<IAnimationProvider> = ({ children }: any) => {
  // text
  const [ current, setCurrent ]:any = useState(0);
  const [ options, setOptions ]:any = useState({
    repeat: false
  });

  // animation
  const animation = (deltaTime: number) => {
    setCurrent((prev:any) => {
      const time = (prev) + (deltaTime * 0.05) % 100;
      const current = parseFloat(time.toString()).toFixed(0);

      if (!options.repeat) {
        if (parseInt(current, 10) > 100) {
          return 100;
        }
      }

      return parseInt(current);
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
    // el valor llega despues tengo que hacer el play y el stop tengo que ver quien llama este componente
  }, [ onPlay, onStop, play, setPlay ]);

  // options
  const onOptions = useCallback((value: any) => {
    if (value instanceof Object === false) return false;

    setOptions({...options, ...value});
  }, [ setOptions, options ]);

  // use effect
  useEffect(() => {
    if (current >= 100) {
      if (!options.repeat) {
        setCurrent(100);
        onStop();
      } else {
        setCurrent(0);
      }
    }
  }, [ play, current, setPlay, onStop, options, setCurrent ]);

  // render
  return (
    <AnimationContext.Provider value={{
      current,
      setCurrent,
      onOptions,
      options,
      play,
      onPlay: onChange,
    }}>
      {children}
    </AnimationContext.Provider>
  );
};

export { AnimationContext, AnimationProvider };
export default AnimationProvider;