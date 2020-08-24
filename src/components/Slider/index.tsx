import React, { Children, FunctionComponent } from 'react';
import { useSwipeable } from 'react-swipeable';

import { ISlider } from './interfaces';

import './slider.scss';

// Slider
const Slider: FunctionComponent<ISlider> = ({ children, current, direction, last, onPrevNext, type }) => {
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
    <div className="slider" data-direction={direction} data-type={type} {...handlers}>
      <ul className="slider--list">
        {children && Children.map(children, (child, index) =>
          <li className="slider--item" data-current={current === index} data-last={last === index}>{child}</li>)}
      </ul>
    </div>
  );
};

export default Slider;