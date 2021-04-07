import { INotification } from 'interfaces';
import ReactDOM from 'react-dom';

import styles from './notification.module.scss';

function Notification({ title, message, status }: INotification) {
  let statusClasses = '';

  if (status === 'success') {
    statusClasses = styles.success;
  }

  if (status === 'error') {
    statusClasses = styles.error;
  }

  return ReactDOM.createPortal(
    <div className={`${styles.notification} ${statusClasses}`}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.querySelector('#notifications')!
  );
}

export default Notification;
