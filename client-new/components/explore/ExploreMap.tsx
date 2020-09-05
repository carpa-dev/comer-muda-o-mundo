import { useEffect } from 'react';

import styles from './ExploreMap.module.css';
import { useInteractiveMap, useMarkerCluster } from '../maps/google-maps';

export function ExploreMap() {
  const center = {lat: -28.024, lng: 140.887};
  const zoom = 3;
  const map = useInteractiveMap('map', {
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    center,
    zoom,
  });
  
  const locations = [
    {position: {lat: -31.563910, lng: 147.154312}},
    {position: {lat: -33.718234, lng: 150.363181}},
    {position: {lat: -33.727111, lng: 150.371124}},
    {position: {lat: -33.848588, lng: 151.209834}},
    {position: {lat: -33.851702, lng: 151.216968}},
    {position: {lat: -34.671264, lng: 150.863657}},
    {position: {lat: -35.304724, lng: 148.662905}},
    {position: {lat: -36.817685, lng: 175.699196}},
    {position: {lat: -36.828611, lng: 175.790222}},
    {position: {lat: -37.750000, lng: 145.116667}},
    {position: {lat: -37.759859, lng: 145.128708}},
    {position: {lat: -37.765015, lng: 145.133858}},
    {position: {lat: -37.770104, lng: 145.143299}},
    {position: {lat: -37.773700, lng: 145.145187}},
    {position: {lat: -37.774785, lng: 145.137978}},
    {position: {lat: -37.819616, lng: 144.968119}},
    {position: {lat: -38.330766, lng: 144.695692}},
    {position: {lat: -39.927193, lng: 175.053218}},
    {position: {lat: -41.330162, lng: 174.865694}},
    {position: {lat: -42.734358, lng: 147.439506}},
    {position: {lat: -42.734358, lng: 147.501315}},
    {position: {lat: -42.735258, lng: 147.438000}},
    {position: {lat: -43.999792, lng: 170.463352}},
  ];
  const markers = useMarkerCluster(map, locations);

  useEffect(() => {
    if (!markers.init) {
      return () => {};
    }
    
    const listeners = markers.markers.map((marker) =>
      marker.addListener('click', (e) => {
        alert(e.latLng.toString());
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
