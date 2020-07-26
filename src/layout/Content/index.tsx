import React from 'react';
import { FlexboxGrid, Panel } from 'rsuite';

// content
const Content = () => {
  // render
  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={12}>
        <Panel header="Panel title" collapsible bordered>
          
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default Content;