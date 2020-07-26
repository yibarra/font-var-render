import React, { createContext, FunctionComponent, useState } from 'react';

import { ITextContext, ITextProvider } from './interfaces';

const TextContext = createContext({} as ITextContext);

// notification
const TextProvider: FunctionComponent<ITextProvider> = ({ children }) => {
  // text
  const [ text, setText ]:any = useState('CANAL BRASIL');
  const [ textProperties, setTextProperties ]:any = useState({
    fontSize: 50,
    lineHeight: 1,
    letterSpacing: 0,
  });

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