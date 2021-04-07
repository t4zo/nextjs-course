import React, { ReactNode } from 'react';
import Head from 'next/head';

import Navigation from './Navigation';

import styles from './layout.module.scss';

type Props = {
  children?: ReactNode;
  title?: string;
};

function Layout({ children, title = 'Blog' }: Props) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Navigation />
      <main>{children}</main>
      <footer className={styles.footer}>
        <span>Desenvolvido por Tácio de Souza Campos</span>
      </footer>
    </div>
  );
}

export default Layout;
