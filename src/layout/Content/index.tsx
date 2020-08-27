import React, { useContext, useState } from 'react';
import { FlexboxGrid, Drawer, Button, ButtonToolbar, Icon } from 'rsuite';

import { LoadFontContext } from '../../providers/LoadFontProvider';
import { TextContext } from '../../providers/TextProvider';

import AnimationSlider from '../../components/AnimationSlider';
import DragDrop from '../../components/DragDrop';
import EditText from '../../components/EditText';
import InputText from '../../components/InputText';
import GalleryTemplates from '../../components/GalleryTemplates';
import Load from '../../components/Load';
import Preview from '../../components/Preview';
import SelectLetters from '../../components/SelectLetters';
import SelectFinalState from '../../components/SelectFinalState';

// content
const Content = () => {
  // context
  const fontContext = useContext(LoadFontContext);
  const textContext = useContext(TextContext);

  // items
  const items: any[] = [{ 
    element: <img src="https://via.placeholder.com/150x90.png?Text=Example" alt="sip" />,
    template: [{
      word: 1,
      letters: [
        { type: 'Neutra Curta', limit: 2, bezier: '0.83,0.01, 0.47, 0.59' },
        { type: 'Expressiva Curta', limit: 2, bezier: '0.83,1,0.40,1' },
        { type: 'Expressiva', limit: 1, bezier: '0.83,0.01,0.7,0.59' },
        { type: 'Expressiva Longa', limit: 1, bezier: '0.3,0.01,0.7,0.5' }
      ],
      limit: 2,
      init: 'Neutra'
    }],
    textProperties: {
      fontSize: 158,
      lineHeight: 0.9,
      letterSpacing: -10,
      textAlign: 'left', 
    }
  }, { 
    element:<img src="https://via.placeholder.com/150x90.png?Text=Example Digital" alt="sip" />,
    template: [{ 
      word: 1,
      letters: [
        { type: 'Neutra Curta', limit: 1, bezier: '0.83,0.01, 0.47, 0.59' },
        { type: 'Expressiva Curta', limit: 1, bezier: '0.83,1,0.40,1' },
        { type: 'Expressiva Longa', limit: 1, bezier: '0.3,0.01,0.7,0.5' }
      ],
      limit: 2,
      init: 'Neutra'
    }, { 
      word: 2,
      letters: [
        { type: 'Neutra Curta', limit: 1, bezier: '0.83,0.01, 0.47, 0.59' },
        { type: 'Expressiva Curta', limit: 2, bezier: '0.83,1,0.40,1' },
        { type: 'Expressiva Longa', limit: 2, bezier: '0.3,0.01,0.7,0.5' }
      ],
      limit: 4,
      init: 'Neutra Longa'
    }],
    textProperties: {
      fontSize: 45,
      lineHeight: 1.5,
      letterSpacing: 0,
      textAlign: 'center', 
    }
  }, { 
    element:<img src="https://via.placeholder.com/150x90.png?Text=Canal Brasil" alt="sip" />,
    template: [{ 
      word: 1,
      letters: [
        { type: 'Neutra Curta', limit: 2, bezier: '0.83,0.01, 0.47, 0.59' },
        { type: 'Expressiva Curta', limit: 2, bezier: '0.83,1,0.40,1' },
        { type: 'Expressiva Longa', limit: 1, bezier: '0.3,0.01,0.7,0.5' }
      ],
      limit: 2,
      init: 'Neutra'
    }, { 
      word: 2,
      letters: [
        { type: 'Neutra Curta', limit: 2, bezier: '0.83,0.01, 0.47, 0.59' },
        { type: 'Expressiva Curta', limit: 2, bezier: '0.83,1,0.40,1' },
        { type: 'Expressiva Longa', limit: 2, bezier: '0.3,0.01,0.7,0.5' }
      ],
      limit: 4,
      init: 'Neutra Longa'
    }],
    textProperties: {
      fontSize: 57,
      lineHeight: 1,
      letterSpacing: 1,
      textAlign: 'right', 
    }
  }, { 
    element:<img src="https://via.placeholder.com/150x90.png?Text=Example Full" alt="sip" />,
    template: [{ 
      word: 1,
      letters: [
        { type: 'Neutra Curta', limit: 2, bezier: '0.83,0.01, 0.47, 0.59' },
        { type: 'Expressiva Curta', limit: 2, bezier: '0.83,1,0.40,1' },
        { type: 'Expressiva Longa', limit: 1, bezier: '0.3,0.01,0.7,0.5' }
      ],
      limit: 2,
      init: 'Neutra'
    }, { 
      word: 2,
      letters: [
        { type: 'Neutra Curta', limit: 2, bezier: '0.83,0.01, 0.47, 0.59' },
        { type: 'Expressiva Curta', limit: 2, bezier: '0.83,1,0.40,1' },
        { type: 'Expressiva Longa', limit: 2, bezier: '0.3,0.01,0.7,0.5' }
      ],
      limit: 4,
      init: 'Neutra Longa'
    }],
    textProperties: {
      fontSize: 35,
      lineHeight: 1,
      letterSpacing: 0,
      textAlign: 'left', 
    }
  }];

  // state
  const [ pro, setPro ] = useState(false);
  const [ textPro, setTextPro ] = useState(false);
  
  // font
  const { font, onLoad } = fontContext;
  const { text, setText, textProperties } = textContext;

  // render
  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={9}>
        <Load font={font} />
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={9}>
        <ButtonToolbar>
          <DragDrop onLoad={onLoad} />

          <Button onClick={() => setPro(true)}>
            <Icon icon="gear-circle" />
          </Button>

          <Button onClick={() => setTextPro(true)}>
            <Icon icon="font" />
          </Button>
        </ButtonToolbar>
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={9}>
        <InputText label="Type here to text" setText={setText} text={text} />
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={9}>
        <label className="label">Gallery</label>
        <GalleryTemplates items={items} text={text} />
      </FlexboxGrid.Item>
      
      <FlexboxGrid.Item colspan={18}>
        <AnimationSlider />
        <Preview font={font} text={text} textProperties={textProperties} />
      </FlexboxGrid.Item>

      <Drawer
          size={'xs'}
          placement={'right'}
          show={pro}
          onHide={() => setPro(false)}>
            <Drawer.Header>
              <Drawer.Title>Advanced Properties</Drawer.Title>
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

      <Drawer
        size={'xs'}
        placement={'right'}
        show={textPro}
        onHide={() => setTextPro(false)}>
          <Drawer.Header>
            <Drawer.Title>Text properties</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <EditText font={font} />
          </Drawer.Body>
          <Drawer.Footer>
            <Button onClick={() => setTextPro(false)} appearance="primary">
              Confirm
            </Button>
            <Button onClick={() => setTextPro(false)} appearance="subtle">
              Cancel
            </Button>
        </Drawer.Footer>
      </Drawer>
    </FlexboxGrid>
  );
};

export default Content;