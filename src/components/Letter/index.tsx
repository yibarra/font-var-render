import React, { memo, useRef, useState, useEffect, useCallback } from 'react';

import LetterItemAnimation from './LetterItemAnimation';
import LetterType from './LetterType';

import './letter.scss';

// letter
const Letter = ({
  active,
  items,
  fvar,
  index,
  name,
  text,
  type,
  onChange,
  setInstanceValue,
  initialState,
  updateLetterItem,
  textProperties,
  setLetters
 }: any) => {
  // element
  const element: any = useRef();

  // state
  const [ letter, setLetter ]:any = useState({ 
    index: index,
    instance: initialState.coordinates,
    easing: [0.83, 0.01, 0.47, 0.59],
    settings: initialState.coordinates,
    frames: []
  });

  // init set
  const initSet = useCallback((check: boolean) => {
    if (check === false) {
      setLetters(letter);
    }
  }, [ letter, setLetters ]);

  // on select
  const onSelect = useCallback((values: any) => {
    updateLetterItem(index, { instance: { ...values }});
    setInstanceValue(values, element.current);
  }, [ index, updateLetterItem, setInstanceValue ]);

  // on select settings
  const onSelectSettings = useCallback((values: any) => {
    updateLetterItem(index, { settings: { ...values }});
  }, [ index, updateLetterItem ]);

  // on letter frames
  const onLetterFrames = useCallback((values: any) => {
    updateLetterItem(index, { frames: { ...values }});
  }, [ index, updateLetterItem ]);

  // use effect
  useEffect(() => {
    const check = items.filter((item:any) => item.index === index);

    if (active === true) {
      if (check.length > 0) {
        setLetter(check[0]);
      }
    }

    initSet(check.length > 0);
  }, [ items, active, index, setLetter, initSet ]);

  // render
  return (
    <div
      className="letter"
      ref={element}
      data-active={active}
      data-type={type}>

      <p className="letter--text" onClick={() => onChange(letter)}>{text}</p>

      {type === 2 && <LetterType
        instances={fvar instanceof Object ? fvar.instances : []}
        current={letter.settings}
        onSelect={onSelectSettings}
        setInstanceValue={setInstanceValue}
        text={text}
        key={1}
        type={1} />}

      {type === 2 && <LetterType
        instances={fvar instanceof Object ? fvar.instances : []}
        current={letter.instance}
        onSelect={onSelect}
        setInstanceValue={setInstanceValue}
        text={text}
        key={2}
        type={2} />}

      {type === 3 &&
        <LetterItemAnimation
          initialState={initialState}
          name={name}
          letter={letter}
          active={active}
          text={text}
          onLetterFrames={onLetterFrames}
          textProperties={textProperties}
          setInstanceValue={setInstanceValue} />}
    </div>
  );
};

export default memo(Letter);