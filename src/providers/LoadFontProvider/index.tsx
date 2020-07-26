import React, { createContext, useCallback, useEffect, useState, FunctionComponent } from 'react';
import opentype from 'opentype.js';
import base64 from 'base-64';

import FontSettingsProvider from '../FontSettingsProvider';

import { IFontInfo } from '../FontSettingsProvider/interfaces';
import { ILoadFontContext, ILoadFontProvider } from './interfaces';

// Load Font Context
const LoadFontContext = createContext({} as ILoadFontContext);

// Load Font Provider
const LoadFontProvider: FunctionComponent<ILoadFontProvider> = ({ children }) => {
  // state
  const [ font, setFont ]:any = useState<IFontInfo>();

  // uint 8 to string
  const Uint8ToString = (u8a: any) => {
    let CHUNK_SZ = 0x8000;
    let c = [];

    for (let i = 0; i < u8a.length; i+= CHUNK_SZ) {
      c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
    }

    return c.join('');
  };

  // set font face
  const setFontFace = useCallback(async (font, fontBuffer) => {
    if (document instanceof Object) {
      const base = base64.encode(Uint8ToString(new Uint8Array(fontBuffer)));
      const fontFace: any = `@font-face {
        font-family: '${font.names.fontFamily.en}';
        src: url('data:;base64,${base}') format('truetype');
      }`;

      const style: any = document.getElementById('font-load');
      style.textContent = fontFace;
    }
  }, []);

  // on read file
  const onReadFile = useCallback((file): any => {
    const reader = new FileReader();

    reader.onload = (e: { target: any }): any => {
      try {
        const fontBuffer = e.target.result;
        const font = opentype.parse(fontBuffer);

        setFont(font);
        setFontFace(font, fontBuffer);
      } catch (err) {
        console.error(err.toString());
      }
    };

    reader.onerror = err => {
      console.error(err.toString());
    };

    reader.readAsArrayBuffer(file);
  }, [ setFontFace ]);

  // use effect
  useEffect(() => {
    const load = () => {
      const fontFileName: string = process.env.PUBLIC_URL + '/fonts/canal-brasil.ttf';

      opentype.load(fontFileName, (err: any, font: any) => {
        if (err) {
          console.log(err);
          return;
        }

        document.body.style.fontFamily = font.names.fontFamily.en;
        setFont(font);
      });
    }

    load();
  }, []);

  // render
  return (
    <FontSettingsProvider font={font}>
      <LoadFontContext.Provider value={{
        font,
        onLoad: onReadFile
      }}>
        {children}
      </LoadFontContext.Provider>
    </FontSettingsProvider>
  );
};

export { LoadFontContext, LoadFontProvider };
export default LoadFontProvider;