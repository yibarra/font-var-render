import React, { memo, useState } from 'react';

import LetterItem from '../LetterItem';

import './letter-type.scss';

//interface

// letter type
const LetterType = ({ letter, setInstanceValue, instances, text, onSelect }: any) => {
  // state
  const [ current, setCurrent ] = useState(null);

  // on select
  const selectLetter = (instance: any) => {
    if (instance instanceof Object === false) return false;

    const findInstance = instances.filter(({ coordinates }:any) => coordinates === instance);
    
    if (findInstance.length > 0) {
      onSelect(findInstance[0]);
      setCurrent(instance);
    }
  };

  // render
  return (
    <ul className="letter-type">
      {instances && instances.map((item: any, index: number) => 
        <li className="letter-type--item"
          data-active={current === item.coordinates}
          key={index}>

          <LetterItem
            instanceFont={item}
            setInstanceValue={setInstanceValue}
            text={text}
            onSelect={selectLetter} />
        </li>)}
    </ul>
  );
};

export default memo(LetterType);