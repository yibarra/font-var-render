import React, { memo, useCallback, useContext, useEffect, useRef, FunctionComponent } from 'react';

import { AnimationContext } from '../../../providers/AnimationProvider';
import { LoadFontContext } from '../../../providers/LoadFontProvider';

import { ILetterItemAnimation } from './interfaces';

import './letter-item-animation.scss';

// letter animation
const LetterItemAnimation: FunctionComponent<ILetterItemAnimation> = ({ letter, text, setInstanceValue, initialState }) => {
  // context
  const animationContext = useContext(AnimationContext);
  const loadFontContext = useContext(LoadFontContext);

  const { current } = animationContext;
  const { font } = loadFontContext;

  // element
  const element = useRef(null);

  //
  const animationCanvas = useCallback((element: any, text: string) => {
    const { width, height } = element.getBoundingClientRect();
    const parent: any = element.parentNode.querySelector('.canvas') as HTMLCanvasElement;
    
    if (parent) {
      const ctx = parent.getContext('2d');
      parent.setAttribute('width', width);
      parent.setAttribute('height', height);

      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();

        ctx.font = "35px Canal Brasil VF";
        ctx.fillStyle = 'red';
        ctx.fillText(text, 0, height - 5);
        const img = document.createElement('img');
        const data = parent.toDataURL("image/png", 1.0);

        img.setAttribute("src", data);

        img.onload = () => {
          // var fullQuality = canvas.toDataURL('image/jpeg', 1.0);
          // add to canvas render main
          document.body.append(img);
        };
      }
    }
  }, []);

  // animation
  const animation = useCallback((instances: any, element: any) => {
    if (instances instanceof Object === false) return false;

    const props: any = {};
    const { coordinates }:any = initialState;

    for (let key in instances) {
      const end = instances[key];

      Object.entries(coordinates).forEach(([index, value]:any) => {
        if (index === key) {
          const diff = Math.abs(end - value);
          const inverse = end <= value;
          
          if (inverse === true) {
            const pos = diff - current;
            props[key] = (pos <= 0) ? end : pos;
          } else {
            if (current < value) {
              props[key] = value;
            } else {
              props[key] = current;
            }
          }
        }    
      });
    }

    animationCanvas(element, text);
    setInstanceValue(props, element);
  }, [ current, setInstanceValue, initialState, text, animationCanvas ]);

  // use effect
  useEffect(() => {
    if (letter.settings) {
      animation(letter.settings, element.current);
    }
  }, [ letter, animation ]);

  // render
  return (
    <div className="letter-item-animation" ref={element}>
      <p className="letter--text end">{text}</p>
      <canvas className="canvas" />
    </div>
  );
};

export default memo(LetterItemAnimation);