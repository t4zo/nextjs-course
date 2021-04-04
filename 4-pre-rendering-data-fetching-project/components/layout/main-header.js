import Link from 'next/link';

import styles from './main-header.module.scss';

export default function MainHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>NextEvents</a>
        </Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href='/events'>
              <a>Browse All Events</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
