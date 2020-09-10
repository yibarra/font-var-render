import React from 'react';

import AnimationProvider from '../AnimationProvider';
import LoadFontProvider from '../LoadFontProvider';
import NotificationProvider from '../NotificationProvider';
import TextProvider from '../TextProvider';
import LettersProvider from '../LettersProvider';
import TemplateProvider from '../TemplateProvider';

// Main Provider
const MainProvider = ({ children }: any) => {
  // render
  return (
    <NotificationProvider>
      <LoadFontProvider>
        <AnimationProvider>
          <LettersProvider>
            <TextProvider>
              <TemplateProvider>
                {children}
              </TemplateProvider>
            </TextProvider>
          </LettersProvider>
        </AnimationProvider>
      </LoadFontProvider>
    </NotificationProvider>
  );
};

export default MainProvider;