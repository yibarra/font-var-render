import React, { createContext, useCallback, FunctionComponent } from 'react';
import { Notification } from 'rsuite';

import { INotificationContext, INotificationProvider } from './interfaces';

// notification
const NotificationContext = createContext({} as INotificationContext);

// notification
const NotificationProvider: FunctionComponent<INotificationProvider> = ({ children }) => {
  // duration
  const duration = 4000;

  // notification 
  const notificationBasic = useCallback((title: string, description: string) => {
    Notification.open({
      title,
      duration,
      description: (description),
    });
  }, [ duration ]);

  // notification success
  const notificationSuccess = useCallback((title: string, description: any) => {
    Notification['info']({
      title,
      duration,
      description: (description),
    });
  }, [ duration ]);

  // notification error
  const notificationError = useCallback((title: string, description: any) => {
    Notification['error']({
      title,
      duration,
      description: (description),
    });
  }, [ duration ]);

  // render
  return (
    <NotificationContext.Provider value={{
      notificationBasic,
      notificationSuccess,
      notificationError,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };
export default NotificationProvider;