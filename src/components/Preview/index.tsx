import React, { memo, useContext, useCallback, FunctionComponent } from 'react';
import { Col } from 'rsuite';

import { LettersContext } from '../../providers/LettersProvider';

import useFont from '../../uses/useFont';

import Letter from '../Letter';

import { IFontInfo } from '../../providers/FontSettingsProvider/interfaces';
import { IPreview } from './interfaces';

import './preview.scss';

// preview
const Preview: FunctionComponent<IPreview> = ({ font, text, textProperties }) => {
  // context
  const lettersContext = useContext(LettersContext);

  // props context
  const { getFvarTable } = useFont(font);
  const { letters }:any = lettersContext;

  // text split
  const textSplit = useCallback((font: IFontInfo, text: string = '') => {
    const textFull = text;
    const items:any = [];

    for (let i = 0; i < textFull.length; i++) {
      const item = textFull[i];

      items.push(<Letter
        items={letters}
        fvar={getFvarTable(font)}
        text={item === ' ' ? '\u00A0' : item}
        index={i}
        key={i}
        type={3}
        onChange={() => {}} />);
    }

    return items;
  }, [ getFvarTable, letters ]);
  
  // render
  return (
    <div className="preview">
      <Col className="preview--canvas" xs={24}></Col>

      <Col className="preview--content" style={{...textProperties}}>
        {font && textSplit(font, text)}
      </Col>

      <canvas id="preview-canvas" width="1020" height="1080" />
    </div>
  );
};

export default memo(Preview);