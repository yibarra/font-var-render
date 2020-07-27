import React, { useContext } from 'react';
import { FlexboxGrid } from 'rsuite';

import { LoadFontContext } from '../../providers/LoadFontProvider';
import { FontSettingsContext } from '../../providers/FontSettingsProvider';

import Load from '../../components/Load';
import EditText from '../../components/EditText';
import TextProperties from '../../components/TextProperties';

// content
const Content = () => {
  // context
  const fontSettingsContext = useContext(FontSettingsContext);
  const fontContext = useContext(LoadFontContext);

  const { font, onLoad } = fontContext;
  const { settings }:any = fontSettingsContext;

  // render
  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={18}>
        <Load font={font} onLoad={onLoad} />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={18}>
        <EditText font={font} />
        <TextProperties />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default Content;