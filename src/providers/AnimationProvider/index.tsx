import React, { createContext, useState, FunctionComponent, useEffect, useCallback, useContext } from 'react';

import useRequestAnimation from '../../uses/useRequestAnimation';
import CanvasRender from '../../helpers';

import { IAnimationContext, IAnimationProvider } from './interfaces';
import { LettersContext } from '../LettersProvider';

// animation context
const AnimationContext = createContext({} as IAnimationContext);

// animation provider
const AnimationProvider: FunctionComponent<IAnimationProvider> = ({ children }: any) => {
  // canvas render
  const canvasRender = new CanvasRender(400, 400);

  // context
  const lettersContext = useContext(LettersContext);
  const { letters } = lettersContext;

  // text
  const [ current, setCurrent ]:any = useState(0);
  const [ options, setOptions ]:any = useState({
    repeat: true
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

      canvasRender.render(letters);
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