import React, { memo, useContext, useCallback, FunctionComponent } from 'react';
import { Col, Message } from 'rsuite';

import { LettersContext } from '../../providers/LettersProvider';

import useFont from '../../uses/useFont';

import Letter from '../Letter';
import PreviewRender from './PreviewRender';

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
        type={2}
        onChange={() => {}} />);
    }

    return items;
  }, [ getFvarTable, letters ]);
  
  // render
  return (
    <div className="preview">
      <Col className="preview--title" xs={24}>
        {!letters.length && <Message
          type="error"
          description={
            <p>
              Select at least one letter in the previous section.
            </p>} />}
      </Col>
      <Col className="preview--content" xs={24} style={{...textProperties}}>
        {font && textSplit(font, text)}
      </Col>
      <Col className="preview--render" xs={24}>
        <PreviewRender font={font} letters={letters} textProperties={textProperties} />
      </Col>
    </div>
  );
};

export default memo(Preview);