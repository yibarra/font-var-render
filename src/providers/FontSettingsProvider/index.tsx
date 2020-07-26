import React, { createContext, FunctionComponent, useState, useEffect, useCallback } from 'react';

import { IFontSettingsContext, IFontSettingsProvider } from './interfaces';

import useFont from '../../hooks/useFont';

// Load Font Context
const FontSettingsContext = createContext({} as IFontSettingsContext);

// Load Font Provider
const FontSettingsProvider: FunctionComponent<IFontSettingsProvider> = ({ children, font }) => {
  // get f var table
  const { getFvarTable } = useFont(font);

  // axes
  const [ settings, setSettings ]: any = useState();

  // set named instance
  const setNamedInstance = useCallback((setts: any) => {
    setSettings({...settings, ...setts });
  }, [ setSettings, settings ]);

  // set css instance value
  const setInstanceValue = useCallback((settings: [], element: any) => {
    if (settings instanceof Object === false) return false;

    const cssProperties = Object.keys(settings).map((key: any) => `'${key}' ${settings[key]}`);
  
    if (cssProperties && element instanceof Object) {
      const css:any = element.style as StyleSheet;
      css.fontVariationSettings = cssProperties.join();
    }

    return true;
  }, []);

  // set name instance value
  const setNamedInstanceValue = useCallback((item: any, element: any) => {
    const fvar = getFvarTable();

    if (fvar) {
      const setts = { ...settings, ...item };

      if (setInstanceValue(setts, element)) {
        setSettings(setts);
      }
    }
  }, [ settings, getFvarTable, setInstanceValue ]);

  // load
  const load = useCallback(() => {
    const table = getFvarTable();
    const sett: any = [];

    if (table) {
      const { axes } = table;

      for (let index in axes) {
        const axe = axes[index];

        if (axe instanceof Object) {
          sett[axe.tag] = axe.defaultValue;
        }
      }

      setSettings({...sett});
    }
  }, [ setSettings, getFvarTable ]);

  // use effect
  useEffect(() => {
    if (font) {
      load();
    }
  }, [ font, load ]);

  // render
  return (
    <FontSettingsContext.Provider value={{
      settings,
      setNamedInstance,
      setNamedInstanceValue,
      setInstanceValue
    }}>
      {children}
    </FontSettingsContext.Provider>
  );
};

export { FontSettingsContext, FontSettingsProvider };
export default FontSettingsProvider;