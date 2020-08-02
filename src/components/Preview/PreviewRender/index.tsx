import React, { FunctionComponent } from 'react';

import { IPreviewRender } from './interfaces';

// Preview render
const PreviewRender: FunctionComponent<IPreviewRender> = ({ font, letters, textProperties }) => {
  // render
  return (
    <canvas id="preview" />
  );
};

export default PreviewRender;