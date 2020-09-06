import { useRouter } from 'next/router';
import { useEffect } from 'react';

import type { InteractiveMap, Markers } from '../maps/google-maps';
import { useMarkers } from '../maps/google-maps';

export function useInitiativesOnMap(
  map: InteractiveMap,
  markers: Markers,
  initiatives: any,
  onMarkersInit: (markers: Markers) => void,
) {
  const router = useRouter();
  
  useMarkers(map, markers, initiatives, onMarkersInit);

  useEffect(() => {
    if (!markers.init) {
      return () => {};
    }
    
    const listeners = markers.markers.map((marker, i) =>
      marker.addListener('click', () => {
        router.push(`/initiatives/${initiatives[i].slug}`);
      })
    );

    return () => {
      listeners.forEach((listener) => {
        google.maps.event.removeListener(listener);
      });
    };
  }, [markers.init]);
}