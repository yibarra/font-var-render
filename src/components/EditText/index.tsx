import React, { useContext, FunctionComponent } from 'react';

import { TextContext } from '../../providers/TextProvider';

// import AnimationSlider from '../../components/AnimationSlider';
// import Preview from '../../components/Preview';
import InputText from '../../components/InputText';
//import PanelUI from '../../components/PanelUI';
//import SelectLetters from '../../components/SelectLetters';
import TextProperties from '../../components/TextProperties';

import { IEditText } from './interfaces';

import './edit-text.scss';

// edit
const Edit: FunctionComponent<IEditText> = ({ font }) => {
  // context
  const textContext = useContext(TextContext);
  const { setText, text, textProperties, setTextProperties } = textContext;

  // render
  return (
    <div className="edit-text">
      <TextProperties textProperties={textProperties} setTextProperties={setTextProperties} />

      {font &&
        <InputText label="Type here to text" setText={setText} text={text} />}

    </div>
  );
};

export default Edit;