import React, { FunctionComponent } from 'react';

import { IStepsHeader } from './interfaces';

import './steps-header.scss';

// steps header
const StepsHeader: FunctionComponent<IStepsHeader> = () => {
  // render
  return (
    <div className="steps-header">
      <button className="">back</button>
    </div>
  );
};

export default StepsHeader;