import React, { memo, Fragment, FunctionComponent } from 'react';

import { Row } from 'rsuite';

import DragDrop from '../DragDrop';
import FontLoad from '../FontLoad';
//import FontInfo from '../FontInfo';

import { ILoad } from './interfaces';

// import './load.scss';

// load
const Load: FunctionComponent<ILoad> = ({ font, onLoad }) => {
  // render
  return (
    <Row className="load">
      {font && font.tables instanceof Object &&
        <Fragment>
          <FontLoad names={font.names} />
          
        </Fragment>}

      <DragDrop onLoad={onLoad} />
    </Row>
  );

  /* <FontInfo names={font.names} font={font} /> */
};

export default memo(Load);