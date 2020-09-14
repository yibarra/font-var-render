import React, { createContext, FunctionComponent, memo, useState, useCallback } from 'react';

import { ILettersContext, ILettersProvider } from './interfaces';
import { IFontInfo } from '../FontSettingsProvider/interfaces';

import Word from '../../components/Word';

// letter context
const LettersContext = createContext({} as ILettersContext);

// letters provider
const LettersProvider: FunctionComponent<ILettersProvider> = ({ children }) => {
  // state
  const [ letters, setLetters ]:any = useState([]);

  // get align
  const getAlign = useCallback((value: string) => {
    switch (value) {
      case 'right':
        return 'flex-end';
      case 'center':
        return 'center';
      default:
        return 'flex-start';
    }
  }, []);

  // get element
  const getLetter = useCallback((index: number) => {
    if (letters.length > 0) {
      return letters.filter((item:any) => item.index === index)[0];
    }

    return false;
  }, [ letters ]);

  // set letter item
  const setLetterItem = useCallback((lett: any) => {
    if (lett instanceof Object === false) return false;

    const letter = getLetter(lett.index);
    
    if (letter instanceof Object) {
      setLetters(letters.filter((item: any) => item !== letter));
    } else {
      setLetters([...letters, lett]);
    }
  }, [ letters, setLetters, getLetter ]);

  // update letter
  const updateLetterItem = useCallback((index: number, value: any) => {
    const item = getLetter(index);

    if (item instanceof Object) {
      const items = letters;
      items[items.indexOf(item)] = { ...item, ...value };

      setLetters([
        ...items
      ]);
    }
  }, [ letters, setLetters, getLetter ]);

  // get array words
  const getCountWords = useCallback((str: string) => {
    return str?.trim().split(' ');
  }, []);

  // get array line break
  const getLineBreak = useCallback((str: string) => {
    return str?.split(/\r?\n/);
  }, []);

  // text word letters array
  const textWordLetterArray = useCallback((text: string = '') => {
    const items:any = [];
    const breaks = getLineBreak(text);
    
    for (let k = 0; k < breaks.length; k++) {
      const textLine = breaks[k];
      const words: any = getCountWords(textLine);

      for (let i = 0; i < words.length; i++) {
        items.push({ character: 1, item: words[i], index: (k+1) });
      }
    }

    return items;
  }, [ getCountWords, getLineBreak ]);

  // text word letter
  const textWordLetter = useCallback((font: IFontInfo, text: string = '', getFvarTable: any, onChange: any, type: any) => {
    const elements: any[] = [];
    const words: any[]  = textWordLetterArray(text);

    for (let i = 0; i < words.length; i++) {
      const { item, index } = words[i];

      elements.push(<Word
        index={i}
        key={index}
        font={font}
        word={item}
        letters={letters}
        getFvarTable={getFvarTable}
        type={type}
        onChange={onChange} />);
    }

    return elements;
  }, [ letters, textWordLetterArray ]);
  
  // render
  return (
    <LettersContext.Provider value={{
      letters,
      setAll: setLetters,
      setLetters: setLetterItem,
      getLetter,
      updateLetterItem,
      getCountWords,
      getLineBreak,
      getAlign,
      textWordLetter,
      textWordLetterArray,
    }}>
      {children}
    </LettersContext.Provider>
  );
};

export { LettersContext, LettersProvider };
export default memo(LettersProvider);