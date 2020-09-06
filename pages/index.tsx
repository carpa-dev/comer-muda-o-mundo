import Head from 'next/head';
import { Fragment } from 'react';

import type { InteractiveMap, Markers } from '../components/maps/google-maps';
import { ExploreMapLayout } from '../components/explore/ExploreMap';
import { useInitiativesOnMap } from '../components/explore/ExploreMapInitiatives';

interface HomeProps {
  map: InteractiveMap;
  markers: Markers;
  onMarkersInit: (markers: Markers) => void;
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
 */
export default function Home({ initiatives, map, markers, onMarkersInit }: HomeProps) {  
  useInitiativesOnMap(map, markers, initiatives, onMarkersInit);

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
