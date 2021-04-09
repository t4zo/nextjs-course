import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn, getSession } from 'next-auth/client';
import axios from 'axios';
import Navigation from '../../components/layout/navigation';
import classes from './auth.module.css';

function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (isLogin) {
      // Custom api backend
      // const response = await axios.post('/api/auth/signin', { email, password });
      // if ((response.status = 200)) {
      //   console.log(response.data.user);
      //   console.log(response.data.message);
      // }

      // next-auth
      const response = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (response) {
        router.replace('/profile');
      }
    } else {
      try {
        const response = await axios.post('/api/auth/backup/signup', { email, password });
        if (response.status === 201) {
          router.reload();
          // router.replace('/auth');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <Navigation />
      <section className={classes.auth}>
        <h1>{isLogin ? 'Sign In' : 'Sign Up'}</h1>
        <form onSubmit={handleFormSubmit}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' required />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input type='password' id='password' required />
          </div>
          <div className={classes.actions}>
            <button>{isLogin ? 'Sign In' : 'Create Account'}</button>
            <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default AuthPage;
