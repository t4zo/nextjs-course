import { signOut } from 'next-auth/client';
import Link from 'next/link';

import classes from './navigation.module.css';

function MainNavigation({ session, loading }) {
  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && !loading && (
            <li>
              <Link href='/auth'>Sign In</Link>
            </li>
          )}
          {session && !loading && (
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          )}
          {session && !loading && (
            <li>
              <button onClick={signOut}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
