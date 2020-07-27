import React from 'react';
import { Row, Col } from 'rsuite';

import { IFontLoad } from './interfaces';

//import './font-load.scss';

// header name
const FontLoad = ({ names }: IFontLoad) => {
  // name
  const { fontFamily, version } = names;

  // render
  return (
    <Row className="font-load">
      <Col className="font-load--item" xs={24}>
        <p className="name">
          <strong>Font Family</strong>
        </p>

        <Col className="container" xs={24}>
          <p>{fontFamily.en}</p>
          <p>{version.en}</p>
        </Col>
      </Col>
    </Row>
  );
};

export default FontLoad;