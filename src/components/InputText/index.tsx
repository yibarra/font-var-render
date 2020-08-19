import React, { FunctionComponent } from 'react';
import { Form, FormGroup, FormControl } from 'rsuite';

import { IInputText } from './interfaces';

import './input-text.scss';

// input text
const InputText: FunctionComponent<IInputText> = ({ label, setText, text }) => {
  // render
  return (
    <Form className="input-text">
      <FormGroup className="input-text--text">
        <label className="label">{label}</label>

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

export default InputText;