import React, { createContext, FunctionComponent, useCallback, useContext } from 'react';
import BezierEasing from 'bezier-easing';

import { LettersContext } from '../LettersProvider';

import { ITemplateContext, ITemplateProvider } from './interfaces';

// template context
const TemplateContext = createContext({} as ITemplateContext);

// template provider
const TemplateProvider: FunctionComponent<ITemplateProvider> = ({ children }) => {
  // templates
  const templates = [{ 
    word: 1,
    letters: [{ type: 1, limit: 2 }, { type: 2, limit: 2 }, { type: 4, limit: 1 }, { type: 5, limit: 1 }],
    limit: 2
  }];

  // context
  const lettersContext = useContext(LettersContext);
  const { setAll, textWordLetterArray } = lettersContext;
  
  // checked index
  const checkedIndex = useCallback((items: any[], index: string) => {
    const result = items.filter((item: any) => item.index === index);
    return result.length > 0;
  }, []);

  // generate letters
  const generateLetters = useCallback((items: any[]) => {
    const letters: any[] = [];

    for (let i = 0; i < items.length; i++) {
      const { index } = items[i];

      letters.push({
        index,
        easing: BezierEasing(0.83, 0.01, 0.47, 0.59),
        instance: { name : { en: 'Expressiva Longa' }, coordinates: { wdth: 100, wght: 100 }},
        settings: { name : { en: 'Neutra' }, coordinates: { wdth: 30, wght: 0 }}
      });
    }

    return letters;
  }, []);

  // generate
  const generate = useCallback((text: string) => {
    const elements: any[] = [];
    const words = textWordLetterArray(text).filter((item: any) => item.character === 1);

    for (let key in templates) {
      const template = templates[key];
      
      if (template instanceof Object) {
        for (let i = 0; i < template.word; i++) {
          const word = words[i];
          const { item, index } = word;

          for (let k = 0; k < template.limit; k++) {
            const lett = Math.floor((Math.random() * word.item.length) + 1); 
            const value: any = item[lett - 1];
            const random = Math.floor((Math.random() * template.limit) + 1);
            const key = `${value}-${lett-1}-${index.toString()[0]}`;

            if (checkedIndex(elements, key) === false) {
              elements.push({ value, index: key, type: random });
            }
          }
        }
      }
    }
    
    setAll(generateLetters(elements));
  }, [ templates, textWordLetterArray, setAll, checkedIndex, generateLetters ]);

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