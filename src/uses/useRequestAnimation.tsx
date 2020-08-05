import { useRef, useEffect, useState } from 'react';

import RenderCanvas from '../helpers';

// render canvas
const renderCanvas: any = new RenderCanvas();

// use animation frame
const useRequestAnimation = (callback: any):any => {
  // refs
  const requestRef:any = useRef();
  const previousTimeRef:any = useRef();
  
  // state
  const [ play, setPlay ]:any = useState(false);
  
  // animate
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime: number = time - previousTimeRef.current;

      renderCanvas.render(deltaTime);
      callback(deltaTime);
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  // on play
  const onPlay = () => {
    requestRef.current = requestAnimationFrame(animate);
    setPlay(true);
  };

  // stop
  const onStop = () => {
    cancelAnimationFrame(requestRef.current);
    setPlay(false);
  };
  
  // use effect
  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return {
    play,
    setPlay,
    onPlay,
    onStop
  };
};

export default useRequestAnimation;