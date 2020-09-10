import React, { createContext, FunctionComponent, useContext, useState, useEffect } from 'react';

import { ITextContext, ITextProvider } from './interfaces';
import { LettersContext } from '../LettersProvider';

// text content
const TextContext = createContext({} as ITextContext);

// notification
const TextProvider: FunctionComponent<ITextProvider> = ({ children }) => {
  // context
  const letterContext = useContext(LettersContext);

  // text
  const [ text, setText ]:any = useState(process.env.REACT_APP_FONT_TEXT_DEFAULT);
  const [ textProperties, setTextProperties ]:any = useState({
    fontSize: 65,
    lineHeight: 1,
    letterSpacing: -10,
    textAlign: 'left', 
  });

  useEffect(() => {
    console.log(text, 'set text');
  }, [ text ]);

  // render
  return (
    <TextContext.Provider value={{
      text,
      setText,
      textProperties,
      setTextProperties
    }}>
      {children}
    </TextContext.Provider>
  );
};

export { TextContext, TextProvider };
export default TextProvider;