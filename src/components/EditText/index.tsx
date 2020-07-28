import React, { useContext, FunctionComponent } from 'react';

import { TextContext } from '../../providers/TextProvider';

// import AnimationSlider from '../../components/AnimationSlider';
// import Preview from '../../components/Preview';
//import PanelUI from '../../components/PanelUI';
//import SelectLetters from '../../components/SelectLetters';
import TextProperties from '../../components/TextProperties';

import { IEditText } from './interfaces';

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