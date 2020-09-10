import React, { memo, FunctionComponent } from 'react';

import CanvasRender from '../CanvasRender';

import { IPreview } from './interfaces';

import './preview.scss';

// preview
const Preview: FunctionComponent<IPreview> = () => {  
  // render
  return (
    <div className="preview">
      <CanvasRender id="preview-canvas" width={1920} height={1080}/>
    </div>
  );
};

export default memo(Preview);