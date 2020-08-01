import React, { memo, useCallback, useContext, useEffect, useRef, Fragment, FunctionComponent } from 'react';

import { AnimationContext } from '../../../providers/AnimationProvider';

import { ILetterItemAnimation } from './interfaces';

// letter animation
const LetterItemAnimation: FunctionComponent<ILetterItemAnimation> = ({ letter, text, setInstanceValue, initialState }) => {
  // context
  const animationContext = useContext(AnimationContext);
  const { current } = animationContext;

  // element
  const element = useRef(null);

  // animation
  const animation = useCallback((instances: any) => {
    if (instances instanceof Object === false || !initialState.hasOwnProperty('coordinates')) return false;

    const { coordinates }:any = initialState;
    const props: any = {};

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

    setInstanceValue(props, element.current);
  }, [ current, setInstanceValue, initialState]);

  // use effect
  useEffect(() => {
    if (letter.settings) {
      animation(letter.settings);
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