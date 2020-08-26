import React, { memo, FunctionComponent } from 'react';

import FontLoad from '../FontLoad';

import { ILoad } from './interfaces';

import './load.scss';

// load
const Load: FunctionComponent<ILoad> = ({ font }) => {
  // render
  return (
    <div className="load">
      {font && <FontLoad names={font.names} />}
    </div>
  );
};

export default memo(Load);