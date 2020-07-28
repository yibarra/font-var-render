import React, { FunctionComponent } from 'react';
import { Form, Col, FormGroup } from 'rsuite';

import ITextPropertySlider from './TextPropertySlider';

import { ITextProperties } from './interfaces';

import './text-properties.scss';

// text properties
const TextProperties: FunctionComponent<ITextProperties> = ({ textProperties, setTextProperties }) => {
  // text
  const { fontSize, lineHeight, letterSpacing } = textProperties;
  
  // on change
  const onChange = (value: any, name: string) => {
    const item:any = {};
    item[name] = Number(value);

    const result = { ...textProperties, ...item };
    setTextProperties(result);
  };

  // render
  return (
    <Form className="text-properties">
      <FormGroup>
        <FormGroup>
          <Col xs={8}>
            <ITextPropertySlider
              icon="font"
              label="Font Size"
              property="fontSize"
              onChange={onChange}
              options={{ defaultValue: 50, step: 1, min: 12, max: 300 }}
              value={fontSize} />
          </Col>

          <Col xs={8}>
            <ITextPropertySlider
              icon="text-height"
              label="Line Height"
              property="lineHeight"
              onChange={onChange}
              options={{ defaultValue: 0.1, step: 0.1, min: 0.1, max: 2 }}
              value={lineHeight} />
          </Col>

          <Col xs={8}>
            <ITextPropertySlider
              icon="text-width"
              label="letterSpacing"
              property="letterSpacing"
              onChange={onChange}
              options={{ defaultValue: 0, step: 1, min: -50, max: 50 }}
              value={letterSpacing} />
          </Col>
        </FormGroup>
      </FormGroup>
    </Form>
  );
};

export default TextProperties;