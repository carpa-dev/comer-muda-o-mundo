import { Marker as BaseMarker, MarkerProps } from '@react-google-maps/api';

import theme from '../../config/theme';

function Marker(props: MarkerProps) {
  const icon = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: theme.palette.primary.light,
    fillOpacity: 0.8,
    strokeColor: theme.palette.secondary.light,
    strokeWeight: 3,
    scale: 9,
  };

  return <BaseMarker icon={icon} {...props} />;
}

export default Marker;
