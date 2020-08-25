import React, { useContext, useState } from 'react';
import { FlexboxGrid, Drawer, Button, ButtonToolbar, Icon } from 'rsuite';

import { LoadFontContext } from '../../providers/LoadFontProvider';
import { TextContext } from '../../providers/TextProvider';

import AnimationSlider from '../../components/AnimationSlider';
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
    element: <img src="https://via.placeholder.com/150?Text=Example" alt="sip" />,
    template: [{ 
      word: 1,
      letters: [
        { type: 'Neutra Curta', limit: 2, bezier: '0.83,0.01, 0.47, 0.59' },
        { type: 'Expressiva Curta', limit: 2, bezier: '0.83,1,0.40,1' },
        { type: 'Expressiva', limit: 1, bezier: '0.83,0.01,0.7,0.59' },
        { type: 'Expressiva Longa', limit: 1, bezier: '0.3,0.01,0.7,0.5' }
      ],
      limit: 2,
    }],
  }, { 
    element:<img src="https://via.placeholder.com/150?Text=Example Digital" alt="sip" />,
    template: [{ 
      word: 1,
      letters: [
        { type: 'Neutra Curta', limit: 1, bezier: '0.83,0.01, 0.47, 0.59' },
        { type: 'Expressiva Curta', limit: 1, bezier: '0.83,1,0.40,1' },
        { type: 'Expressiva Longa', limit: 1, bezier: '0.3,0.01,0.7,0.5' }
      ],
      limit: 2,
    }, { 
      word: 2,
      letters: [
        { type: 'Neutra Curta', limit: 1, bezier: '0.83,0.01, 0.47, 0.59' },
        { type: 'Expressiva Curta', limit: 2, bezier: '0.83,1,0.40,1' },
        { type: 'Expressiva Longa', limit: 2, bezier: '0.3,0.01,0.7,0.5' }
      ],
      limit: 4,
    }],
  }, { 
    element:<img src="https://via.placeholder.com/150?Text=Canal Brasil" alt="sip" />,
    template: [{ 
      word: 1,
      letters: [
        { type: 'Neutra Curta', limit: 2, bezier: '0.83,0.01, 0.47, 0.59' },
        { type: 'Expressiva Curta', limit: 2, bezier: '0.83,1,0.40,1' },
        { type: 'Expressiva Longa', limit: 1, bezier: '0.3,0.01,0.7,0.5' }
      ],
      limit: 2,
    }, { 
      word: 2,
      letters: [
        { type: 'Neutra Curta', limit: 2, bezier: '0.83,0.01, 0.47, 0.59' },
        { type: 'Expressiva Curta', limit: 2, bezier: '0.83,1,0.40,1' },
        { type: 'Expressiva Longa', limit: 2, bezier: '0.3,0.01,0.7,0.5' }
      ],
      limit: 4,
    }],
  }, { 
    element:<img src="https://via.placeholder.com/150?Text=Example Full" alt="sip" />,
    template: [{ 
      word: 1,
      letters: [
        { type: 'Neutra Curta', limit: 2, bezier: '0.83,0.01, 0.47, 0.59' },
        { type: 'Expressiva Curta', limit: 2, bezier: '0.83,1,0.40,1' },
        { type: 'Expressiva Longa', limit: 1, bezier: '0.3,0.01,0.7,0.5' }
      ],
      limit: 2,
    }, { 
      word: 2,
      letters: [
        { type: 'Neutra Curta', limit: 2, bezier: '0.83,0.01, 0.47, 0.59' },
        { type: 'Expressiva Curta', limit: 2, bezier: '0.83,1,0.40,1' },
        { type: 'Expressiva Longa', limit: 2, bezier: '0.3,0.01,0.7,0.5' }
      ],
      limit: 4,
    }],
  }];

  // state
  const [ pro, setPro ] = useState(false);
  
  // font
  const { font, onLoad } = fontContext;
  const { text, setText, textProperties } = textContext;

  // render
  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={18}>
        <Load font={font} onLoad={onLoad} />
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={9}>
        <InputText label="Type here to text" setText={setText} text={text} />
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={9}>
        <ButtonToolbar>
          <Button onClick={() => setPro(true)}>Advanced Properties</Button>

          <Button onClick={() => setPro(true)}>
            <Icon icon="font" />
          </Button>
        </ButtonToolbar>
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={18}>
        <EditText font={font} />
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={18}>
        <GalleryTemplates items={items} text={text} />
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
    </FlexboxGrid>
  );
};

export default Content;