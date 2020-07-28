import React from 'react';
import { Col } from 'rsuite';

import { IFontLoad } from './interfaces';

import './font-load.scss';

// header name
const FontLoad = ({ names }: IFontLoad) => {
  // name
  const { fontFamily, version } = names;

  // render
  return (
    <Col className="font-load" xs={24}>
      <Col className="font-load--content" xs={24}>
        <p className="label">Font Family</p>

        <p className="name">{fontFamily.en}</p>
        <p className="version">{version.en}</p>
      </Col>
    </Col>
  );
};

export default FontLoad;