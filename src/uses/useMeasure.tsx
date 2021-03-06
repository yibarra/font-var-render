import { useRef, useState, useEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

// use measure
export default function useMeasure() {
  // ref
  const ref: any = useRef();
  const [ bounds, set ] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ ro ] = useState(() => new ResizeObserver(([entry]) => set(entry.contentRect)));

  // use effect
  useEffect(() => {
    ro.observe(ref.current);
    
    return () => {
      ro.disconnect();
    };
}, [ ro ]);

  return [{ ref }, bounds];
};