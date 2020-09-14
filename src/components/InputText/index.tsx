import React, { memo, FunctionComponent } from 'react';
import { Form, FormGroup, FormControl } from 'rsuite';

import { IInputText } from './interfaces';

import './input-text.scss';

// input text
const InputText: FunctionComponent<IInputText> = ({ label, setText, text }) => {
  // render
  return (
    <Form className="input-text">
      <FormGroup className="input-text--text">
        <p className="title">{label}</p>

        <FormControl
          placeholder={label}
          name="text"
          componentClass="textarea"
          value={text}
          onChange={value => setText(value.toString().toUpperCase())} />
      </FormGroup>
    </Form>
  );
};

export default memo(InputText);