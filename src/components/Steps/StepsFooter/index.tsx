import React, { FunctionComponent } from 'react';

import { IStepsFooter } from './interfaces';

import './steps-footer.scss';

// steps footer
const StepsFooter: FunctionComponent<IStepsFooter> = ({ onPrevNext }) => {
  // render
  return (
    <div className="steps-footer">
      <button className="" onClick={() => onPrevNext('prev')}>back</button>

      <button className="" onClick={() => onPrevNext('next')}>next</button>
    </div>
  );
};

export default StepsFooter;