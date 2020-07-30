import React, { FunctionComponent, memo, useState, useCallback } from 'react';
import { Col, Button } from 'rsuite';

import useFont from '../../uses/useFont';

import { ISelectInitState } from './interfaces';

import './select-init-state.scss';

// select init state
const SelectInitState: FunctionComponent<ISelectInitState> = ({ font }) => {
  // state
  const [ value, setValue ]:any = useState();

  // get fvar table
  const { getFvarTable } = useFont(font);

  // get instances
  const getInstances = useCallback((font) => {
    const { instances } = getFvarTable(font);

    if (instances instanceof Object) {
      const items = [];

      for (let key in instances) {
        const item = instances[key];
        if (item instanceof Object) {
          const { name: { en } } = item;
          items.push(<Button active={value === item} key={key} onClick={() => setValue(item)}>{en}</Button>)
        }
      }

      return items;
    }

    return '';
  }, [ getFvarTable, value ]);

  // render
  return (
    <div className="select-init-state">
      <Col className="select-init-state--title" xs={24}>
        <p>Select the first state</p>
      </Col>
      <Col className="select-init-state--content" xs={24}>
        {font && 
          getInstances(font)}
      </Col>
    </div>
  );
};

export default memo(SelectInitState);