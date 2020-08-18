import React, { memo, useCallback, useRef, useContext, FunctionComponent } from 'react';
import { Col } from 'rsuite';

import { LettersContext } from '../../providers/LettersProvider';
import useFont from '../../uses/useFont';

import Word from '../Word';

import { IFontInfo } from '../../providers/FontSettingsProvider/interfaces';
import { ISelectLetters } from './interfaces';

import './select-letters.scss';

// preview
const SelectLetters: FunctionComponent<ISelectLetters> = ({ font, text }) => {
  // context
  const lettersContext = useContext(LettersContext);
  const { letters, setLetters, getCountWords } = lettersContext;

  // uses
  const { getFvarTable } = useFont(font);
  
  // element
  const element = useRef(null);

  // set letter
  const setLetter = useCallback((letter: number) => setLetters(letter), [ setLetters ]);

  // text split
  const textSplit = useCallback((font: IFontInfo, text: string = '') => {
    const items:any = [];
    const words: any = getCountWords(text);

    for (let i = 0; i < words.length; i++) {
      const item = words[i];

      items.push(<Word
        index={i}
        key={i}
        font={font}
        word={item}
        letters={letters}
        getFvarTable={getFvarTable}
        type={1}
        onChange={setLetter} />);
    }

    return items;
  }, [ getFvarTable, letters, getCountWords, setLetter ]);
  
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