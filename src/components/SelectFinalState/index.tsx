import React, { memo, useContext, useCallback, FunctionComponent } from 'react';
import { Col, Message } from 'rsuite';

import { LettersContext } from '../../providers/LettersProvider';

import useFont from '../../uses/useFont';

import Letter from '../Letter';

import { IFontInfo } from '../../providers/FontSettingsProvider/interfaces';
import { ISelectFinalState } from './interfaces';

import './select-final-state.scss';

// select-final-state
const SelectFinalState: FunctionComponent<ISelectFinalState> = ({ font, text, textProperties }) => {
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
    <div className="select-final-state">
      <Col className="select-final-state--title" xs={24}>
        <p>Select the final stage to letter</p>

        {!letters.length && <Message
          type="error"
          description={
            <p>
              Select at least one letter in the previous section.
            </p>
          }
        />}
      </Col>
      <Col className="select-final-state--content" style={{...textProperties}}>
        {font && textSplit(font, text)}
      </Col>
    </div>
  );
};

export default memo(SelectFinalState);