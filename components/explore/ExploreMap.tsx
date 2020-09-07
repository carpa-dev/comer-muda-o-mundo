import { Fragment, useEffect } from 'react';

import type { InteractiveMap } from '../maps/google-maps';
import { useInteractiveMap } from '../maps/google-maps';
import { PageOverlayWrapper } from '../navigation/PageOverlayWrapper';
import type { GlobalExploreMapState } from './global-state';
import styles from './ExploreMap.module.css';

interface ExploreMapLayoutOptions {
  overlay: boolean;
}

/**
 * Shared map between pages with an optional content overlay.
 */
export function getExploreMapLayout(options: ExploreMapLayoutOptions = { overlay: false }) {
  return (layoutOptions: GlobalExploreMapState, page: JSX.Element) => {
    return (
      <Fragment>
        <ExploreMap {...layoutOptions} />
        {!options.overlay ? page : null}
        <PageOverlayWrapper show={options.overlay}>
          {page}
        </PageOverlayWrapper>
      </Fragment>
    );
  }
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
