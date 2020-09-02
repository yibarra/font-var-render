import React, { memo, FunctionComponent, useContext } from 'react';
import { Button, Col, Slider } from 'rsuite';

import { AnimationContext } from '../../providers/AnimationProvider';

import { IAnimationSlider } from './interfaces';

import './animation-slider.scss';

// animation slider
const AnimationSlider: FunctionComponent<IAnimationSlider> = () => {
  // context
  const animationContext = useContext(AnimationContext);
  const { current, setCurrent, onPlay, play } = animationContext;
  
  // slider
  const onSlider = (value:number) => {
    setCurrent(value);
  };

  // render
  return (
    <Col className="animation-slider" xs={24}>
      <div className="animation-slider--title">
        <p>Time Controls</p>
      </div>

      <div className="animation-slider--controls">
        <Button
          className={play === true ? 'btn-ui active min' : 'btn-ui min'}
          onClick={() => onPlay()}>
          <span className="text">Render</span>
        </Button>
        <Button className="btn btn-reset" onClick={() => setCurrent(0)}></Button>
      </div>  

      <div className="animation-slider--slider">
        <Slider
          onChange={onSlider}
          min={0}
          max={100}
          value={parseInt(current.toString(), 10)}
          progress
          defaultValue={0} />
      </div>
    </Col>
  );
};

export default memo(AnimationSlider);