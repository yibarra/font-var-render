import React, { FunctionComponent } from 'react';
import { Button, Icon } from 'rsuite';

import { IStepsHeader } from './interfaces';

import './steps-header.scss';

// steps header
const StepsHeader: FunctionComponent<IStepsHeader> = ({ current, last, onPrevNext }) => {
  // render
  return (
    <div className="steps-header">
      <Button className="btn-default clear" data-active={current > 0 && current !== last} onClick={() => onPrevNext('prev')}>
        <Icon icon="back-arrow" />
        <span className="text">back</span>
      </Button>
    </div>
  );
};

export default StepsHeader;