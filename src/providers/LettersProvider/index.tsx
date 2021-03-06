import React, { createContext, FunctionComponent, useState, useCallback } from 'react';

import { ILettersContext, ILettersProvider } from './interfaces';

// letter context
const LettersContext = createContext({} as ILettersContext);

// letters provider
const LettersProvider: FunctionComponent<ILettersProvider> = ({ children }) => {
  // state
  const [ letters, setLetters ]:any = useState([]);

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
      const position = items.indexOf(item);
      const letter = { ...items[position], ...value };

      items[position] = letter;
      setLetters(items);
    }
  }, [ letters, setLetters, getLetter ]);
  
  // render
  return (
    <LettersContext.Provider value={{
      letters,
      setLetters: setLetterItem,
      getLetter,
      updateLetterItem,
    }}>
      {children}
    </LettersContext.Provider>
  );
};

export { LettersContext, LettersProvider };
export default LettersProvider;