import React, { memo, useContext, useCallback, FunctionComponent } from 'react';
import { Col, Message } from 'rsuite';

import { LettersContext } from '../../providers/LettersProvider';

import useFont from '../../uses/useFont';

import Word from '../Word';

import { IFontInfo } from '../../providers/FontSettingsProvider/interfaces';
import { ISelectFinalState } from './interfaces';

import './select-final-state.scss';

// select-final-state
const SelectFinalState: FunctionComponent<ISelectFinalState> = ({ font, text, textProperties }) => {
  // context
  const lettersContext = useContext(LettersContext);

  // props context
  const { getFvarTable } = useFont(font);
  const { letters, getCountWords }:any = lettersContext;

  // text split
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
        type={2}
        onChange={() => {}} />);
    }

    return items;
  }, [ getFvarTable, letters, getCountWords ]);
  
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