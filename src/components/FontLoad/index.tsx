import React, { memo, FunctionComponent } from 'react';

import { IFontLoad } from './interfaces';

import './font-load.scss';

// header name
const FontLoad: FunctionComponent<IFontLoad> = ({ names }) => {
  // name
  const { fontFamily, version } = names;

  // render
  return (
    <div className="font-load">
      <div className="font-load--content">
        <p className="label">Font Family</p>
        <p className="name">{fontFamily.en}</p>
        <p className="version">{version.en}</p>
      </div>
    </div>
  );
};

export default memo(FontLoad);