import { createContext, useEffect, useState } from 'react';

const NotificationContext = createContext({
  notification: null, // { title, message, status }
  showNotification: (notification) => {},
  hideNotification: () => {},
});

export function NotificationContextProvider({ children }) {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (activeNotification && activeNotification.status !== 'pending') {
      const timer = setTimeout(() => hideNotification(), 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotification(notification) {
    setActiveNotification(notification);
  }

  function hideNotification() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification,
    hideNotification,
  };

  return <NotificationContext.Provider value={context}>{children}</NotificationContext.Provider>;
}

export default NotificationContext;
