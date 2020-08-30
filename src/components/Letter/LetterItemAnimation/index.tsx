import React, { memo, useCallback, useContext, useEffect, useRef, FunctionComponent } from 'react';
import BezierEasing from 'bezier-easing';

import { AnimationContext } from '../../../providers/AnimationProvider';

import { ILetterItemAnimation } from './interfaces';

import './letter-item-animation.scss';

// letter animation
const LetterItemAnimation: FunctionComponent<ILetterItemAnimation> = ({ letter, text, setInstanceValue, textProperties }) => {
  // context
  const animationContext = useContext(AnimationContext);
  const { current } = animationContext;

  // element
  const element = useRef(null);

  // animation canvas
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

    const props: any = {};
    const { settings, instance, easing } = letter;
    const easingAnimation = BezierEasing(easing[0], easing[1], easing[2], easing[3]);
    const animate = easingAnimation(current / 100) * 100;

    for (let key in instance.coordinates) {
      const { coordinates } = instance;
      const end = coordinates[key];

      Object.entries(settings.coordinates).forEach(([index, value]:any) => {
        if (index === key) {
          const diff = Math.abs(end - value);
          const inverse = end <= value;
          
          if (inverse === true) {
            const pos = diff - animate;
            props[key] = (pos <= 0) ? end : pos;
          } else {
            if (animate < value) {
              props[key] = value;
            } else {
              props[key] = animate;
            }
          }
        }    
      });
    }

    animationCanvas(element, text);
    setInstanceValue(props, element);
  }, [ current, setInstanceValue, text, animationCanvas ]);

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