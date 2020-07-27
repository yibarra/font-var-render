import React, { FunctionComponent } from 'react';
import { Form, FormGroup, FormControl } from 'rsuite';

import { IInputText } from './interfaces';

// input text
const InputText: FunctionComponent<IInputText> = ({ label, setText, text }) => {
  // render
  return (
    <Form className="input-text">
      <FormGroup className="input-text--text">
        <label>{label}</label>

        <FormControl
          placeholder={label}
          name="textarea"
          componentClass="input"
          value={text}
          onChange={value => setText(value)} />
      </FormGroup>
    </Form>
  );
};

export default InputText;