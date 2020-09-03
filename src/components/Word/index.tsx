import React, { memo, FunctionComponent, useCallback } from 'react';

import { IFontInfo } from '../../providers/FontSettingsProvider/interfaces';
import { IWord } from './interfaces';

import Letter from '../Letter';

import './word.scss';

// word
const Word: FunctionComponent<IWord> = ({ font, word, letters, getFvarTable, index, type, onChange }) => {
  // active
  const getItem = useCallback((items, index) => {
    console.log(items, index);
    return Array.isArray(items) && (items && items.filter((item:any) => item.index === index).length > 0);
  }, []);

  // text split
  const getWord = useCallback((font: IFontInfo, word: string = '') => {
    const items:any = [];

    for (let k = 0; k < word.length; k++) {
      const character: any = word[k];
      const value: any = `${character}-${index}-${k}`;
      const active: any = getItem(letters, value);

      console.log(value, '---')

      items.push(<Letter
        active={active}
        items={letters}
        fvar={getFvarTable(font)}
        text={character}
        index={value}
        key={value}
        type={type}
        onChange={onChange} />);

      if (k === (word.length - 1)) {
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
  }, [ getItem, index, letters, getFvarTable, onChange, type ]);

  // render
  return (
    <div className="word">{getWord(font, word)}</div>
  );
};

export default memo(Word);