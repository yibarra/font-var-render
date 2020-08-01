import React, { FunctionComponent, useContext, useEffect } from 'react';

import { AnimationContext } from '../../../providers/AnimationProvider';

import { IPreviewRender } from './interfaces';

// Preview render
const PreviewRender: FunctionComponent<IPreviewRender> = ({ font, letters, textProperties }) => {
  // state
  const { current, onOptions, options, play, onPlay } = useContext(AnimationContext);
  

  // use effect
  useEffect(() => {
    
  }, [ current ]);

  // render
  return (
    <canvas id="preview" />
  );
};

export default PreviewRender;