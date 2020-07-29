import React, { memo, useCallback, useContext, useEffect, useRef, Fragment, FunctionComponent } from 'react';

import { AnimationContext } from '../../../providers/AnimationProvider';

import { ILetterItemAnimation } from './interfaces';

// letter animation
const LetterItemAnimation: FunctionComponent<ILetterItemAnimation> = ({ letter, text, setInstanceValue }) => {
  // context
  const animationContext = useContext(AnimationContext);
  const { current } = animationContext;

  // element
  const element = useRef(null);

  // animation
  const animation = useCallback((instances: any) => {
    if (instances instanceof Object === false) return false;

    const props: any = {};
    const propsInit = { 'wdth': 30, 'wght': 0 };



    for (let key in instances) {
      Object.entries(propsInit).forEach(([index, value]) => {
        if (index === key) {
          const diff = Math.abs(instances[key] - value);
          const inverse = instances[key] <= value;

          if (inverse === true) {
            console.log('inverse', key);
          } else {
            console.log('next', key);
          }
          //console.log('diff', diff, current, diff - current, key, instances[key]);
        }
        // console.log(index + ' ' + value); // "a 5", "b 7", "c 9"     
      });

      //props[key] = instances[key] < current ? instances[key] : current;
    }

    setInstanceValue(props, element.current);
  }, [ current, setInstanceValue ]);

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