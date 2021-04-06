import Link from 'next/link';
import Logo from 'components/Layout/Logo';

import styles from './navigation.module.scss';

function Navigation() {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/posts'>Postagens</Link>
          </li>
          <li>
            <Link href='/contact'>Entre em Contato</Link>
          </li>
          {/* <li>
            <Link href='/users'>Users List</Link>
          </li>
          <li>
            <a href='/api/users'>Users API</a>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
