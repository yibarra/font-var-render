import React, { createContext } from 'react';

import AnimationProvider from '../AnimationProvider';
import LoadFontProvider from '../LoadFontProvider';
import NotificationProvider from '../NotificationProvider';
import TextProvider from '../TextProvider';

// Main Context
const MainContext = createContext({
  active: true,
});

// Main Provider
const MainProvider = ({ children }: any) => {
  // render
  return (
    <NotificationProvider>
      <LoadFontProvider>
        <AnimationProvider>
          <TextProvider>
            <MainContext.Provider value={{ active: true, }}>
              {children}
            </MainContext.Provider>
          </TextProvider>
        </AnimationProvider>
      </LoadFontProvider>
    </NotificationProvider>
  );
};

export { MainContext, MainProvider };
export default MainProvider;