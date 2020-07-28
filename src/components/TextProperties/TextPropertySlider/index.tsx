import React, { FunctionComponent } from 'react';
import { ControlLabel, Icon, Slider } from 'rsuite';

import { ITextPropertySlider } from './interfaces';

import './text-property-slider.scss';

// text properties slider
const TextPropertySlider: FunctionComponent<ITextPropertySlider> = ({ icon, label, property, onChange, options, value }) => {
  // render
  return (
    <div className="text-property-slider">
      <ControlLabel className="label-control">
        <Icon icon={icon.toString()} />{label}
      </ControlLabel>
      
      <Slider
        {...options}
        tooltip
        progress
        onChange={(value: any) => onChange(value, property)} 
        value={value} />
    </div>
  );
};

export default TextPropertySlider;