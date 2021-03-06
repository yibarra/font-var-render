import React, { memo, useContext, useRef, useState, useEffect, useCallback } from 'react';

import { FontSettingsContext } from '../../providers/FontSettingsProvider';
import { LettersContext } from '../../providers/LettersProvider';

import LetterItemAnimation from './LetterItemAnimation';
import LetterType from './LetterType';

import './letter.scss';

// letter
const Letter = ({ items, fvar, index, text, type, onChange }: any) => {
  // context
  const fontSettingsContext = useContext(FontSettingsContext);
  const lettersContext = useContext(LettersContext);

  const { settings, setInstanceValue, initialState }:any = fontSettingsContext;
  const { updateLetterItem }:any = lettersContext;

  // element
  const element = useRef(null);
  const [ letter, setLetter ]:any = useState({});

  // active
  const active = useCallback(() => {
    return Array.isArray(items) && (items && items.filter((item:any) => item === letter).length > 0);
  }, [ items, letter ]);

  // on select
  const onSelect = useCallback((values: any) => {
    updateLetterItem(index, { settings: values, value: text });
    setInstanceValue(values, element.current);
  }, [ updateLetterItem, index, setInstanceValue, text ]);

  // use effect
  useEffect(() => {
    if (Array.isArray(items)) {
      const check = items.filter((item:any) => item.index === index);

      if (check.length > 0) {
        setLetter(check[0]);
      }
    }
  }, [ items, index, setLetter ]);

  // render
  return (
    <div
      className="letter"
      ref={element}
      data-active={active()}
      data-type={type}
      onClick={() => onChange({ index, settings, value: text })}>

      <p className="letter--text">{text}</p>

      {type === 2 && active() === true &&
        <LetterItemAnimation
          letter={letter}
          initialState={initialState}
          text={text}
          setInstanceValue={setInstanceValue} />}

      {type === 2 &&
        <LetterType
          letter={letter}
          instances={fvar instanceof Object ? fvar.instances : []}
          onSelect={onSelect}
          setInstanceValue={setInstanceValue}
          text={text} />}
    </div>
  );
};

export default memo(Letter);