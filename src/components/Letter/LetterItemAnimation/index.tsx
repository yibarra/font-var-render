import React, { memo, useCallback, useContext, useEffect, useRef, FunctionComponent } from 'react';
import BezierEasing from 'bezier-easing';

import { AnimationContext } from '../../../providers/AnimationProvider';

import { ILetterItemAnimation } from './interfaces';

import './letter-item-animation.scss';

// letter animation
const LetterItemAnimation: FunctionComponent<ILetterItemAnimation> = ({
   letter,
   text,
   setInstanceValue,
   textProperties,
   active,
   initialState,
  }) => {
  // context
  const animationContext = useContext(AnimationContext);
  const { current } = animationContext;

  // element
  const element = useRef(null);

  // animation canvas
  const animationCanvas = useCallback((element: any, text: string) => {
    const { width, height } = element.getBoundingClientRect();
    const padding: number = 10;
    const parent: any = element.parentNode.querySelector('.canvas') as HTMLCanvasElement;

    if (parent) {
      const ctx = parent.getContext('2d');
      parent.setAttribute('width', width + padding);
      parent.setAttribute('height', height + padding);

      if (ctx) {
        ctx.clearRect(0, 0, width + padding, height + padding);
        ctx.beginPath();

        ctx.font = `${textProperties.fontSize}px Canal Brasil VF`; //var name
        ctx.fillStyle = 'white';
        
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 0, height / 2);
      }
    }
  }, [ textProperties ]);

  // animation
  const animation = useCallback((letter: any, element: any) => {
    if (letter instanceof Object === false) return false;

    let props: any = {};
    const { settings, instance } = letter;
    const easing = [ .01,.68,.4,.91 ];

    if (active === true) {
      if (settings !== instance) {
        const easingAnimation = BezierEasing(easing[0], easing[1], easing[2], easing[3]);
        const animate: any = easingAnimation(current / 100) * 100;
  
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
      props = initialState.coordinates;
    }

    animationCanvas(element, text);
    setInstanceValue(props, element);
  }, [ active, animationCanvas, current, initialState, setInstanceValue, text ]);

  // use effect
  useEffect(() => {
    if (letter.settings) {
      animation(letter, element.current);
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