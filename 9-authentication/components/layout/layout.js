import Head from 'next/head';
import { useSession } from 'next-auth/client';

function Layout({ title = 'Auth', children }) {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>{children}</main>
    </>
  );
}

export default Layout;
