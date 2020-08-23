import React, { FunctionComponent } from 'react';
import { Form, Col, FormGroup, ButtonGroup, IconButton, Icon } from 'rsuite';

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

  // on align
  const onAlign = (value: string) => {
    const result = { ...textProperties, textAlign: value };
    setTextProperties(result);
  };

  // render
  return (
    <Form className="text-properties">
      <FormGroup>
        <Col xs={20}>
          <Col xs={8}>
            <TextPropertySlider
              icon="font"
              label="Font Size"
              property="fontSize"
              onChange={onChange}
              options={{ defaultValue: 60, step: 1, min: 32, max: 200 }}
              value={fontSize} />
          </Col>

          <Col xs={8}>
            <TextPropertySlider
              icon="text-height"
              label="Line Height"
              property="lineHeight"
              onChange={onChange}
              options={{ defaultValue: 0.1, step: 0.1, min: 0.1, max: 2 }}
              value={lineHeight} />
          </Col>

          <Col xs={8}>
            <TextPropertySlider
              icon="text-width"
              label="Letter Spacing"
              property="letterSpacing"
              onChange={onChange}
              options={{ defaultValue: 0, step: 1, min: -20, max: 20 }}
              value={letterSpacing} />
          </Col>
        </Col>

        <Col xs={4} className="text-properties--align">
          <ButtonGroup>
            <IconButton icon={<Icon icon="align-left"/>} onClick={() => onAlign('left')} />
            <IconButton icon={<Icon icon="align-center"/>} onClick={() => onAlign('center')} />
            <IconButton icon={<Icon icon="align-right"/>} onClick={() => onAlign('right')} />
          </ButtonGroup>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default TextProperties;