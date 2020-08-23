import React, { memo, useCallback, useRef, useContext, FunctionComponent } from 'react';
import { Col } from 'rsuite';

import { LettersContext } from '../../providers/LettersProvider';
import useFont from '../../uses/useFont';

import { ISelectLetters } from './interfaces';

import './select-letters.scss';

// preview
const SelectLetters: FunctionComponent<ISelectLetters> = ({ font, text }) => {
  // context
  const lettersContext = useContext(LettersContext);
  const { letters, setLetters, textWordLetter } = lettersContext;

  // uses
  const { getFvarTable } = useFont(font);
  
  // element
  const element = useRef(null);

  // set letter
  const setLetter = useCallback((letter: number) => {
    console.log(letter); setLetters(letter); }, [ setLetters ]);
  
  // render
  return (
    <div className="select-letters" ref={element}>
      <Col xs={24} className="select-letters--title">
        <p>Click to select the letter you want to transform</p>
      </Col>

      <Col xs={24} className="select-letters--content">
        {font && textWordLetter(font, text, getFvarTable, setLetter, 1)}
      </Col>

      <Col xs={24}  className="select-letters--count">
        <p><strong>{letters.length}</strong> letters</p>
      </Col>
    </div>
  );
};

export default memo(SelectLetters);