import { getSession, useSession } from 'next-auth/client';
import ProfileForm from '../../components/profile/profile-form';
import Navigation from '../../components/layout/navigation';
import classes from './profile.module.css';

function ProfilePage({ session }) {
  // Client side session validation
  // const [session, loading] = useSession();
  
  // Redirect away if NOT auth
  // if(!loading && !session) {
  //  router.replace('/auth');
  // }

  // if (loading) {
  //   return (
  //     <>
  //       <Navigation session={session} loading={loading} />
  //       <p className={classes.profile}>Loading...</p>
  //     </>
  //   );
  // }

  return (
    <>
      <Navigation session={session} />
      <section className={classes.profile}>
        <h1>Your User Profile</h1>
        <ProfileForm />
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      },
    };
  }

  return {
    props: {
      session
    }
  }
}

export default ProfilePage;
