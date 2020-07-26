import React from 'react';
import { Container } from 'rsuite';

import MainProvider from '../../providers/MainProvider';

import Content from '../Content';

// main
const Main = () => {
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