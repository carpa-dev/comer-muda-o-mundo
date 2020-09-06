import type { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';

import styles from './ExploreMap.module.css';
import type { InteractiveMap } from '../maps/google-maps';
import { useInteractiveMap, useMarkers } from '../maps/google-maps';

interface ExploreMapProps {
  center: google.maps.LatLngLiteral;
  onInit(map: InteractiveMap): void;
  zoom: number;
}

export function ExploreMap({ center, zoom, onInit }: ExploreMapProps) {
  // const router = useRouter();

  const map = useInteractiveMap('map', {
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    center,
    zoom,
  });

  useEffect(() => {
    if (map.init) {
      onInit(map);
    }
  }, [map.init]);
  
  // const markers = useMarkers(map, places);

  // useEffect(() => {
  //   if (!markers.init) {
  //     return () => {};
  //   }
    
  //   const listeners = markers.markers.map((marker) =>
  //     marker.addListener('click', (e) => {
  //       router.push('/initiatives/my-slug')
  //     })
  //   );

  //   return () => {
  //     console.log('remove marker listeners')
  //     listeners.forEach((listener) => {
  //       google.maps.event.removeListener(listener);
  //     });
  //   };
  // }, [markers.init]);

  return (
    <div className={styles.mapArea}>
      <div id="map" className={styles.map}></div>
    </div>
  );
}

type ExploreMapLayoutProps = Omit<ExploreMapProps, 'places'> & {
  children: ReactNode;
  onMapInit(map: InteractiveMap): void;
}

export function ExploreMapLayout({ children, center, zoom, onMapInit }: ExploreMapLayoutProps) {
  console.log('map layout');
  return (
    <Fragment>
      <ExploreMap
        center={center}
        zoom={zoom}
        onInit={onMapInit}
      />
      {children}
    </Fragment>
  );
}
