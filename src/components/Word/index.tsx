import React, { memo, FunctionComponent } from 'react';

import { IFontInfo } from '../../providers/FontSettingsProvider/interfaces';
import { IWord } from './interfaces';

import Letter from '../Letter';

import './word.scss';

// word
const Word: FunctionComponent<IWord> = ({ font, word, letters, getFvarTable, index, type, onChange }) => {
  // text split
  const getWord = (font: IFontInfo, word: string = '') => {
    const items:any = [];

    for (let i = 0; i < word.length; i++) {
      const item = word[i];

      for (let k = 0; k < item.length; k++) {
        const character = item[k];

        items.push(<Letter
          items={letters}
          fvar={getFvarTable(font)}
          text={character}
          index={`${character}-${i}-${index}`}
          key={`${character}-${i}-${index}`}
          type={type}
          onChange={onChange} />);
      }

      if (i === (word.length -1)) {
        items.push(<Letter
          items={letters}
          fvar={getFvarTable(font)}
          text={'\u00A0'}
          type={1}
          key={1}
          index={1}
          onChange={() => {}} />);
      }
    }

    return items;
  };

  // render
  return (
    <div className="word">{getWord(font, word)}</div>
  );
};

export default memo(Word);