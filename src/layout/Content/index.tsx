import React, { useContext, useState } from 'react';
import { FlexboxGrid, Drawer, Button } from 'rsuite';

import { LoadFontContext } from '../../providers/LoadFontProvider';
import { TextContext } from '../../providers/TextProvider';
import { TemplateContext } from '../../providers/TemplateProvider';

import AnimationSlider from '../../components/AnimationSlider';
import EditText from '../../components/EditText';
import InputText from '../../components/InputText';
import Load from '../../components/Load';
import Preview from '../../components/Preview';
import SelectLetters from '../../components/SelectLetters';
import SelectFinalState from '../../components/SelectFinalState';

// content
const Content = () => {
  // context
  const fontContext = useContext(LoadFontContext);
  const templateContext = useContext(TemplateContext);
  const textContext = useContext(TextContext);

  // state
  const [ pro, setPro ] = useState(false);
  
  // font
  const { font, onLoad } = fontContext;
  const { generate } = templateContext;
  const { text, setText, textProperties } = textContext;

  // render
  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={18}>
        <Load font={font} onLoad={onLoad} />
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={9}>
        <InputText label="Type here to text" setText={setText} text={text} />

        <button onClick={() => generate(text)}>GENERATE TEMPLATE</button>
        <button onClick={() => setPro(true)}>Avanze Controls</button>
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={18}>
        <EditText font={font} />
      </FlexboxGrid.Item>
      
      <FlexboxGrid.Item colspan={18}>
        <AnimationSlider />
        <Preview font={font} text={text} textProperties={textProperties} />
      </FlexboxGrid.Item>

      <Drawer
          size={'sm'}
          placement={'right'}
          show={pro}
          onHide={() => setPro(false)}>
            <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <SelectLetters font={font} text={text} />
              <SelectFinalState
                font={font}
                text={text}
                textProperties={textProperties} />
            </Drawer.Body>
            <Drawer.Footer>
              <Button onClick={() => setPro(false)} appearance="primary">
                Confirm
              </Button>
              <Button onClick={() => setPro(false)} appearance="subtle">
                Cancel
              </Button>
          </Drawer.Footer>
        </Drawer>
    </FlexboxGrid>
  );
};

export default Content;