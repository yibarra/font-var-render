import React, { createContext } from 'react';

import AnimationProvider from '../AnimationProvider';
import LoadFontProvider from '../LoadFontProvider';
import NotificationProvider from '../NotificationProvider';
import TextProvider from '../TextProvider';
import LettersProvider from '../LettersProvider';

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
        <TextProvider>
          <LettersProvider>  
            <AnimationProvider>
              <MainContext.Provider value={{ active: true, }}>
                {children}
              </MainContext.Provider>
            </AnimationProvider>
          </LettersProvider>
        </TextProvider>
      </LoadFontProvider>
    </NotificationProvider>
  );
};

export { MainContext, MainProvider };
export default MainProvider;