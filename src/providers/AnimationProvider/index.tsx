import React, { createContext, useState, FunctionComponent, memo, useCallback, useEffect } from 'react';
import { Modal } from 'rsuite';

import useRequestAnimation from '../../uses/useRequestAnimation';

import { IAnimationContext, IAnimationProvider } from './interfaces';

// animation context
const AnimationContext = createContext({} as IAnimationContext);

// animation provider
const AnimationProvider: FunctionComponent<IAnimationProvider> = ({ children }: any) => {
  // text
  const [ current, setCurrent ]:any = useState(0);
  const [ processing, setProcessing ] = useState(false);

  // animation
  const animation = (deltaTime: number) => {
    const delayInit: number = 0.110;
    const animation: number = deltaTime * 0.001;

    if (animation >= delayInit) {
      setCurrent(() => {
        const percent = ((deltaTime - delayInit) / 940) * 100;

        if (percent > 100) {
          return 100;
        }

        return parseFloat(percent.toString()).toFixed(2);
      });
    } else {
      return 0;
    }
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

  // open modal
  useEffect(() => {
    if (processing === true) {

    }
  }, [ processing ]);

  // render
  return (
    <AnimationContext.Provider value={{
      current,
      setCurrent,
      play,
      processing,
      setProcessing,
      onPlay: onChange,
    }}>
      {children}

      <Modal show={processing}>
        <Modal.Header>
          <Modal.Title>
            <p className="title">System Info</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text">Processing Frames</p>
        </Modal.Body>
      </Modal>
    </AnimationContext.Provider>
  );
};

export { AnimationContext, AnimationProvider };
export default memo(AnimationProvider);