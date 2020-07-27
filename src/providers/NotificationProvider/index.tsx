import React, { createContext, useCallback, FunctionComponent } from 'react';
import { Notification } from 'rsuite';

import { INotificationContext, INotificationProvider } from './interfaces';

// notification
const NotificationContext = createContext({} as INotificationContext);

// notification
const NotificationProvider: FunctionComponent<INotificationProvider> = ({ children }) => {
  // notification 
  const notificationBasic = useCallback((title: string, description: string) => {
    Notification.open({
      title,
      duration: 5000,
      description: (description),
    });
  }, []);

  // render
  return (
    <NotificationContext.Provider value={{
      notificationBasic,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };
export default NotificationProvider;