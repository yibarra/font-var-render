import React, { useContext } from 'react';
import { FlexboxGrid } from 'rsuite';

import { FontSettingsContext } from '../../providers/FontSettingsProvider';
import { LoadFontContext } from '../../providers/LoadFontProvider';
import { TextContext } from '../../providers/TextProvider';

import AnimationSlider from '../../components/AnimationSlider';
import EditText from '../../components/EditText';
import InputText from '../../components/InputText';
import Load from '../../components/Load';
import Preview from '../../components/Preview';
import SelectLetters from '../../components/SelectLetters';
import SelectFinalState from '../../components/SelectFinalState';
import SelectInitState from '../../components/SelectInitState';

// content
const Content = () => {
  // context
  const fontSettingsContext = useContext(FontSettingsContext);
  const fontContext = useContext(LoadFontContext);
  const textContext = useContext(TextContext);
  
  // font
  const { font, onLoad } = fontContext;
  const { settings, initialState, setInitialState } = fontSettingsContext;
  const { text, setText, textProperties } = textContext;

  // render
  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={18}>
        <Load font={font} onLoad={onLoad} />
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={18}>
        <EditText font={font} />
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={9}>
        <InputText label="Type here to text" setText={setText} text={text} />
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={9}>
        <SelectLetters font={font} text={text} />
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={9}>
        <SelectInitState
          font={font} 
          initialState={initialState}
          setInitialState={setInitialState} />
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={9}>
        <SelectFinalState
          font={font}
          text={text}
          textProperties={textProperties} />
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={18}>
        <Preview font={font} text={text} textProperties={textProperties} />
        <AnimationSlider />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default Content;