import React, { memo, useContext, useCallback, FunctionComponent } from 'react';
import { Col } from 'rsuite';

import { LettersContext } from '../../providers/LettersProvider';
import useFont from '../../uses/useFont';

import Word from '../Word';

import { IFontInfo } from '../../providers/FontSettingsProvider/interfaces';
import { IPreview } from './interfaces';

import './preview.scss';

// preview
const Preview: FunctionComponent<IPreview> = ({ font, text, textProperties }) => {
  // context
  const lettersContext = useContext(LettersContext);

  // props context
  const { getFvarTable } = useFont(font);
  const { letters, getCountWords }:any = lettersContext;

  // text split
  const textSplit = useCallback((font: IFontInfo, text: string = '') => {
    const items:any = [];
    const words: any = getCountWords(text);

    for (let i = 0; i < words.length; i++) {
      const item = words[i];

      items.push(<Word
        index={i}
        key={i}
        font={font}
        word={item}
        letters={letters}
        getFvarTable={getFvarTable}
        type={3}
        onChange={() => {}} />);
    }

    return items;
  }, [ getFvarTable, letters, getCountWords ]);
  
  // render
  return (
    <div className="preview">
      <Col className="preview--content" style={{...textProperties}}>
        {font && textSplit(font, text)}
      </Col>

      <canvas id="preview-canvas" width="1920" height="1080" />
      <video controls />
    </div>
  );
};

export default memo(Preview);