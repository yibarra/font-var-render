import React, { FunctionComponent } from 'react';
import { Form, Col, FormGroup } from 'rsuite';

import TextPropertySlider from './TextPropertySlider';

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
        <Col xs={6}>
          <TextPropertySlider
            icon="font"
            label="Font Size"
            property="fontSize"
            onChange={onChange}
            options={{ defaultValue: 35, step: 1, min: 12, max: 300 }}
            value={fontSize} />
        </Col>

        <Col xs={6}>
          <TextPropertySlider
            icon="text-height"
            label="Line Height"
            property="lineHeight"
            onChange={onChange}
            options={{ defaultValue: 0.1, step: 0.1, min: 0.1, max: 2 }}
            value={lineHeight} />
        </Col>

        <Col xs={6}>
          <TextPropertySlider
            icon="text-width"
            label="Letter Spacing"
            property="letterSpacing"
            onChange={onChange}
            options={{ defaultValue: 0, step: 1, min: -50, max: 50 }}
            value={letterSpacing} />
        </Col>

        <Col xs={6}>
          <p>Align Text</p>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default TextProperties;