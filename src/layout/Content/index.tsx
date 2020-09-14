import React, { useContext, useState, useEffect, Fragment, memo } from 'react';
import { Drawer, Button, ButtonToolbar, Icon } from 'rsuite';

import { LoadFontContext } from '../../providers/LoadFontProvider';
import { TextContext } from '../../providers/TextProvider';

import Header from '../Header';

import AnimationSlider from '../../components/AnimationSlider';
import InputText from '../../components/InputText';
import GalleryTemplates from '../../components/GalleryTemplates';
import Load from '../../components/Load';
import Preview from '../../components/Preview';
import SelectLetters from '../../components/SelectLetters';
import SelectFinalState from '../../components/SelectFinalState';

import Steps from '../../components/Steps';

import './content.scss';

// content
const Content = () => {
  // state
  const [ items, setItems ]: any = useState([]);
  const [ pro, setPro ]: any = useState(false);

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
    <section className="content">
      <div className="content--wrapper">
        <Header>
          <Load font={font} onLoad={onLoad} />
        </Header>

        <Steps items={[0, 1]}>
          <Fragment>
            <GalleryTemplates
              items={items}
              text={text}
              setText={setText}
              textPropertiesMain={textProperties}
              setTextProperties={setTextProperties} />

            <InputText label="Type here to text" setText={setText} text={text} />
          </Fragment>

          <Fragment>
            <ButtonToolbar>
              <Button onClick={() => setPro(true)}>
                <Icon icon="gear-circle" />
              </Button>
            </ButtonToolbar>

            <AnimationSlider />
            <Preview font={font} text={text} textProperties={textProperties} />
          </Fragment>
        </Steps>
      </div>

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
    </section>
  );
};

export default memo(Content);