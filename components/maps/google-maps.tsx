import type MarkerClusterer from '@google/markerclustererplus';
import { useEffect, useRef, useState } from 'react';

import { GOOGLE_MAPS_API_KEY } from '../../config/keys';

declare global {
  interface Window {
    /**
     * Google Maps API initialization callback.
     */
    initMap(): void;
  }
}

export type GoogleMaps =
  | { init: false }
  | { init: true; google: typeof window.google };

/**
 * Load Google Maps API on the browser.
 *
 * From the Dynamic Loading example:
 * https://developers.google.com/maps/documentation/javascript/overview#Loading_the_Maps_API
 */
export function useGoogleMaps(): GoogleMaps {
  const [init, setInit] = useState(
    typeof window !== 'undefined' && window.google !== undefined
  );

  useEffect(() => {
    if (init) {
      return;
    }

    // Create the script tag, set the appropriate attributes
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.defer = true;

    // Attach your callback function to the `window` object
    window.initMap = function () {
      // JS API is loaded and available
      setInit(true);
    };

    // Append the 'script' element to 'head'
    document.head.appendChild(script);
  }, []);

  return init ? { init, google: window.google } : { init };
}

export type InteractiveMap =
  | { init: false }
  | { init: true; map: google.maps.Map<HTMLElement> };

/**
 * Create an interactive map.
 * https://developers.google.com/maps/documentation/javascript/reference/map
 *
 * @param id of HTML element to serve as container
 * @param options https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
 */
export function useInteractiveMap(
  id: string,
  options: google.maps.MapOptions
): InteractiveMap {
  const api = useGoogleMaps();
  const [mapRef, setMapRef] = useState<
    google.maps.Map<HTMLElement> | undefined
  >(undefined);

  useEffect(() => {
    if (!api.init) {
      return;
    }

    const wrapper = document.getElementById(id);

    if (!wrapper) {
      return;
    }

    console.log('useinteractivemap');
    const map = new api.google.maps.Map(wrapper, options);

    setMapRef(map);
  }, [api.init]);

  return mapRef ? { init: true, map: mapRef } : { init: false };
}

export type Markers =
  | { init: false }
  | { init: true; markers: google.maps.Marker[] };

/**
 * Create markers on the map.
 *
 * https://developers.google.com/maps/documentation/javascript/adding-a-google-map
 */
export function useMarkers(
  interactiveMap: InteractiveMap,
  markerOptions: Omit<google.maps.ReadonlyMarkerOptions, 'map'>[]
): Markers {
  const [markersRef, setMarkersRef] = useState<
    google.maps.Marker[] | undefined
  >(undefined);

  useEffect(() => {
    if (!interactiveMap.init) {
      return;
    }

    // TODO: marker images
    const markers = markerOptions.map(
      (options) =>
        new google.maps.Marker({ map: interactiveMap.map, ...options })
    );

    setMarkersRef(markers);
  }, [interactiveMap.init, (interactiveMap as any).map]);

  return markersRef ? { init: true, markers: markersRef } : { init: false };
}

export type MarkerClustererPlus =
  | { init: false }
  | { init: true; MarkerClusterer: typeof MarkerClusterer };

/**
 * Load MarkerClustererPlus API.
 *
 * https://github.com/googlemaps/v3-utility-library/tree/master/packages/markerclustererplus
 */
export function useMarkerClustererPlus(): MarkerClustererPlus {
  // useState instead of useRef causes
  // TypeError: class constructors must be invoked with 'new'
  const apiRef = useRef<typeof MarkerClusterer | undefined>();

  useEffect(() => {
    if (!apiRef.current) {
      import('@google/markerclustererplus').then((mod) => {
        apiRef.current = mod.default;
      });
    }
  }, []);

  return apiRef.current
    ? { init: true, MarkerClusterer: apiRef.current }
    : { init: false };
}

export type MarkerClusters =
  | { init: false }
  | { init: true; cluster: MarkerClusterer; markers: google.maps.Marker[] };

/**
 * Create marker clusters on the map.
 *
 * https://developers.google.com/maps/documentation/javascript/marker-clustering
 */
export function useMarkerCluster(
  interactiveMap: InteractiveMap,
  markerOptions: Omit<google.maps.ReadonlyMarkerOptions, 'map'>[]
): MarkerClusters {
  const api = useMarkerClustererPlus();
  const [markersRef, setMarkersRef] = useState<
    google.maps.Marker[] | undefined
  >(undefined);
  const [markerClusterRef, setMarkerClusterRef] = useState<
    MarkerClusterer | undefined
  >(undefined);

  useEffect(() => {
    if (!interactiveMap.init || !api.init) {
      return;
    }

    const markers = markerOptions.map(
      (options) => new google.maps.Marker(options)
    );

    const markerCluster = new api.MarkerClusterer(interactiveMap.map, markers, {
      // TODO: cluster images
      imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    });

    setMarkersRef(markers);
    setMarkerClusterRef(markerCluster);
  }, [interactiveMap.init, (interactiveMap as any).map, api.init]);

  return markersRef && markerClusterRef
    ? { init: true, cluster: markerClusterRef, markers: markersRef }
    : { init: false };
}
