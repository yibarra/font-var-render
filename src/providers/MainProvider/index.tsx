import React, { createContext } from 'react';

import AnimationProvider from '../AnimationProvider';
import LoadFontProvider from '../LoadFontProvider';
import NotificationProvider from '../NotificationProvider';

// Main Context
const MainContext = createContext({
  active: true,
});

// Main Provider
const MainProvider = ({ children }: any) => {
  // render
  return (
    <LoadFontProvider>
      <NotificationProvider>
        <AnimationProvider>
          <MainContext.Provider value={{ active: true, }}>
            {children}
          </MainContext.Provider>
        </AnimationProvider>
      </NotificationProvider>
    </LoadFontProvider>
  );
};

export { MainContext, MainProvider };
export default MainProvider;