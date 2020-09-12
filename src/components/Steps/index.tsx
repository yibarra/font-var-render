import React, { FunctionComponent } from 'react';

import SliderBase from '../Slider/Base';
import StepsHeader from './StepsHeader';
import StepsSlider from '../Slider/Steps';
import StepsFooter from './StepsFooter';

import { ISteps } from './interfaces';

import './steps.scss';

// steps
const Steps: FunctionComponent<ISteps> = ({ children, current, direction, last, onPrevNext }) => {
  // render
  return (
    <div className="steps">
      <StepsHeader
        current={current}
        last={last}
        onPrevNext={onPrevNext} />

      <StepsSlider
        current={current}
        direction={direction}
        items={Array.from(Array(children).keys())}
        last={last}
        onPrevNext={onPrevNext}>
        {children}
      </StepsSlider>

      <StepsFooter
        onPrevNext={onPrevNext} />
    </div>
  );
};

export default SliderBase(Steps);