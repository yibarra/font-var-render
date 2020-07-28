import React, { memo, useCallback, useContext, useEffect, useRef, Fragment } from 'react';

import { AnimationContext } from '../../../providers/AnimationProvider';

interface ILetterItemAnimation {
  letter: any;
  text: string;
  setInstanceValue: (values: any, element: any) => void;
}

// letter animation
const LetterItemAnimation = ({ letter, text, setInstanceValue }: ILetterItemAnimation) => {
  // context
  const animationContext = useContext(AnimationContext);
  const { current } = animationContext;

  // element
  const element = useRef(null);

  // animation
  const animation = useCallback((instances: any) => {
    if (instances instanceof Object === false) return false;

    const props: any = {};

    for (let key in instances) {
      props[key] = instances[key] < current ? instances[key] : current;
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