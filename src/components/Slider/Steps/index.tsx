import React, { FunctionComponent, Children } from 'react';
import { useSwipeable } from 'react-swipeable';

import SliderBase from '../Base';

import { IStepsSlider } from './interfaces';

import './steps.scss';

// steps
const StepsSlider: FunctionComponent<IStepsSlider> = ({ children, current, direction, last, onPrevNext }) => {
  // handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      return onPrevNext('next')
    },
    onSwipedRight: () => onPrevNext('prev'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // render
  return (
    <div className="steps-slider" data-direction={direction} {...handlers}>


      <ul className="steps-slider--list">
        {children && Children.map(children, (child, index) =>
          <li className="steps-slider--item" data-active={current === index} data-last={last === index}>{child}</li>)}
      </ul>
    </div>
  );
};

export default SliderBase(StepsSlider);