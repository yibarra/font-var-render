import React, { memo, FunctionComponent, useCallback, useContext } from 'react';
import { Slider, Icon } from 'rsuite';

import { AnimationContext } from '../../providers/AnimationProvider';

import { IAnimationSlider } from './interfaces';

import './animation-slider.scss';

// animation slider
const AnimationSlider: FunctionComponent<IAnimationSlider> = ({ setPro }) => {
  // context
  const animationContext = useContext(AnimationContext);
  const { current, setCurrent } = animationContext;
  
  // slider
  const onSlider = useCallback((value:number) => {
    setCurrent(value);
  }, [ setCurrent ]);

  // render
  return (
    <div className="animation-slider">
      <div className="animation-slider--controls">
        <button className="btn btn-reset" onClick={() => setCurrent(0)}>
          refresh
        </button>

        <button className="btn-default" onClick={() => setPro(true)}>
          <Icon icon="gear-circle" />
          <span className="text">Select letter to animate</span>
        </button>
      </div>

      <div className="animation-slider--slider">
        <Slider
          onChange={onSlider}
          min={0}
          max={99}
          value={parseInt(current.toString(), 10)}
          progress
          defaultValue={0} />
      </div>
    </div>
  );
};

export default memo(AnimationSlider);