import React, { useCallback, useEffect, useRef, useState, Fragment, FunctionComponent } from 'react';

import { useSpring, animated as a } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import { ISliderGallery } from './interfaces';

// slider gallery
const SliderGallery: FunctionComponent<ISliderGallery> = ({ className, current, children, width, onPrevNext }) => {
  // element
  const gallery: any = useRef(null);

  // state scroll
  const [ props, set ] = useSpring(() => ({ x: 0 }));
  const [ scrollProps, setScrollProps ] = useState({ display: 'none', width: 0 });
  
  // parent width
  const parentWidth = useCallback(() => {
    if (gallery instanceof Object === false) return false;

    const current = gallery.current;
    
    if (current instanceof Object) {
      const containerWidth = current.getBoundingClientRect().width;
      const container = current.querySelector('.content').getBoundingClientRect();

      return {
        diff: Math.floor(containerWidth - container.width),
        galleryWidth: container.width,
        containerWidth: containerWidth,
        widthElement: width
      }
    }

    return false;
  }, [ width, gallery ]);

  // bar scroll width
  const barScrollWidth = useCallback(() => {
    const properties = parentWidth();
      
    if (properties instanceof Object) {
      const { diff, galleryWidth } = properties;

      if (diff) {
        const percent = ((100 * diff) / galleryWidth) * -1;

        if (diff < 0) return `${percent}%`;
      }
    }

    return 0;
  }, [ parentWidth ]);

  // scroll move
  const scrollMove = (value: number) => {
    const properties = parentWidth();
    
    if (properties instanceof Object) {
      const { containerWidth } = properties;
      const percentPosition = ((100 * value) / containerWidth) * -1;

      return `${percentPosition}%`;
    }

    return 0;
  };

  // drag
  const drag = useDrag(({ down, movement: [mx], direction: [xDir], distance }) => {
    if (distance > width / 2) {
      const direction = xDir > 0 ? -1 : 1;

      if (!down) onPrevNext(direction > 0 ? 'next' : 'prev', parentWidth);
    }
  });

  // check scroll
  const checkScroll = useCallback((current, setScrollProps, gallery) => {
    const widthScroll = barScrollWidth();
    const element = gallery.current.parentNode;
    
    if (widthScroll === 0) {
      set({ x: 0 });
      element.setAttribute('data-controls', 'l');
      return setScrollProps({ display: 'none', width: 0 });
    } else {
      if (current > 0) {
        const { diff, widthElement, containerWidth, galleryWidth }: any = parentWidth();

        if (diff) {
          const pos = widthElement * current;
          const position = pos * -1;

          if (position > (containerWidth - galleryWidth)) {
            element.setAttribute('data-controls', '');
            set({ x: position });
          } else {
            set({ x: containerWidth - galleryWidth });
            element.setAttribute('data-controls', 'r');
          }
        }
      } else {
        element.setAttribute('data-controls', 'l');
        set({ x: 0 });
      }
    }

    return setScrollProps({ display: 'inline-block', width: widthScroll });
  }, [ barScrollWidth, set, parentWidth ]);

  // use effect
  useEffect(() => {
    if (gallery.current instanceof Object) {
      checkScroll(current, setScrollProps, gallery);
    }
  }, [ current, children, setScrollProps, checkScroll ]);

  // render
  return (
    <Fragment>
      <a.div
        {...drag()}
        className={`${className}--list`}
        ref={gallery}>
        <a.div
          className="content"
          style={{
            transform: props.x.interpolate(x => `translate3d(${x}px,0,0)`),
            width: children.length * width
          }}>
          {children && children.map((Child: any) => Child)}
        </a.div>
      </a.div>

      <div 
          className={`${className}--scroll`}
          style={{ display: scrollProps.display }}>
          <a.div
            className="bar"
            style={{
              left: props.x.interpolate(x => scrollMove(x)),
              ...scrollProps }}>
          </a.div>
        </div>
    </Fragment>
  );
};

export default SliderGallery;