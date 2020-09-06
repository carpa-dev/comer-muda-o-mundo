import Head from 'next/head';
import Link from 'next/link';
import { Fragment } from 'react';

import { ExploreMap } from '../components/explore/ExploreMap';
import styles from '../styles/Home.module.css';

interface HomeProps {
  initiatives: {
    title: string;
    description: string;
    slug: string;
    position: google.maps.LatLngLiteral;
  }[];
}

/**
 * CMS:
 * titulo
 * descrição
 * centro inicial do mapa (?)
 * zoom inicial do mapa (?)
 */
export default function Home({ initiatives }: HomeProps) {
  const init = initiatives.map((a) => (
    <li key={a.slug}>
      <Link href={'/initiatives/' + a.slug}>
        <a>{a.title}</a>
      </Link>

      {a.description}
    </li>
  ));
  const center = {lat: -28.024, lng: 140.887};
  const zoom = 3;
  
  return (
    <Fragment>
      <Head>
        <title>comer muda o mundo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="font-mono text-4xl text-teal-600">Initiatives</h1>
        <ul>{init}</ul>
        <ExploreMap
          center={center}
          zoom={zoom}
          places={initiatives}
        />
      </main>
    </Fragment>
  );
}

export async function getStaticProps() {
  const initiatives = await (async (context) => {
    const keys = context.keys();
    return keys.map(context);
  })(require.context('../initiatives', false, /\.json/));

  // TODO:
  // validate schema
  return { props: { initiatives } };
}
