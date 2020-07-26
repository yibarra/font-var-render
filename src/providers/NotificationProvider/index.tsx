import React, { createContext, useCallback, FunctionComponent } from 'react';
import { Notification } from 'rsuite';

import { INotificationContext, INotificationProvider } from './interfaces';

// notification
const NotificationContext = createContext({} as INotificationContext);

// notification
const NotificationProvider: FunctionComponent<INotificationProvider> = ({ children }) => {
  // open
  const open = useCallback((title: string, description: string) => {
    Notification.open({
      title,
      description
    });
  }, []);

  // render
  return (
    <NotificationContext.Provider value={{
      open,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };
export default NotificationProvider;