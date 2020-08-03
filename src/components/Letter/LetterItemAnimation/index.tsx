import React, { memo, Fragment, FunctionComponent } from 'react';

import { ILetterItemAnimation } from './interfaces';

// letter animation
const LetterItemAnimation: FunctionComponent<ILetterItemAnimation> = ({ text }) => {
  // render
  return (
    <Fragment>
      <p className="letter--text end">{text}</p>
    </Fragment>
  );
};

export default memo(LetterItemAnimation);