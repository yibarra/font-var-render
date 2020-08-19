import React, { memo, useContext, FunctionComponent } from 'react';
import { Col, Message } from 'rsuite';

import { LettersContext } from '../../providers/LettersProvider';

import useFont from '../../uses/useFont';

import { ISelectFinalState } from './interfaces';

import './select-final-state.scss';

// select-final-state
const SelectFinalState: FunctionComponent<ISelectFinalState> = ({ font, text, textProperties }) => {
  // context
  const lettersContext = useContext(LettersContext);

  // props context
  const { getFvarTable } = useFont(font);
  const { letters, textWordLetter }:any = lettersContext;
  
  // render
  return (
    <div className="select-final-state">
      <Col className="select-final-state--title" xs={24}>
        <p>Select the final stage to letter</p>

        {!letters.length && <Message
          type="error"
          description={<p>Select at least one letter in the previous section.</p>} />}
      </Col>
      <Col className="select-final-state--content" style={{...textProperties}}>
        {font && textWordLetter(font, text, getFvarTable, () => {}, 2)}
      </Col>
    </div>
  );
};

export default memo(SelectFinalState);