import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

import Keys from '@app/config/keys';

const CENTER = {
  lat: -22.923063,
  lng: -43.1906397,
};

interface InteractiveMapProps {
  onMarkerClick: () => void;
}

function InteractiveMap({ onMarkerClick }: InteractiveMapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: Keys.GOOGLE_MAPS_KEY,
  });

  const renderMap = () => {
    return (
      <GoogleMap
        center={CENTER}
        mapContainerStyle={{ height: '100%' }}
        zoom={13}
      >
        <Marker onClick={onMarkerClick} position={CENTER} />
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Erro ao carregar mapa.</div>;
  }

  return isLoaded ? renderMap() : null;
}

export default InteractiveMap;
