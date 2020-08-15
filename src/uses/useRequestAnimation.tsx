import { useRef, useEffect, useState } from 'react';

import RenderCanvas from '../helpers';

// render canvas
const renderCanvas: any = new RenderCanvas();

// use animation frame
const useRequestAnimation = (callback: any):any => {
  // refs
  const requestRef:any = useRef(window.requestAnimationFrame);
  const previousTimeRef:any = useRef();
  
  // state
  const [ play, setPlay ]:any = useState(false);

  let start:any = null;
  const total: any = process.env.REACT_APP_FONT_TIME || 0;
  
  // animate
  const animate = (timestamp: number) => {
    const ms: number = Date.now() - start;
    
    if (ms < total) {
      callback(ms);
      renderCanvas.render(ms, true);
      requestRef.current = requestAnimationFrame(animate);
    } else {
      onStop();
    }

    previousTimeRef.current = timestamp;
  };

  // on play
  const onPlay = () => {
    start = Date.now();
    requestRef.current = requestAnimationFrame(animate);
    renderCanvas.render(0, true);
    
    setPlay(true);
  };

  // stop
  const onStop = () => {
    cancelAnimationFrame(requestRef.current);
    renderCanvas.render(0);

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