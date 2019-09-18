import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useCallback, useState } from 'react';

import Keys from '@app/config/keys';
import Marker from '@components/Maps/Marker';
import MarkerTooltip from '@components/Maps/MarkerTooltip';
import { PublicInitiative } from '@app/models/publicInitiative';

// https://jsfiddle.net/svigna/VzYF6/
function fromLatLngToPoint(map: google.maps.Map, latLng: google.maps.LatLng) {
  const bounds = map.getBounds();
  const projection = map.getProjection();

  if (!bounds) {
    throw new Error('Bounds is null');
  }

  if (!projection) {
    throw new Error('Projection is null');
  }

  const topRight = projection.fromLatLngToPoint(bounds.getNorthEast());
  const bottomLeft = projection.fromLatLngToPoint(bounds.getSouthWest());
  const scale = Math.pow(2, map.getZoom());
  const worldPoint = projection.fromLatLngToPoint(latLng);

  return new google.maps.Point(
    (worldPoint.x - bottomLeft.x) * scale,
    (worldPoint.y - topRight.y) * scale
  );
}

interface InteractiveMapProps {
  onMarkerClick: (i: PublicInitiative) => void;
  initiatives: PublicInitiative[] | undefined;
}

function InteractiveMap({ onMarkerClick, initiatives }: InteractiveMapProps) {
  const [map, setMap] = useState<google.maps.Map | undefined>(undefined);
  const [showTooltip, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<
    google.maps.Point | undefined
  >(undefined);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: Keys.GOOGLE_MAPS_KEY,
  });

  const onMarkerMouseOver = (event: google.maps.MouseEvent) => {
    try {
      if (!map) return;
      const point = fromLatLngToPoint(map, event.latLng);
      setTooltipPosition(point);
      setTooltipVisible(true);
    } catch (error) {
      // TODO: log?
    }
  };
  const onMarkerMouseOut = () => setTooltipVisible(false);

  if (!isLoaded) {
    return null;
  }

  if (loadError) {
    // TODO: improve?
    return <div>Erro ao carregar mapa.</div>;
  }

  const renderMarkers = (initiatives: PublicInitiative[]) => {
    return initiatives.map(i => {
      return (
        <Marker
          onClick={onMarkerClick.bind(null, i)}
          //onMouseOver={onMarkerMouseOver}
          //onMouseOut={onMarkerMouseOut}
          position={{ lat: i.latitude, lng: i.longitude }}
        />
      );
    });
  };

  return (
    <InteractiveMapComponent map={map} setMap={setMap}>
      {initiatives ? renderMarkers(initiatives) : null}

      {/*tooltipPosition && (
        <MarkerTooltip open={showTooltip} position={tooltipPosition}>
          Raízes do Brasil
        </MarkerTooltip>
      )*/}
    </InteractiveMapComponent>
  );
}

const CENTER = {
  // TODO: double-check this?
  lat: -22.923063,
  lng: -43.1906397,
};

const mapContainerStyle = {
  height: '100%',
};

interface InteractiveMapComponentProps {
  children: React.ReactNode;
  map: google.maps.Map | undefined;
  setMap: (map: google.maps.Map) => void;
}

const InteractiveMapComponent = ({
  children,
  map,
  setMap,
}: InteractiveMapComponentProps) => {
  const onLoad = useCallback(setMap, [map]);

  return (
    <GoogleMap
      center={CENTER}
      mapContainerStyle={mapContainerStyle}
      onLoad={onLoad}
      zoom={13}
    >
      {children}
    </GoogleMap>
  );
};

export default InteractiveMap;
