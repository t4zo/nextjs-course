import Link from 'next/link';
import { getSession } from 'next-auth/client';
import Navigation from '../components/layout/navigation';
import classes from './index.module.css';

function HomePage({ session }) {
  return (
    <>
      <Navigation session={session} />
      <section className={classes.starting}>
        <h1>Welcome on Board!</h1>
      </section>
      {!session && (
        <Link href='/auth'>
          <a style={{ display: 'block', textAlign: 'center' }}>Sign In</a>
        </Link>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  return {
    props: {
      session,
    },
  };
}

export default HomePage;
