import { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import Navigation from '../components/layout/navigation';

export default function Demo() {
  const [session, loading] = useSession();
  // const [session, setSession] = useState();

  // useEffect(async () => {
  //   setSession(await getSession());
  // }, [session]);

  if (session) {
    return (
      <>
        <Navigation session={session} loading={loading} />
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <Navigation />
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
