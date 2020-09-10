import React, { memo, useCallback, useRef, FunctionComponent, useState } from 'react';
import { ILetterItemAnimation } from './interfaces';

import './letter-item-animation.scss';

// letter animation
const LetterItemAnimation: FunctionComponent<ILetterItemAnimation> = ({
    name,
    letter,
    onLetterFrames,
    text,
    setInstanceValue,
    textProperties,
    active,
  }) => {
  // items
  const [ items, setItems ]: any[] = useState([]);

  // element
  const element = useRef(null);

  // add images
  const addImage = useCallback((src: any, items: any[], current: any, props: any) => {
    const images: any[] = items;
    const item = items.filter((item, index) => index === current)[0];

    if (item instanceof Object) {
      images[current] = { src, ...props }; 
    } else {
      images.push({ src, ...props });
    }

    setItems(images);

    if (current >= 99) {
      onLetterFrames(items);
    }
  }, [ onLetterFrames ]);

  // load image
  const loadImage = useCallback((src: any, items: any[], current: number, props: any, index: number) => {
    if (props instanceof Object === false) return false;

    const img = new Image();

    img.onload = () => {
      const width: number = img.naturalWidth;
      const height: number = img.naturalHeight;

      const properties = { 
        alt: 'letter base', 
        width: parseInt(width.toString(), 10), 
        height: parseInt(height.toString(), 10),
        x: props.x,
        y: props.y,
        index
      };
      
      addImage(img, items, current, properties);
    };

    img.src = src;
  }, [ addImage ]);

  // animation canvas
  const animationCanvas = useCallback((element: any, text: string, current: number, index: any) => {
    const { width, height } = element.getBoundingClientRect();
    const padding: number = 10;
    const canvas: any = element.parentNode.querySelector('.canvas') as HTMLCanvasElement;

    if (canvas) {
      const ctx = canvas.getContext('2d');
      canvas.setAttribute('width', width + padding);
      canvas.setAttribute('height', height + padding);

      if (ctx) {
        ctx.clearRect(0, 0, width + padding, height + padding);
        ctx.beginPath();

        ctx.font = `${textProperties.fontSize}px ${name}`;
        ctx.fillStyle = 'white';
        
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 0, height / 2);

        loadImage(canvas.toDataURL("image/png", 1), items, current, element.parentNode.getBoundingClientRect(), index);
      }
    }
  }, [ textProperties, items, name, loadImage ]);

  // animation
  const animation = useCallback((letter: any, element: any, current: number) => {
    if (letter instanceof Object === false || element instanceof Object === false) return false;

    let props: any = {};
    const { settings, instance } = letter;

    if (active === true) {
      if (settings !== instance) {
        const animate: any = current;
  
        Object.entries(instance.coordinates).forEach(([ indexTo, toValue ]:any) => {
          const value = settings.coordinates[indexTo];
          const reverse = toValue < value;
          
          if (reverse === true) {
            const diff = Math.abs(toValue - value);
  
            if (diff > 0) {
              if (toValue === 0) {
                const val: any = parseInt((diff - current).toString(), 10);
                
                if (val > toValue) {
                  props[indexTo] = val;
                } else {
                  props[indexTo] = toValue;
                }
              } else {
                const val: any = parseInt((value - animate).toString());
  
                if (val > toValue) {
                  props[indexTo] = val;
                } else {
                  props[indexTo] = toValue;
                }
              }
            } else {
              props[indexTo] = toValue;
            }
          } else {
            if (value === toValue) {
              props[indexTo] = toValue;
            } else {
              const pos = parseInt(((toValue * current) / 100).toString(), 10);
              props[indexTo] = (pos > toValue) ?  toValue : pos;
            }
          }
        });
      } else {
        props = settings.coordinates;
      }
    } else {
      props = instance.coordinates;
    }

    animationCanvas(element, text, current, letter.index);
    setInstanceValue(props, element);
  }, [ active, animationCanvas, setInstanceValue, text ]);

  // frames
  const frames = useCallback((letter: any) => {
    for (let i = 0; i < 100; i++) {
      setTimeout(() => animation(letter, element.current, i), 500);
    }
  }, [ animation ]);

  // generate
  const generate = useCallback(() => {
    frames(letter);
  }, [ frames, letter ]);

  // render
  return (
    <div className="letter-item-animation" ref={element}>
      <p className="letter--text end">{text}</p>
      <canvas className="canvas" />
      <button className="letter--gen" onClick={() => generate()}>RENERATE GLYPHS</button>
    </div>
  );
};

export default memo(LetterItemAnimation);