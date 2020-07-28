import React, { memo, FunctionComponent } from 'react';

import DragDrop from '../DragDrop';
import FontLoad from '../FontLoad';

import { ILoad } from './interfaces';

import './load.scss';

// load
const Load: FunctionComponent<ILoad> = ({ font, onLoad }) => {
  // render
  return (
    <div className="load">
      {font &&
        <FontLoad names={font.names} />}

      <DragDrop onLoad={onLoad} />
    </div>
  );
};

export default memo(Load);