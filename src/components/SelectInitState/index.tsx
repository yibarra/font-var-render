import React, { FunctionComponent, memo, useCallback } from 'react';
import { Col, Button } from 'rsuite';

import useFont from '../../uses/useFont';

import { IFontInfo } from '../../providers/FontSettingsProvider/interfaces';
import { ISelectInitState } from './interfaces';

import './select-init-state.scss';

// select init state
const SelectInitState: FunctionComponent<ISelectInitState> = ({ font, initialState, setInitialState }) => {
  // get fvar table
  const { getFvarTable } = useFont(font);

  // get instances
  const getInstances = useCallback((font: IFontInfo) => {
    const { instances } = getFvarTable(font);

    if (instances instanceof Object) {
      const items = [];

      for (let key in instances) {
        const item = instances[key];
        
        if (item instanceof Object) {
          const { name: { en } } = item;

          items.push(<Button active={initialState === item} key={key} onClick={() => setInitialState(item)}>{en}</Button>)
        }
      }

      return items;
    }

    return;
  }, [ getFvarTable, initialState, setInitialState]);

  // render
  return (
    <div className="select-init-state">
      <Col className="select-init-state--title" xs={24}>
      <p>Select the first state</p>
      </Col>
      <Col className="select-init-state--content" xs={24}>
        {font && getInstances(font)}
      </Col>
    </div>
  );
};

export default memo(SelectInitState);