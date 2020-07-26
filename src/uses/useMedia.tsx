import { useEffect, useState, useCallback } from 'react';

// use media
export default function useMedia(queries: any, values: any, defaultValue: any) {
  // match
  const match =  useCallback(() => 
    values[queries.findIndex((q:any) => matchMedia(q).matches)] || defaultValue, 
    [ defaultValue, queries, values ]);
  // value
  const [value, set] = useState(match);

  // use effect
  useEffect(() => {
    const handler = () => set(match);
    window.addEventListener('resize', handler);

    return () => window.removeEventListener('resize', handler);
  }, [ match ]);

  return value;
};
