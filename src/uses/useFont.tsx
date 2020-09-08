import { IFontInfo } from '../providers/FontSettingsProvider/interfaces';
import { useCallback } from 'react';

// use font
const useFont = (font: IFontInfo) => {
  // get name
  const getName = useCallback((font: IFontInfo) => {
    if (font.names) {
      return font.names.fontFamily.en;
    }

    return 'Canal Brasil VF';
  }, []);

  // get fvar table
  const getFvarTable = useCallback((font: IFontInfo) => {
    if (font.tables) {
      return font.tables['fvar'];
    }

    return false;
  }, []);

  // get name instance
  const getNamedInstance = useCallback((i: number) => {
    const fvar = getFvarTable(font);

    if (fvar) {
      return fvar.instances[i];
    }

    return null;
  }, [ font, getFvarTable ]);

  // get named instance setting
  const getNamedInstanceSetting = useCallback((index: number) => {
    const fvar = getFvarTable(font);

    if (fvar) {
      const settings = [];
      const values = fvar.instances[index].coordinates;

      for (let i = 0; i < fvar.axes.length; i++) {
        settings.push(`'${fvar.axes[i].tag}' ${values[fvar.axes[i].tag].toString()}`);
      }

      return settings.join();
    }

    return null;
  }, [ font, getFvarTable ]);

  return {
    getFvarTable,
    getNamedInstance,
    getNamedInstanceSetting,
    getName
  };
};

export default useFont;