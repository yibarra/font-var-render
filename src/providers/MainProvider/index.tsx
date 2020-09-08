import React, { createContext, useContext } from 'react';

import AnimationProvider, { AnimationContext } from '../AnimationProvider';
import LoadFontProvider from '../LoadFontProvider';
import NotificationProvider from '../NotificationProvider';
import TextProvider from '../TextProvider';
import LettersProvider from '../LettersProvider';
import TemplateProvider from '../TemplateProvider';

// Main Context
const MainContext = createContext({
  active: true,
});

// Main Provider
const MainProvider = ({ children }: any) => {
  // animation
  const animationContext = useContext(AnimationContext);
  const { current } = animationContext;

  // render
  return (
    <NotificationProvider>
      <LoadFontProvider>
        <AnimationProvider>
          <TextProvider>
            <LettersProvider>
              <TemplateProvider>
                <MainContext.Provider value={{ active: true, }}>
                  {children}
                  <input id="time-current" type="hidden" value={current} />
                </MainContext.Provider>
              </TemplateProvider>
            </LettersProvider>
          </TextProvider>
        </AnimationProvider>
      </LoadFontProvider>
    </NotificationProvider>
  );
};

export { MainContext, MainProvider };
export default MainProvider;