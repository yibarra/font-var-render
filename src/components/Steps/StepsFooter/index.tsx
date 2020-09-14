import React, { FunctionComponent, memo, useCallback, useContext } from 'react';
import { AnimationContext } from '../../../providers/AnimationProvider';

import { IStepsFooter } from './interfaces';

import './steps-footer.scss';

// steps footer
const StepsFooter: FunctionComponent<IStepsFooter> = ({ current, last, count, onPrevNext }) => {
  // context
  const animationContext: any = useContext(AnimationContext);
  const { processing, setCurrent, setProcessing } = animationContext;

  // init render
  const initRender = useCallback(() => {
    const value = !processing;
    setProcessing(value);

    if (processing === true) return setCurrent(1);
  }, [ processing, setCurrent, setProcessing ]);

  // next step
  const checkNext = useCallback((type: string) => {
    const btns = document.body.querySelectorAll('.letter-item-animation');
    
    if (btns) {
      for (let i = 0; i < btns.length; i++) {
        const btn: any = btns[i];

        if (btn instanceof Object) btn.click();
      }
    }

    if (last === (count - 1) && type !== 'prev') {
      initRender();
    } else {
      onPrevNext(type);
    }
  }, [ count, last, initRender, onPrevNext ]);

  // render
  return (
    <div className="steps-footer">
      <button className="btn prev" onClick={() => checkNext('prev')} disabled={current === 0}>back</button>
      <button className="btn next" onClick={() => checkNext('next')}>next</button>
    </div>
  );
};

export default memo(StepsFooter);