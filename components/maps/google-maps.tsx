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
 * Create a global interactive map.
 *
 * TODO: imperatively set center and zoom based on
 * options change (?)
 *
 * See:
 * https://developers.google.com/maps/documentation/javascript/reference/map
 * https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
 */
export function useInteractiveMap(
  mapContainer: HTMLElement | undefined,
  map: InteractiveMap,
  options: google.maps.MapOptions,
  onMapInit: (map: InteractiveMap) => void
) {
  const api = useGoogleMaps();

  useEffect(() => {
    if (!api.init || !mapContainer || map.init) {
      return;
    }

    const newMap = new api.google.maps.Map(mapContainer, options);
    onMapInit({ init: true, map: newMap });
  }, [api.init, map.init, mapContainer]);
}

export type Markers =
  | { init: false }
  | { init: true; markers: google.maps.Marker[] };

/**
 * Create global markers on the map.
 *
 * TODO: imperatively hide markers base on markerOptions (?)
 *
 * https://developers.google.com/maps/documentation/javascript/adding-a-google-map
 */
export function useMarkers(
  interactiveMap: InteractiveMap,
  markers: Markers,
  markerOptions: Omit<google.maps.ReadonlyMarkerOptions, 'map'>[],
  onMarkersInit: (markers: Markers) => void
) {
  useEffect(() => {
    if (!interactiveMap.init || markers.init) {
      return;
    }

    // TODO: marker images
    const newMarkers = markerOptions.map(
      (options) =>
        new google.maps.Marker({ map: interactiveMap.map, ...options })
    );

    onMarkersInit({ init: true, markers: newMarkers });
  }, [interactiveMap.init, markers.init]);
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
 * TODO: save state and cleanup
 *
 * https://developers.google.com/maps/documentation/javascript/marker-clustering
 */
export function useMarkerCluster(
  interactiveMap: InteractiveMap,
  markerOptions: Omit<google.maps.ReadonlyMarkerOptions, 'map'>[]
) {
  const api = useMarkerClustererPlus();

  useEffect(() => {
    if (!interactiveMap.init || !api.init) {
      return;
    }

    const markers = markerOptions.map(
      (options) => new google.maps.Marker(options)
    );

    new api.MarkerClusterer(interactiveMap.map, markers, {
      // TODO: cluster images
      imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    });
  }, [interactiveMap.init, (interactiveMap as any).map, api.init]);
}
