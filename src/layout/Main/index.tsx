import React, { FunctionComponent } from 'react';
import { Container } from 'rsuite';

import MainProvider from '../../providers/MainProvider';

import Content from '../Content';

import { IMain } from './interfaces';

// main
const Main:FunctionComponent<IMain> = () => {
  // render
  return (
    <MainProvider>
      <Container>
        <Content />
      </Container>
    </MainProvider>
  );
};

export default Main;