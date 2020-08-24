import React, { createContext, FunctionComponent, useCallback, useContext } from 'react';
import BezierEasing from 'bezier-easing';

import { LettersContext } from '../LettersProvider';
import { LoadFontContext } from '../LoadFontProvider';

import useFont from '../../uses/useFont';

import { ITemplateContext, ITemplateProvider } from './interfaces';

// template context
const TemplateContext = createContext({} as ITemplateContext);

// template provider
const TemplateProvider: FunctionComponent<ITemplateProvider> = ({ children }) => {
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

    console.log(items, 'check');
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
      const bezierProps: any[] = bezier.split(',');

      letters.push({
        index,
        easing: BezierEasing(bezierProps[0], bezierProps[1], bezierProps[2], bezierProps[3]),
        instance: getInstances(type),
        settings: { name : { en: 'Neutra' }, coordinates: { wdth: 30, wght: 0 }}
      });
    }

    return letters;
  }, [ getInstances ]);

  // generate
  const generate = useCallback((text: string, templates: any[]) => {
    const elements: any[] = [];
    const words = textWordLetterArray(text).filter((item: any) => item.character === 1);

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const { item, index } = word;

      const template = templates[i];

      if (template) {
        for (let k = 0; k < template.limit; k++) {
          const lett = Math.floor((Math.random() * word.item.length) + 1); 
          const random = Math.floor((Math.random() * template.limit) + 1);
          const value: any = item[lett - 1];

          const key = `${value}-${lett-1}-${index.toString()[index.length - 1]}`;
          const templateData = template.letters[random];

          if (checkedIndex(elements, key) === false && templateData instanceof Object) {
            elements.push({ value, index: key, type: templateData.type, bezier: template.letters[random].bezier });
          }
        }
      }
    }

    setAll(generateLetters(elements));
  }, [ textWordLetterArray, setAll, checkedIndex, generateLetters ]);

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