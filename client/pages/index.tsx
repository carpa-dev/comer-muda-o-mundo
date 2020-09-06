import Head from 'next/head';
import { Fragment } from 'react';

import { ExploreMapLayout } from '../components/explore/ExploreMap';

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
  return (
    <Fragment>
      <Head>
        <title>comer muda o mundo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Fragment>
  );
}

Home.Layout = ExploreMapLayout;

export async function getStaticProps() {
  const initiatives = await (async (context) => {
    const keys = context.keys();
    return keys.map(context);
  })(require.context('../initiatives', false, /\.json/));

  // TODO:
  // validate schema
  return { props: { initiatives } };
}
