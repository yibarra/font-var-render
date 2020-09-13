import React, { FunctionComponent, memo, useCallback } from 'react';

import { IStepsFooter } from './interfaces';

import './steps-footer.scss';

// steps footer
const StepsFooter: FunctionComponent<IStepsFooter> = ({ onPrevNext }) => {
  // next step
  const checkNext = useCallback((type: string) => {
    const btns = document.body.querySelectorAll('.letter-item-animation');
    
    if (btns) {
      for (let i = 0; i < btns.length; i++) {
        const btn: any = btns[i];

        if (btn instanceof Object) btn.click();
      }
    }

    onPrevNext(type);
  }, [ onPrevNext ]);

  // render
  return (
    <div className="steps-footer">
      <button className="btn prev" onClick={() => checkNext('prev')}>back</button>
      <button className="btn next" onClick={() => checkNext('next')}>next</button>
    </div>
  );
};

export default memo(StepsFooter);