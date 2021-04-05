import { useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
    const notificationContext = useContext(NotificationContext);
    
    async function registrationHandler(event) {
    event.preventDefault();
    const email = event.target.email.value;

    notificationContext.showNotification({ title: 'Signing up', message: 'Registering for newsletter', status: 'pending' });

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      if(!response.ok) {
        throw new Error(response.message || 'Something went wrong!');
      }

      const data = await response.json();
      if (data) {
        notificationContext.showNotification({ title: 'Success', message: 'Successfully registered for newsletter', status: 'success' });
      }
    } catch (error) {
      notificationContext.showNotification({ title: 'Error', message: 'Error on registering for newsletter', status: 'error' });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input type='email' id='email' placeholder='Your email' aria-label='Your email' />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
