import Link from 'next/link';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ul>
        <li><Link href='/'><a>Home</a></Link></li>
        <li><Link href='/clients'><a>Clients</a></Link></li>
        <li><Link href='/portfolio'><a>Portfolio</a></Link></li>
        <li><Link href='/blog/1'><a>Blog</a></Link></li>
      </ul>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
