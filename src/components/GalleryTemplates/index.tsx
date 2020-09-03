import React, { FunctionComponent, useContext, useCallback } from 'react';

import { TemplateContext } from '../../providers/TemplateProvider';

import SliderGallery from '../Slider/Gallery';
import SliderBase from '../Slider/Base';

import { IGalleryTemplates } from './interfaces';

import './gallery-templates.scss';

// gallery templates
const GalleryTemplates: FunctionComponent<IGalleryTemplates> = ({ current, items, onPrevNext, text, setText, setTextProperties }) => {
  // context
  const templateContext = useContext(TemplateContext);
  const { generate } = templateContext;

  // select template
  const selectTemplate = useCallback((text, template, textProperties, words) => {
    setTextProperties(textProperties);
    setText(words);
    generate(text, template);
  }, [ generate, setTextProperties, setText ]);
  
  // render
  return (
    <div className="gallery-templates">
      <SliderGallery
        className="gallery-templates--item-slider"
        current={current}
        onPrevNext={onPrevNext}
        width={170}>
          {items && items.map(({ image, template, textProperties, words }: any, key: number) =>
            <div
              className="gallery-templates--item-element"
              key={key}
              onClick={() => selectTemplate(text, template, textProperties, words)}>
                <img src={process.env.PUBLIC_URL + image} alt="template" />
              </div>)}
      </SliderGallery>
    </div>
  );
};

export default SliderBase(GalleryTemplates);