import React, { createContext, FunctionComponent, memo, useState, useCallback, useEffect } from 'react';

import { IFontSettingsContext, IFontSettingsProvider } from './interfaces';

// Load Font Context
const FontSettingsContext = createContext({} as IFontSettingsContext);

// Load Font Provider
const FontSettingsProvider: FunctionComponent<IFontSettingsProvider> = ({ children, font, getFvarTable }) => {
  // axes
  const [ settings, setSettings ]:any = useState({});
  const [ initialState, setInitialState ]:any = useState({ name: { en: "Neutra" }, coordinates: { wdth: 30, wght: 0 } });

  // convert properties
  const convertProperties = (settings: any[]) => {
    const props = Object.keys(settings).map((key: any) => `'${key}' ${settings[key]}`);

    return props.join();
  };

  // init settings
  const initSettings = () => {
    // tvar
  };

  // set named instance
  const setNamedInstance = useCallback((setts: any) => {
    setSettings({...settings, ...setts });
  }, [ setSettings, settings ]);

  // set css instance value
  const setInstanceValue = useCallback((settings: any[], element: any) => {
    if (settings instanceof Object === false) return false;

    const cssProperties = convertProperties(settings);
  
    if (element instanceof Object) {
      const css:any = element.style as StyleSheet;
      css.fontVariationSettings = cssProperties;
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

  // set main instance
  const setMainInstance = useCallback((setts: any) => {
    setInstanceValue(setts, document.body);
    setInitialState(setts);
  }, [ setInstanceValue ]);

  // use effect
  useEffect(() => {
    const load = () => {
      const body:any = document.body;
      const cssProperties = convertProperties(initialState.coordinates);
  
      if (body instanceof Object) {
        const css:any = body.style as StyleSheet;
        css.fontVariationSettings = cssProperties;
      }
    };

    load();
  }, [ font, initialState ]);

  // render
  return (
    <FontSettingsContext.Provider value={{
      settings,
      setNamedInstance,
      setNamedInstanceValue,
      setInstanceValue,
      initialState,
      setInitialState: setMainInstance
    }}>
      {children}
    </FontSettingsContext.Provider>
  );
};

export { FontSettingsContext, FontSettingsProvider };
export default memo(FontSettingsProvider);