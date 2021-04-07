import axios from 'axios';
import Layout from 'components/Layout';
import Notification from 'components/UI/Notification';
import { INotification } from 'interfaces';
import { useEffect, useState } from 'react';

import styles from './contact.module.scss';

function ContactPage() {
  const [requestStatus, setRequestStatus] = useState<string | null>(); // pending, success, error
  // const [requestError, setRequestError] = useState<string | null>();
  let notification: INotification;

  useEffect(() => {
    if(requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        // setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }

  }, [requestStatus]);

  if (requestStatus === 'pending') {
    notification = {
      title: 'Enviando...',
      message: 'Enviando sua mensagem!',
      status: 'pending',
    };
  } else if (requestStatus === 'success') {
    notification = {
      title: 'Sucesso',
      message: 'Messagem enviada com sucesso!',
      status: 'success',
    };
  } else if (requestStatus === 'error') {
    notification = {
      title: 'Erro',
      message: 'Erro ao enviar mensagem!',
      status: 'error',
    };
  }

  async function handleSendMessage(e: any) {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    setRequestStatus('pending');
    try {
      const response = await axios.post('/api/contact', {
        email,
        name,
        message,
      });
      if (response.statusText === 'Created') {
        setRequestStatus('success');
      }
    } catch (error) {
      // setRequestError(error.message);
      setRequestStatus('error');
    }
  }

  return (
    <Layout title='Contato | NBlog'>
      <section className={styles.contact}>
        <h1>Como posso ajudar?</h1>
        <form className={styles.form} onSubmit={handleSendMessage}>
          <div className={styles.controls}>
            <div className={styles.control}>
              <label htmlFor='email'>Seu Email</label>
              <input type='email' name='email' id='email' required />
            </div>
            <div className={styles.control}>
              <label htmlFor='name'>Seu Nome</label>
              <input type='text' name='name' id='name' required />
            </div>
          </div>
          <div className={styles.control}>
            <label htmlFor='message'>Sua Messagem</label>
            <textarea name='message' id='message' rows={5}></textarea>
          </div>

          <div className={styles.actions}>
            <button>Enviar Messagem</button>
          </div>
        </form>
        {notification! && <Notification title={notification.title} message={notification.message} status={notification.status} />}
      </section>
    </Layout>
  );
}

export default ContactPage;
