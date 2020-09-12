import Head from 'next/head';

import type { InteractiveMap, Markers } from '../components/maps/google-maps';
import { useExploreMap } from '../components/explore/ExploreMap';
import { getExploreMapLayout } from '../components/explore/ExploreMapLayout';
import { useInitiativesOnMap } from '../components/explore/ExploreMapInitiatives';
import { NoTransitionWrapper } from '../components/navigation/NoTransitionWrapper';
import { InitiativePreview } from '../components/explore/InitiativePreview';

interface HomeProps {
  map: InteractiveMap;
  mapContainer: HTMLElement | undefined;
  markers: Markers;
  onMapInit: (map: InteractiveMap) => void;
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
export default function Home({
  initiatives,
  map,
  mapContainer,
  markers,
  onMapInit,
  onMarkersInit,
}: HomeProps) {
  useExploreMap(map, mapContainer, onMapInit);
  useInitiativesOnMap(map, markers, initiatives, onMarkersInit);

  return (
    <NoTransitionWrapper>
      <Head>
        <title>comer muda o mundo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InitiativePreview initiatives={initiatives} />
    </NoTransitionWrapper>
  );
}

Home.getLayout = getExploreMapLayout;

export async function getStaticProps() {
  const getInitiativeSlug = (key: string) => {
    const exec = /\.\/(.*)\.json/.exec(key);
    // If for some reason there is no match, go to not found page
    return exec?.[1] ?? '404';
  };

  const initiatives = await (async (context) => {
    const keys = context.keys();
    return keys.map(context).map((initiative: any, i) => ({
      ...initiative,
      slug: getInitiativeSlug(keys[i]),
    }));
  })(require.context('../content/initiatives', false, /\.json/));

  // TODO:
  // validate schema
  return { props: { initiatives } };
}
