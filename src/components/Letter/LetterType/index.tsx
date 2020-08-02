import React, { useState, useContext } from 'react';

import { LettersContext } from '../../../providers/LettersProvider';

import LetterItem from '../LetterItem';

import './letter-type.scss';

//interface

// letter type
const LetterType = ({ letter, setInstanceValue, instances, text, onSelect }: any) => {
  // letters
  const lettersContext = useContext(LettersContext);
  const { updateLetterItem } = lettersContext;

  // state
  const [ current, setCurrent ] = useState(null);

  // on select
  const selectLetter = (instance: any) => {
    if (instance instanceof Object === false) return false;

    const findInstance = instances.filter(({ coordinates }:any) => coordinates === instance);
    
    if (findInstance.length > 0) {
      const letterSettings = findInstance[0];

      if (letterSettings.coordinates instanceof Object) {
        updateLetterItem(letter.index, { settings: letterSettings.coordinates });
      }

      setCurrent(instance);
      onSelect(instance);
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

export default LetterType;