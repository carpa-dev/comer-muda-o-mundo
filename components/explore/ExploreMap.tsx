import type { ReactNode } from 'react';
import { Fragment, useEffect } from 'react';

import type { InteractiveMap } from '../maps/google-maps';
import { useInteractiveMap } from '../maps/google-maps';
import type { GlobalExploreMapState } from './global-state';
import styles from './ExploreMap.module.css';

type ExploreMapLayoutProps = GlobalExploreMapState & {
  children: ReactNode;
}

/**
 * Shared map between pages.
 */
export function ExploreMapLayout({ children, ...props }: ExploreMapLayoutProps) {
  return (
    <Fragment>
      <ExploreMap {...props} />
      {children}
    </Fragment>
  );
}

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

interface ExploreMapProps {
  map: InteractiveMap;
  mapContainer: HTMLElement| undefined;
  onMapInit(map: InteractiveMap): void;
}

export function ExploreMap({ map, mapContainer, onMapInit }: ExploreMapProps) {
  useInteractiveMap(mapContainer, map, defaultOptions, onMapInit);

  useEffect(() => {
    if (!mapContainer || !map.init) {
      return;
    }
  
    const wrapper = document.getElementById('explore-map');

    if (!wrapper) {
      return;
    }

    wrapper.appendChild(mapContainer);
  }, [mapContainer, map.init]);

  return (
    <div id="explore-map" className={styles.mapArea}></div>
  );
}
