import Link from 'next/link';

import styles from './button.module.scss';

export default function Button({ href, onClick, children }) {
  if (href) {
    return (
      <Link href={href}>
        <a className={styles.btn}>{children}</a>
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={styles.btn}>{children}</button>
  );
}
