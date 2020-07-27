import React, { createContext, FunctionComponent, memo, useState, useEffect, useContext, useCallback } from 'react';

import { NotificationContext } from '../NotificationProvider';

import { IFontSettingsContext, IFontSettingsProvider } from './interfaces';

// Load Font Context
const FontSettingsContext = createContext({} as IFontSettingsContext);

// Load Font Provider
const FontSettingsProvider: FunctionComponent<IFontSettingsProvider> = ({ children, font, getFvarTable }) => {
  // context
  const notificationContext = useContext(NotificationContext);
  const { notificationBasic } = notificationContext;

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

  // load
  const load = useCallback((font: any) => {
    if (font instanceof Object === false) return false;

    const table = getFvarTable(font);
    const sett: any = [];

    if (table) {
      const { axes } = table;

      try {
        for (let index in axes) {
          const axe = axes[index];

          if (axe instanceof Object) {
            sett[axe.tag] = axe.defaultValue;
          }
        }
      } finally {
        notificationBasic('Load Font', <div>
          <p>
            the type font was successfully!
          </p>
        </div>);
        return setSettings({...sett});
      }
    }
  }, [ getFvarTable, notificationBasic ]);

  // use effect
  useEffect(() => {
    load(font);
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
export default memo(FontSettingsProvider);