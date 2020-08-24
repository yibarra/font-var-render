import React, { FunctionComponent, useContext } from 'react';

import { TemplateContext } from '../../providers/TemplateProvider';

import SliderGallery from '../Slider/Gallery';
import SliderBase from '../Slider/Base';

import { IGalleryTemplates } from './interfaces';

import './gallery-templates.scss';

// gallery templates
const GalleryTemplates: FunctionComponent<IGalleryTemplates> = ({ current, items, onPrevNext, text }) => {
  // context
  const templateContext = useContext(TemplateContext);
  const { generate } = templateContext;
  
  // render
  return (
    <div className="gallery-templates">
      <SliderGallery
        className="gallery-templates--item-slider"
        current={current}
        onPrevNext={onPrevNext}
        width={285}>
          {items && items.map(({ element, template }: any, key: number) =>
            <div className="gallery-templates--item-element" key={key} onClick={() => generate(text, template)}>{element}</div>)}
      </SliderGallery>
    </div>
  );
};

export default SliderBase(GalleryTemplates);