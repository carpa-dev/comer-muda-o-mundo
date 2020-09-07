import { useEffect, useMemo, useState } from 'react';

import type { InteractiveMap, Markers } from '../maps/google-maps';
import { EXPLORE_MAP_WIDGET_ID } from './dom';

const initialMap: InteractiveMap = { init: false };
const initialMarkers: Markers = { init: false };

export interface GlobalExploreMapState {
  map: InteractiveMap;
  mapContainer: HTMLElement | undefined;
  markers: Markers;
  onMapInit(map: InteractiveMap): void;
  onMarkersInit(markers: Markers): void;
}

/**
 * Setup explore map global state to share map instance
 * across all pages. Since the instance is the same,
 * viewport state (center, zoom) is also kept between navigations.
 *
 * TODO: use context (?)
 */
export function useGlobalExploreMap(): GlobalExploreMapState {
  const [map, setMap] = useState<InteractiveMap>(initialMap);
  const [mapContainer, setMapContainer] = useState<HTMLElement | undefined>(
    undefined
  );
  const [markers, setMarkers] = useState<Markers>(initialMarkers);

  useEffect(() => {
    const container = document.createElement('div');
    container.id = EXPLORE_MAP_WIDGET_ID;
    container.className = 'w-full h-full';
    setMapContainer(container);
  }, []);

  const state = useMemo(
    () => ({
      map,
      mapContainer,
      markers,
      onMapInit: setMap,
      onMarkersInit: setMarkers,
    }),
    [map, setMap, mapContainer, markers, setMarkers]
  );

  return state;
}
