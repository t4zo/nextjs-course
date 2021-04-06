import { AppProps } from 'next/dist/next-server/lib/router/router';
// import Layout from 'components/Layout';

import 'styles/_base.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <Layout title='NBlog'>
      <Component {...pageProps} />
    // </Layout>
  );
}

export default MyApp;
