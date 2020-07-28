import React, { useRef, useEffect } from 'react';

//import './letter-item.scss';

// leter item
const LetterItem = ({ instanceFont, setInstanceValue, text, onSelect }: any) => {
  // element
  const element = useRef(null);

  // use effect
  useEffect(() => {
    if (element.current) {
      setInstanceValue(instanceFont.coordinates, element.current);
    }
  }, [ text, instanceFont, setInstanceValue ]);

  // render
  return (
    <div className="letter-item" ref={element} onClick={() => onSelect(instanceFont.coordinates)}>
      <p className="letter--text">{text}</p>
    </div>
  );
};

export default LetterItem;