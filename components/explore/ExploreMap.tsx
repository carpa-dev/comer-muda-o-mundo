import { useEffect } from 'react';

import type { InteractiveMap } from '../maps/google-maps';
import { useInteractiveMap } from '../maps/google-maps';
import { EXPLORE_MAP_WRAPPER_ID } from './dom';

// TODO: create configuration
const defaultCenter = { lat: -28.024, lng: 140.887 };
const defaultZoom = 3;
const defaultOptions: google.maps.MapOptions = {
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  center: defaultCenter,
  zoom: defaultZoom,
};

export function useExploreMap(
  map: InteractiveMap,
  mapContainer: HTMLElement | undefined,
  onMapInit: (map: InteractiveMap) => void
) {
  useInteractiveMap(mapContainer, map, defaultOptions, onMapInit);

  useEffect(() => {
    if (!mapContainer || !map.init) {
      return;
    }

    const wrapper = document.getElementById(EXPLORE_MAP_WRAPPER_ID);

    if (!wrapper) {
      return;
    }

    wrapper.appendChild(mapContainer);
  }, [mapContainer, map.init]);
}
