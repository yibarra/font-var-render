import React, { createContext, FunctionComponent, useCallback, useContext } from 'react';

import { LettersContext } from '../LettersProvider';
import { LoadFontContext } from '../LoadFontProvider';

import useFont from '../../uses/useFont';

import { ITemplateContext, ITemplateProvider } from './interfaces';

// template context
const TemplateContext = createContext({} as ITemplateContext);

// template provider
const TemplateProvider: FunctionComponent<ITemplateProvider> = ({ children }) => {
  // templates
  const templates = [{ 
    word: 1,
    letters: [
      { type: 'Neutra Curta', limit: 2, bezier: [ 0.83, 0.01, 0.47, 0.59 ] },
      { type: 'Expressiva Curta', limit: 2, bezier: [ 0.83, 1, 0.40, 1 ] },
      { type: 'Expressiva', limit: 1, bezier: [ 0.83, 0.01, 0.7, 0.59 ] },
      { type: 'Expressiva Longa', limit: 1, bezier: [ 0.3, 0.01, 0.7, 0.5 ] }
    ],
    limit: 2,
  }];
  
  // context
  const loadFontContext = useContext(LoadFontContext);
  const lettersContext = useContext(LettersContext);

  // values
  const { font } = loadFontContext;

  const { getFvarTable } = useFont(font);
  const { setAll, textWordLetterArray } = lettersContext;
  
  // checked index
  const checkedIndex = useCallback((items: any[], index: string) => {
    const result = items.filter((item: any) => item.index === index);
    return result.length > 0;
  }, []);

  // get instances
  const getInstances = useCallback((element: string) => {
    const { instances } = getFvarTable(font);

    if (instances instanceof Object) {
      for (let key in instances) {
        const item = instances[key];
        
        if (item instanceof Object) {
          if (element === item.name.en) {
            return item;
          }
        }
      }
    }
    
    return {};
  }, [ getFvarTable, font ]);

  // generate letters
  const generateLetters = useCallback((items: any[]) => {
    const letters: any[] = [];

    for (let i = 0; i < items.length; i++) {
      const { index, type, bezier } = items[i];

      letters.push({
        index,
        bezier,
        instance: getInstances(type),
        settings: { name : { en: 'Neutra' }, coordinates: { wdth: 30, wght: 0 }}
      });
    }

    return letters;
  }, [ getInstances ]);

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
              elements.push({ value, index: key, type: template.letters[random].type, bezier: template.letters[random].bezier });
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