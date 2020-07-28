import React, { useContext } from 'react';
import { Form, Col, FormGroup, ControlLabel, Icon, Slider } from 'rsuite';

import { TextContext } from '../../providers/TextProvider';

// text properties
const TextProperties = () => {
  // context
  const textContext = useContext(TextContext);
  const { textProperties, setTextProperties }: any = textContext;

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
            <ControlLabel className="label-control">
              Font Size<Icon icon="font" />
            </ControlLabel>

            <Slider
              defaultValue={50}
              step={1}
              min={12}
              max={300}
              tooltip
              progress
              value={textProperties['fontSize']}
              onChange={(value: any) => onChange(value, 'fontSize')} />
          </Col>

          <Col xs={8}>
            <ControlLabel className="label-control">
              Line Height
              <Icon icon="text-height" />
            </ControlLabel>

            <Slider
              defaultValue={0.1}
              min={0.1}
              max={2}
              step={0.1}
              tooltip
              progress
              onChange={(value: any) => onChange(value, 'lineHeight')}
              value={textProperties['lineHeight']} />
          </Col>

          <Col xs={8}>
            <ControlLabel className="label-control">
              Line Height
              <Icon icon="text-width" />
            </ControlLabel>

            <Slider
              defaultValue={1}
              min={-50}
              max={50}
              step={1}
              tooltip
              progress
              onChange={(value: any) => onChange(value, 'letterSpacing')}
              value={textProperties['letterSpacing']} />
          </Col>
        </FormGroup>
      </FormGroup>
    </Form>
  );
};

export default TextProperties;