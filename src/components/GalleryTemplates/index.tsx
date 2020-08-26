import React, { FunctionComponent, useContext, useCallback } from 'react';

import { TemplateContext } from '../../providers/TemplateProvider';
import { TextContext } from '../../providers/TextProvider';

import SliderGallery from '../Slider/Gallery';
import SliderBase from '../Slider/Base';

import { IGalleryTemplates } from './interfaces';

import './gallery-templates.scss';

// gallery templates
const GalleryTemplates: FunctionComponent<IGalleryTemplates> = ({ current, items, onPrevNext, text }) => {
  // context
  const templateContext = useContext(TemplateContext);
  const textContext = useContext(TextContext);

  const { generate } = templateContext;
  const { setTextProperties } = textContext;

  // select template
  const selectTemplate = useCallback((text, template, textProperties) => {
    setTextProperties(textProperties);
    generate(text, template);
  }, [ generate, setTextProperties ]);
  
  // render
  return (
    <div className="gallery-templates">
      <SliderGallery
        className="gallery-templates--item-slider"
        current={current}
        onPrevNext={onPrevNext}
        width={160}>
          {items && items.map(({ element, template, textProperties }: any, key: number) =>
            <div
              className="gallery-templates--item-element"
              key={key}
              onClick={() => selectTemplate(text, template, textProperties)}>{element}</div>)}
      </SliderGallery>
    </div>
  );
};

export default SliderBase(GalleryTemplates);