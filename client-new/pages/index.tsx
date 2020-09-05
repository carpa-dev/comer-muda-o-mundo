import Head from 'next/head';
import { Fragment } from 'react';

import { ExploreMap } from '../components/explore/ExploreMap';
import styles from '../styles/Home.module.css';

/**
 * CMS:
 * titulo
 * descrição
 * centro inicial do mapa (?)
 * zoom inicial do mapa (?)
 */
export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>comer muda o mundo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ExploreMap />
      </main>
    </Fragment>
  )
}
