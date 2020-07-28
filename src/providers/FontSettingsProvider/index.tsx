import React, { createContext, FunctionComponent, memo, useState, useCallback } from 'react';

import { IFontSettingsContext, IFontSettingsProvider } from './interfaces';

// Load Font Context
const FontSettingsContext = createContext({} as IFontSettingsContext);

// Load Font Provider
const FontSettingsProvider: FunctionComponent<IFontSettingsProvider> = ({ children, font, getFvarTable }) => {
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
    const fvar = getFvarTable(font);

    if (fvar) {
      const setts = { ...settings, ...item };

      if (setInstanceValue(setts, element)) {
        setSettings(setts);
      }
    }
  }, [ settings, getFvarTable, setInstanceValue, font ]);

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
export default memo(FontSettingsProvider);