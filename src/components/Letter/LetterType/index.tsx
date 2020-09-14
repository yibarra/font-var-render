import React, { memo, useCallback, FunctionComponent } from 'react';

import LetterItem from '../LetterItem';

import { ILetterType } from './interfaces';

import './letter-type.scss';

// letter type
const LetterType: FunctionComponent<ILetterType> = ({ current, setInstanceValue, instances, text, onSelect, type }: any) => {
  // on select
  const selectLetter = useCallback((instance: any) => {
    if (instance instanceof Object === false) return false;

    const findInstance = instances.filter(({ coordinates }:any) => coordinates === instance);
    
    if (findInstance.length > 0) {
      onSelect(findInstance[0]);
    }
  }, [ onSelect, instances ]);

  // render
  return (
    <ul className="letter-type" data-type={type}>
      {instances && instances.map((item: any, index: number) => 
        <li className="letter-type--item"
          data-active={current.coordinates === item.coordinates}
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