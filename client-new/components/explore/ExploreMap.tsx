import { useRouter } from 'next/router';
import { useEffect } from 'react';

import styles from './ExploreMap.module.css';
import { useInteractiveMap, useMarkers } from '../maps/google-maps';

interface ExploreMapProps {
  center: google.maps.LatLngLiteral;
  places: {
    title: string;
    description: string;
    position: google.maps.LatLngLiteral;
  }[];
  zoom: number;
}

export function ExploreMap({ center, places, zoom }: ExploreMapProps) {
  const router = useRouter();

  const map = useInteractiveMap('map', {
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    center,
    zoom,
  });
  
  const markers = useMarkers(map, places);

  useEffect(() => {
    if (!markers.init) {
      return () => {};
    }
    
    const listeners = markers.markers.map((marker) =>
      marker.addListener('click', (e) => {
        router.push('/initiatives/my-slug')
      })
    );

    return () => {
      listeners.forEach((listener) => {
        google.maps.event.removeListener(listener);
      });
    };
  }, [markers]);

  return (
    <div className={styles.mapArea}>
      <div id="map" className={styles.map}></div>
    </div>
  );
}
