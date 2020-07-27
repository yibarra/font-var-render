import React, { useContext, FunctionComponent } from 'react';
import { Row } from 'rsuite';

import { TextContext } from '../../providers/TextProvider';

// import AnimationSlider from '../../components/AnimationSlider';
// import Preview from '../../components/Preview';
import InputText from '../../components/InputText';
//import PanelUI from '../../components/PanelUI';
//import SelectLetters from '../../components/SelectLetters';
//import TextProperties from '../../components/TextProperties';

import { IEditText } from './interfaces';

// edit
const Edit: FunctionComponent<IEditText> = ({ font }) => {
  // context
  const textContext = useContext(TextContext);
  const { setText, text } = textContext;

  // render
  return (
    <Row className="edit">
      {font && <InputText label="Type here to text..." setText={setText} text={text} />}
    </Row>
  );
};

export default Edit;