import React, { memo, FunctionComponent, useCallback } from 'react';
import { Form, Button, FormGroup, FormControl } from 'rsuite';

import { IInputText } from './interfaces';

import './input-text.scss';

// input text
const InputText: FunctionComponent<IInputText> = ({ label, setText, text }) => {
  // generate
  const generate = useCallback(() => {
    const btns = document.body.querySelectorAll('.letter-item-animation');

    if (btns) {
      for (let i = 0; i < btns.length; i++) {
        const btn: any = btns[i];

        if (btn instanceof Object) {
          btn.click();
        }
      }
    }
  }, []);

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

      <Button onClick={() => generate()}>Send</Button>
    </Form>
  );
};

export default memo(InputText);