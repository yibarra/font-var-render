import { IFontInfo } from '../providers/FontSettingsProvider/interfaces';

// use font
const useFont = (font: IFontInfo) => {
  // get fvar table
  const getFvarTable = () => {
    if (font.tables) {
      return font.tables['fvar'];
    }

    return false;
  };

  // get name instance
  const getNamedInstance = (i: number) => {
    const fvar = getFvarTable();

    if (fvar) {
      return fvar.instances[i];
    }

    return null;
  };

  // get named instance setting
  const getNamedInstanceSetting = (index: number) => {
    const fvar = getFvarTable();

    if (fvar) {
      const settings = [];
      const values = fvar.instances[index].coordinates;

      for (let i = 0; i < fvar.axes.length; i++) {
        settings.push(`'${fvar.axes[i].tag}' ${values[fvar.axes[i].tag].toString()}`);
      }

      return settings.join();
    }

    return null;
  };

  return {
    getFvarTable,
    getNamedInstance,
    getNamedInstanceSetting
  };
};

export default useFont;