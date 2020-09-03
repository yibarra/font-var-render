import React, { memo, useContext, FunctionComponent } from 'react';
import { Col } from 'rsuite';

import { LettersContext } from '../../providers/LettersProvider';
import useFont from '../../uses/useFont';

import { IPreview } from './interfaces';

import './preview.scss';

// preview
const Preview: FunctionComponent<IPreview> = ({ font, text, textProperties }) => {
  const { getFvarTable } = useFont(font);

  // context
  const lettersContext = useContext(LettersContext);
  const { textWordLetter, getAlign }:any = lettersContext;
  
  // render
  return (
    <div className="preview">
      <Col className="preview--content" style={{...textProperties, justifyContent: getAlign(textProperties.textAlign) }}>
        {font && textWordLetter(font, text, getFvarTable, () => {}, 3)}
      </Col>

      <canvas id="preview-canvas" width="1920" height="1080" />
      <video />
    </div>
  );
};

export default memo(Preview);