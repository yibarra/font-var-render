import React, { memo, useContext, useRef, useState, useEffect } from 'react';

import { FontSettingsContext } from '../../providers/FontSettingsProvider';
import { LettersContext } from '../../providers/LettersProvider';
import { TextContext } from '../../providers/TextProvider';

import LetterItemAnimation from './LetterItemAnimation';
import LetterType from './LetterType';

import './letter.scss';

// letter
const Letter = ({ items, fvar, index, text, type, onChange }: any) => {
  // context
  const fontSettingsContext = useContext(FontSettingsContext);
  const lettersContext = useContext(LettersContext);
  const textContext = useContext(TextContext);

  const { settings, setInstanceValue, initialState }:any = fontSettingsContext;
  const { updateLetterItem }:any = lettersContext;
  const { textProperties }:any = textContext;

  // element
  const element = useRef(null);
  const [ letter, setLetter ]:any = useState({ settings: initialState.coordinates });

  // active
  const active = () => {
    return Array.isArray(items) && (items && items.filter((item:any) => item === letter).length > 0);
  };

  // on select
  const onSelect = (values: any) => {
    updateLetterItem(index, values);
    setInstanceValue(values, element.current);
  };

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
      onClick={() => onChange({ index, settings })}>

      <p className="letter--text">{text}</p>

      {type === 2 &&
        <LetterType
          letter={letter}
          instances={fvar instanceof Object ? fvar.instances : []}
          onSelect={onSelect}
          setInstanceValue={setInstanceValue}
          text={text} />}

      {type === 3 &&
        <LetterItemAnimation
          letter={letter}
          initialState={initialState}
          text={text}
          textProperties={textProperties}
          setInstanceValue={setInstanceValue} />}

    </div>
  );
};

export default memo(Letter);