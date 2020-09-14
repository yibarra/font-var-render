import React, { memo, useContext, FunctionComponent } from 'react';

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
  const { textWordLetter }:any = lettersContext;
  
  // render
  return (
    <div className="select-final-state">
      <div className="select-final-state--title">
        <p className="text">Select the initial and the final stage of each letter</p>
      </div>
      <div className="select-final-state--content" style={{...textProperties}}>
        {font &&
        textWordLetter(font, text, getFvarTable, (e: any) => {}, 2)}
      </div>
    </div>
  );
};

export default memo(SelectFinalState);