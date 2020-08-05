import React, { memo, useCallback, useContext, useEffect, useRef, FunctionComponent, Fragment } from 'react';

import { AnimationContext } from '../../../providers/AnimationProvider';

import { ILetterItemAnimation } from './interfaces';

import './letter-item-animation.scss';

// letter animation
const LetterItemAnimation: FunctionComponent<ILetterItemAnimation> = ({ letter, text, setInstanceValue, initialState }) => {
  // context
  const animationContext = useContext(AnimationContext);
  const { current } = animationContext;

  // element
  const element = useRef(null);

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

    setInstanceValue(props, element);
  }, [ current, setInstanceValue, initialState ]);

  // use effect
  useEffect(() => {
    if (letter.settings) {
      animation(letter.settings, element.current);
    }
  }, [ letter, animation ]);

  // render
  return (
    <Fragment>
      <p className="letter--text end" ref={element}>{text}</p>
    </Fragment>
  );
};

export default memo(LetterItemAnimation);