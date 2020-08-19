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
  const { letters, getCountWords, getLineBreak, getAlign }:any = lettersContext;

  // text split
  const textSplit = useCallback((font: IFontInfo, text: string = '') => {
    const items:any = [];
    const breaks = getLineBreak(text);
    
    for (let k = 0; k < breaks.length; k++) {
      const textLine = breaks[k];
      const words: any = getCountWords(textLine);

      for (let i = 0; i < words.length; i++) {
        const item = words[i];
  
        items.push(<Word
          index={i}
          key={`${k}${i}`}
          font={font}
          word={item}
          letters={letters}
          getFvarTable={getFvarTable}
          type={3}
          onChange={() => {}} />);
      }

      items.push(<div className="separator" key={`separator${k}`}></div>)
    }

    return items;
  }, [ getFvarTable, letters, getCountWords, getLineBreak ]);
  
  // render
  return (
    <div className="preview">
      <Col className="preview--content" style={{...textProperties, justifyContent: getAlign(textProperties.textAlign) }}>
        {font && textSplit(font, text)}
      </Col>

      <canvas id="preview-canvas" width="1920" height="1080" />
      <video controls />
    </div>
  );
};

export default memo(Preview);