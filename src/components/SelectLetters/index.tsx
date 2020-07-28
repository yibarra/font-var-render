import React, { memo, useRef, useContext, FunctionComponent } from 'react';

import { LettersContext } from '../../providers/LettersProvider';
import useFont from '../../uses/useFont';

import Letter from '../Letter';

import { IFontInfo } from '../../providers/FontSettingsProvider/interfaces';
import { ISelectLetters } from './interfaces';

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
      <div className="select-letters--content">
        {font && textSplit(font, text)}
      </div>

      <div className="select-letters--count">
        <p>Number of letters {letters.length}</p>
      </div>
    </div>
  );
};

export default memo(SelectLetters);