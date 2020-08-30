import React, { createContext, FunctionComponent, useState } from 'react';

import { ITextContext, ITextProvider } from './interfaces';

// text content
const TextContext = createContext({} as ITextContext);

// notification
const TextProvider: FunctionComponent<ITextProvider> = ({ children }) => {
  // text
  const [ text, setText ]:any = useState(process.env.REACT_APP_FONT_TEXT_DEFAULT);
  const [ textProperties, setTextProperties ]:any = useState({
    fontSize: 65,
    lineHeight: 1,
    letterSpacing: -10,
    textAlign: 'left', 
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