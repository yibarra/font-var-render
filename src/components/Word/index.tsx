import React, { FunctionComponent } from 'react';

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
    }

    return items;
  };

  // render
  return (
    <div className="word">{getWord(font, word)}</div>
  );
};

export default Word;