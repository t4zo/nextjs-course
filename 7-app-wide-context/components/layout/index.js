import MainHeader from './main-header';
import Notification from '../../components/ui/notification';
import { useContext } from 'react';
import NotificationContext from '../../store/notification-context';

export default function Layout({ children }) {
  const notificationContext = useContext(NotificationContext);

  const activeNotification = notificationContext.notification;

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status} />
      )}
    </>
  );
}
