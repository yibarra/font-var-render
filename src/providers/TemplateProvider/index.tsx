import React, { createContext, FunctionComponent, useCallback } from 'react';

import { ITemplateContext, ITemplateProvider } from './interfaces';

// template context
const TemplateContext = createContext({} as ITemplateContext);

// template provider
const TemplateProvider: FunctionComponent<ITemplateProvider> = ({ children }) => {
  // generate
  const generate = useCallback((text: string) => {
    console.log(text);
  }, []);

  // render
  return (
    <TemplateContext.Provider
      value={{
        generate
      }}>
      {children}
    </TemplateContext.Provider>
  );
};

export { TemplateProvider, TemplateContext };
export default TemplateProvider;