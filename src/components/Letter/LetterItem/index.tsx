import React, { memo, useRef, useEffect } from 'react';

import './letter-item.scss';

// letter item
const LetterItem = ({ instanceFont, setInstanceValue, text, onSelect }: any) => {
  // element
  const element: any = useRef(null);

  // use effect
  useEffect(() => {
    if (element.current) {
      setInstanceValue(instanceFont.coordinates, element.current);
    }
  }, [ text, instanceFont, setInstanceValue, element ]);

  // render
  return (
    <div className="letter-item" ref={element} onClick={() => onSelect(instanceFont.coordinates)}>
      <p className="letter--text">{text}</p>
    </div>
  );
};

export default memo(LetterItem);