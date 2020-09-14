import React, { useContext, useState, useEffect, Fragment, memo, useCallback } from 'react';
import { Drawer, Button } from 'rsuite';

import { LoadFontContext } from '../../providers/LoadFontProvider';
import { TextContext } from '../../providers/TextProvider';

import Header from '../Header';

import AnimationSlider from '../../components/AnimationSlider';
import InputText from '../../components/InputText';
import GalleryTemplates from '../../components/GalleryTemplates';
import Load from '../../components/Load';
import Preview from '../../components/Preview';
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

  // render click
  const renderClick = useCallback(() => {
    const btns = document.body.querySelectorAll('.letter-item-animation');
    
    if (btns) {
      for (let i = 0; i < btns.length; i++) {
        const btn: any = btns[i];

        if (btn instanceof Object) btn.click();
      }
    }

    setPro(false);
  }, [ setPro ]);

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
            <AnimationSlider setPro={setPro} />
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
            <Drawer.Title>
              <p className="title">Advanced Properties</p>
            </Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <SelectFinalState
              font={font}
              text={text}
              textProperties={textProperties} />
          </Drawer.Body>
          <Drawer.Footer>
            <Button className="btn-default" onClick={() => renderClick()}>
              Confirm
            </Button>
            <Button className="btn-default clear" onClick={() => setPro(false)}>
              Cancel
            </Button>
        </Drawer.Footer>
      </Drawer>
    </section>
  );
};

export default memo(Content);