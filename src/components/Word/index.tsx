import React, { memo, FunctionComponent, useContext, useCallback } from 'react';

import { IFontInfo } from '../../providers/FontSettingsProvider/interfaces';
import { IWord } from './interfaces';

import useFont from '../../uses/useFont';

import { FontSettingsContext } from '../../providers/FontSettingsProvider';
import { LettersContext } from '../../providers/LettersProvider';
import { TextContext } from '../../providers/TextProvider';

import Letter from '../Letter';

import './word.scss';

// word
const Word: FunctionComponent<IWord> = ({ font, word, letters, getFvarTable, index, type, onChange }) => {
  // uses
  const { getName } = useFont(font);

  // context
  const fontSettingsContext = useContext(FontSettingsContext);
  const lettersContext = useContext(LettersContext);
  const textContext = useContext(TextContext);

  const { setInstanceValue, initialState }:any = fontSettingsContext;
  const { updateLetterItem }:any = lettersContext;
  const { textProperties }:any = textContext;

  // active
  const getItem = useCallback((items, index) => {
    return Array.isArray(items) && (items && items.filter((item:any) => item.index === index).length > 0);
  }, []);

  // text split
  const getWord = useCallback((font: IFontInfo, word: string = '') => {
    const items:any = [];

    for (let k = 0; k < word.length; k++) {
      const character: any = word[k];
      const value: any = `${character}-${index}-${k}`;
      const active: any = getItem(letters, value);

      items.push(<Letter
        active={active}
        items={letters}
        name={getName(font)}
        fvar={getFvarTable(font)}
        text={character}
        index={value}
        key={value}
        type={type}
        setInstanceValue={setInstanceValue}
        initialState={initialState}
        updateLetterItem={updateLetterItem}
        textProperties={textProperties}
        onChange={onChange} />);
    }

    return items;
  }, [ getItem, getName, index, letters, getFvarTable, onChange, type, setInstanceValue, initialState, updateLetterItem, textProperties ]);

  // render
  return (
    <div className="word">{getWord(font, word)}</div>
  );
};

export default memo(Word);