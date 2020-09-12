import React, { FunctionComponent, useContext, useCallback, useEffect } from 'react';

import { TemplateContext } from '../../providers/TemplateProvider';

import SliderBase from '../Slider/Base';
import Slider from '../Slider';

import { IGalleryTemplates } from './interfaces';

import './gallery-templates.scss';

// gallery templates
const GalleryTemplates: FunctionComponent<IGalleryTemplates> = ({ 
  current, last, items, onPrevNext, text, setText, setTextProperties, textPropertiesMain
}) => {
  // context
  const templateContext = useContext(TemplateContext);
  const { generate } = templateContext;

  // select template
  const selectTemplate = useCallback((text, template, textProperties, words) => {
    setTextProperties(textProperties);
    setText(words.toUpperCase());
    generate(text, template);
  }, [ generate, setTextProperties, setText ]);

  // use effect
  useEffect(() => {
    if (items.length > 0) {
      const { text, template, textProperties, words } = items[0];
      selectTemplate(text, template, textProperties, words);
    }
  }, [ items, selectTemplate ]);
  
  // render
  return (
    <div className="gallery-templates">
      <p>Templates</p>

      <Slider current={current} direction='' last={last} onPrevNext={onPrevNext} type="1">
        {items && items.map(({ image, template, textProperties, words }: any, key: number) =>
          <button
            data-active={textPropertiesMain === textProperties}
            className="gallery-templates--item"
            key={key}
            onClick={() => selectTemplate(text, template, textProperties, words)}>
              <img src={process.env.PUBLIC_URL + image} alt="template" />
          </button>)}
      </Slider>
    </div>
  );
};

export default SliderBase(GalleryTemplates);