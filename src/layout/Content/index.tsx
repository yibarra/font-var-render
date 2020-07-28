import React, { useContext } from 'react';
import { FlexboxGrid } from 'rsuite';

import { LoadFontContext } from '../../providers/LoadFontProvider';
import { FontSettingsContext } from '../../providers/FontSettingsProvider';
import { TextContext } from '../../providers/TextProvider';

import Load from '../../components/Load';
import EditText from '../../components/EditText';
import InputText from '../../components/InputText';
import SelectLetters from '../../components/SelectLetters';

// content
const Content = () => {
  // context
  const fontSettingsContext = useContext(FontSettingsContext);
  const fontContext = useContext(LoadFontContext);
  const textContext = useContext(TextContext);
  
  // font
  const { font, onLoad } = fontContext;
  const { settings } = fontSettingsContext;
  const { text, setText } = textContext;

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
    </FlexboxGrid>
  );
};

export default Content;