import React, { useContext, useState, useEffect } from 'react';
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

import Steps from '../../components/Steps';

// content
const Content = () => {
  // state
  const [ items, setItems ]: any = useState([]);
  const [ pro, setPro ]: any = useState(false);
  const [ textPro, setTextPro ]: any = useState(false);

  // context
  const fontContext = useContext(LoadFontContext);
  const textContext = useContext(TextContext);
  
  // font
  const { font, onLoad } = fontContext;
  const { text, setText, textProperties, setTextProperties } = textContext;

  // load
  useEffect(() => {
    const load = async () => {
      fetch(`${process.env.PUBLIC_URL}/template.json`)
        .then((res) => res.json())
        .then((data) => setItems(data));
    };

    load();
  }, []);

  // render
  return (
    <div>
      <div className="">
        <Steps>
          <GalleryTemplates
            items={items}
            text={text}
            setText={setText}
            textPropertiesMain={textProperties}
            setTextProperties={setTextProperties} />

          <div>
            <InputText label="Type here to text" setText={setText} text={text} />
          </div>
        </Steps>
      </div>

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
        <label className="label">Gallery</label>
        
      </FlexboxGrid.Item>
      
      <FlexboxGrid.Item colspan={18} className="preview-container">
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
    </div>
  );
};

export default Content;