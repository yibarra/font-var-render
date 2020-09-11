import React, { FunctionComponent } from 'react';

import StepsSlider from '../Slider/Steps';
import SliderBase from '../Slider/Base';

import { ISteps } from './interfaces';

// steps
const Steps: FunctionComponent<ISteps> = ({ children, current, direction, last, onPrevNext }) => {

  // render
  return (
    <div className="step">
      <StepsSlider current={current} direction={direction} last={last} onPrevNext={onPrevNext} >
        {children}
      </StepsSlider>
    </div>
  );
};

export default SliderBase(Steps);