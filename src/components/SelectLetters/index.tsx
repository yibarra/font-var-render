import React, { memo, useRef, useContext, FunctionComponent } from 'react';
import { Col } from 'rsuite';

import { LettersContext } from '../../providers/LettersProvider';
import useFont from '../../uses/useFont';

import Letter from '../Letter';

import { IFontInfo } from '../../providers/FontSettingsProvider/interfaces';
import { ISelectLetters } from './interfaces';

import './select-letters.scss';

// preview
const SelectLetters: FunctionComponent<ISelectLetters> = ({ font, text }) => {
  // context
  const lettersContext = useContext(LettersContext);
  const { letters, setLetters } = lettersContext;

  // uses
  const { getFvarTable } = useFont(font);
  
  // element
  const element = useRef(null);

  // set letter
  const setLetter = (letter: number) => {
    setLetters(letter);
  };

  // text split
  const textSplit = (font: IFontInfo, text: string) => {
    const textFull = text.toString();
    const items:any = [];

    for (let i = 0; i < textFull.length; i++) {
      const item = textFull[i];

      items.push(<Letter
        items={letters}
        fvar={getFvarTable(font)}
        text={item === ' ' ? '\u00A0' : item}
        index={i}
        key={i}
        onChange={setLetter} />);
    }

    return items;
  };
  
  // render
  return (
    <div className="select-letters" ref={element}>
      <Col xs={24} className="select-letters--title">
        <p>Click to select the letter you want to transform</p>
      </Col>

      <Col xs={24} className="select-letters--content">
        {font && textSplit(font, text)}
      </Col>

      <Col xs={24}  className="select-letters--count">
        <p><strong>{letters.length}</strong> letters</p>
      </Col>
    </div>
  );
};

export default memo(SelectLetters);