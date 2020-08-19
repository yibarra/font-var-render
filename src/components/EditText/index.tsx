import React, { useContext, FunctionComponent } from 'react';

import { TextContext } from '../../providers/TextProvider';

import { IEditText } from './interfaces';

import TextProperties from '../../components/TextProperties';

import './edit-text.scss';

// edit
const Edit: FunctionComponent<IEditText> = ({ font }) => {
  // context
  const textContext = useContext(TextContext);
  const { textProperties, setTextProperties } = textContext;

  // render
  return (
    <div className="edit-text">
      <TextProperties textProperties={textProperties} setTextProperties={setTextProperties} />
    </div>
  );
};

export default Edit;