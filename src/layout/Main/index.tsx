import React, { FunctionComponent } from 'react';

import MainProvider from '../../providers/MainProvider';

import Content from '../Content';

import { IMain } from './interfaces';

// main
const Main:FunctionComponent<IMain> = () => {
  // render
  return (
    <MainProvider>
      <Content />
    </MainProvider>
  );
};

export default Main;