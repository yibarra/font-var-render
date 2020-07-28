import React, { memo, FunctionComponent, useContext } from 'react';
import { Button, Icon, Slider } from 'rsuite';

import { AnimationContext } from '../../providers/AnimationProvider';

import { IAnimationSlider } from './interfaces';

import './animation-slider.scss';

// animation slider
const AnimationSlider: FunctionComponent<IAnimationSlider> = () => {
  // context
  const animationContext = useContext(AnimationContext);
  const { current, setCurrent, onOptions, options, onPlay, play } = animationContext;
  
  // slider
  const onSlider = (value:number) => {
    setCurrent(value);
  };

  // render
  return (
    <div className="animation-slider">
      <div className="animation-slider--controls">
        <Button
          className={play === true ? 'btn-ui active min' : 'btn-ui min'}
          onClick={() => onPlay()}>
          <Icon icon="play" />
          <Icon icon="pause" />
        </Button>

        <Button
          className={options.repeat === true ? 'btn-ui active min' : 'btn-ui min'}
          onClick={() => onOptions({ repeat: !options.repeat })}>
          <Icon icon="repeat" />
        </Button>
      </div>

      <div className="animation-slider--slider">
        <Slider
          onChange={onSlider}
          min={0}
          max={100}
          value={current}
          progress
          defaultValue={0} />
      </div>
    </div>
  );
};

export default memo(AnimationSlider);