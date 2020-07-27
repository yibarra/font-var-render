import React, { useContext } from 'react';
import { FlexboxGrid, Panel } from 'rsuite';

import { LoadFontContext } from '../../providers/LoadFontProvider';
import { FontSettingsContext } from '../../providers/FontSettingsProvider';

import Load from '../../components/Load';

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
      <FlexboxGrid.Item colspan={16}>
        <Panel header="Font Load & Info" collapsible bordered>
          <Load font={font} onLoad={onLoad} />
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default Content;