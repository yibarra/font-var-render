import React, { memo, useCallback, useContext, useEffect, useRef, Fragment, FunctionComponent } from 'react';

import { AnimationContext } from '../../../providers/AnimationProvider';

import { ILetterItemAnimation } from './interfaces';

// letter animation
const LetterItemAnimation: FunctionComponent<ILetterItemAnimation> = ({
  letter,
  text,
  setLetter,
  updateLetterItem,
  setInstanceValue,
  initialState }) => {
  // context
  const animationContext = useContext(AnimationContext);
  const { current } = animationContext;

  // element
  const element = useRef(null);

  // animation
  const animation = useCallback((index: number, instances: any) => {
    if (instances instanceof Object === false) return false;

    console.log(index);
    /*
    const props: any = {};
    const propsInit = { 'wdth': 30, 'wght': 0 };

    Object.entries(propsInit).forEach(([key, instance]) => {
      const end = instance;

      Object.entries(instances).forEach(([index, value]: any) => {
        if (index === key) {
          const diff = Math.abs(end - value);
          const inverse = end <= value;

          console.log(diff, value, current);
          
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
    });

    console.log(props, '---- props ----');

    updateLetterItem(letter.index, { current: props });
    setInstanceValue(props, element.current);
    */
  }, [ current, setInstanceValue, updateLetterItem ]);

  // use effect
  useEffect(() => {
    if (letter.settings) {
      if (initialState instanceof Object) {
        animation(letter.index, initialState.coordinates);
      }
    }
  }, [ letter, animation, initialState ]);

  // render
  return (
    <Fragment>
      <p className="letter--text end" ref={element}>{text}</p>
    </Fragment>
  );
};

export default memo(LetterItemAnimation);