import React, { memo, useContext, useRef, useState, useEffect, useCallback } from 'react';

import BezierEasing from 'bezier-easing';
import BezierEditor from 'bezier-easing-editor';

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

  const { setInstanceValue, initialState }:any = fontSettingsContext;
  const { updateLetterItem }:any = lettersContext;
  const { textProperties }:any = textContext;

  // element
  const element: any = useRef();

  // state
  const [ letter, setLetter ]:any = useState({ 
    index: index,
    instance: initialState,
    easing: BezierEasing(0.83, 0.01, 0.47, 0.59),
    settings: initialState,
  });

  // active
  const active = () => {
    return Array.isArray(items) && (items && items.filter((item:any) => item === letter).length > 0);
  };

  // on select
  const onSelect = useCallback((values: any) => {
    updateLetterItem(index, { instance: { ...values }});
    setInstanceValue(values, element.current);
  }, [ index, updateLetterItem, setInstanceValue ]);

  // on select settings
  const onSelectSettings = useCallback((values: any) => {
    updateLetterItem(index, { settings: { ...values }});
  }, [ index, updateLetterItem ]);

  // on easing
  const onEasing = useCallback((values: any[]) => {
    const lett: any = letter;
    lett.easing = BezierEasing(values[0], values[1], values[2], values[3]);

    setLetter(lett);
  }, [ letter ]);

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
      data-type={type}>

      <p className="letter--text" onClick={() => onChange(letter)}>{text}</p>

      {type === 2 && <LetterType
        instances={fvar instanceof Object ? fvar.instances : []}
        current={letter.settings}
        onSelect={onSelectSettings}
        setInstanceValue={setInstanceValue}
        text={text}
        key={1} />}

      {type === 2 && <LetterType
        instances={fvar instanceof Object ? fvar.instances : []}
        current={letter.instance}
        onSelect={onSelect}
        setInstanceValue={setInstanceValue}
        text={text}
        key={2} />}

      {type === 3 &&
        <LetterItemAnimation
          letter={letter}
          initialState={initialState}
          text={text}
          textProperties={textProperties}
          setInstanceValue={setInstanceValue} />}

      {type === 2 && active() &&
        <div className="letter--easing">
          <BezierEditor defaultValue={[0.83, 0.01, 0.47, 0.59]} onChange={onEasing} />
        </div>}
    </div>
  );
};

export default memo(Letter);