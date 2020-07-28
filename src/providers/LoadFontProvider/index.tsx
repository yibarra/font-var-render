import React, { createContext, memo, useCallback, useEffect, useState, useContext, FunctionComponent } from 'react';
import opentype from 'opentype.js';
import base64 from 'base-64';

import { NotificationContext } from '../NotificationProvider';
import FontSettingsProvider from '../FontSettingsProvider';

import useFont from '../../uses/useFont';

import { IFontInfo } from '../FontSettingsProvider/interfaces';
import { ILoadFontContext, ILoadFontProvider } from './interfaces';

// Load Font Context
const LoadFontContext = createContext({} as ILoadFontContext);

// Load Font Provider
const LoadFontProvider: FunctionComponent<ILoadFontProvider> = ({ children }) => {
  // context
  const notificationContext = useContext(NotificationContext);
  const { notificationSuccess, notificationError } = notificationContext;

  // state
  const [ font, setFont ]:any = useState<IFontInfo>();

  // get f var table
  const { getFvarTable } = useFont(font);

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

      notificationSuccess('Upload', 'The type font was successfully loaded!');
    }
  }, [ notificationSuccess ]);

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
        notificationError('Erro loading', 'Verify the font file and try again!');
        console.error(err.toString());
      }
    };

    reader.onerror = err => {
      notificationError('Erro loading', 'Verify the font file and try again!');
      console.error(err.toString());
    };

    reader.readAsArrayBuffer(file);
  }, [ setFontFace, notificationError, notificationSuccess ]);

  // use effect
  useEffect(() => {
    const load = () => {
      const url = `${process.env.PUBLIC_URL}${process.env.REACT_APP_FONT_DEFAULT}`;

      fetch(url)
        .then(response => response.blob())
        .then((blob: any) => {
          const file = new File([blob], 'untitled', { type: blob.type });

          opentype.load(url, (err: any, font: any) => {
            if (err) {
              console.log(err);
              return;
            }
    
            document.body.style.fontFamily = font.names.fontFamily.en;
            setFont(font);
          });
          
          onReadFile(file);
        });
    };

    load();
  }, [ onReadFile ]);

  // render
  return (
    <LoadFontContext.Provider value={{
      font,
      onLoad: onReadFile
      }}>
        <FontSettingsProvider font={font} getFvarTable={getFvarTable}>
          {children}
        </FontSettingsProvider>
    </LoadFontContext.Provider>
  );
};

export { LoadFontContext, LoadFontProvider };
export default memo(LoadFontProvider);