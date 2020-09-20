import { Map } from 'immutable'; // Netlify CMS uses Immutable
import { Component } from 'react';

import { loadGoogleMaps } from '../../maps/google-maps';
import styles from './EnhancedMapWidgetControl.module.css';

interface Place {
  coordinates: {
    lat: number;
    lng: number;
  };
  formattedAddress: string;
  placeId: string;
}

// https://www.netlifycms.org/docs/custom-widgets/
interface EnhancedMapWidgetControlProps {
  classNameWrapper: string;
  forID: string;
  onChange(data: Place): void;
  value: Place | Map<string, any> | undefined; // hard to type this properly with immutable
}

export class EnhancedMapWidgetControl extends Component<
  EnhancedMapWidgetControlProps
> {
  componentDidMount() {
    if (!window.google) {
      loadGoogleMaps(this.setupWidgets, ['places']);
    } else {
      this.setupWidgets();
    }
  }

  componentWillUnmount() {
    // TODO: clean up map and autocomplete
  }

  setupWidgets = () => {
    setupGoogleMapsWidgets(
      this.props.forID,
      this.props.onChange,
      this.props.value as Map<string, any> | undefined // Initial value is never plain JS
    );
  };

  render() {
    const { classNameWrapper, forID, value } = this.props;
    const defaultValue =
      value && Map.isMap(value)
        ? (value as Map<string, any>).get('formattedAddress')
        : value;

    return (
      <div
        id="enhanced-map-widget"
        className={classNameWrapper}
        style={{ padding: 0 }}
      >
        <div id="map" className={styles.map}></div>
        <input
          id={forID}
          className={styles.input}
          defaultValue={defaultValue}
          type="text"
          placeholder="Digite o endereço ou o nome do estabelecimento"
        />
      </div>
    );
  }
}

const defaultInitialCenter = { lat: -14.235004, lng: -51.92528 }; // Brasil
const defaultInitialZoom = 3; // Country view

const defaultPlaceZoom = 17; // Adjust this to whatever looks good

function setupGoogleMapsWidgets(
  inputId: string,
  onChange: (place: Place) => void,
  initialPlace?: Map<string, any>
) {
  const container = document.getElementById('map');
  const input = document.getElementById(inputId);

  if (!container || !input) {
    return;
  }

  const map = new google.maps.Map(container, {
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    center: initialPlace?.get('coordinates').toJS() ?? defaultInitialCenter,
    zoom: initialPlace ? defaultPlaceZoom : defaultInitialZoom,
  });

  const autocomplete = new google.maps.places.Autocomplete(
    input as HTMLInputElement
  );

  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo('bounds', map);

  // Return only basic info fields
  // Billing info:
  // https://developers.google.com/maps/documentation/javascript/places#place_search_fields
  autocomplete.setFields([
    'business_status',
    'formatted_address',
    'geometry',
    'icon',
    'name',
    'photos',
    'place_id',
    'plus_code',
    'types',
  ]);

  const marker = new google.maps.Marker({
    map,
    position: initialPlace?.get('coordinates').toJS(),
    visible: !!initialPlace,
  });

  autocomplete.addListener('place_changed', () => {
    marker.setVisible(false);
    const place = autocomplete.getPlace();

    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed
      window.alert("Sem resultados para a busca '" + place.name + "'");
      return;
    }

    if (!place.formatted_address) {
      window.alert('Erro: campo formatted_address vazio');
      return;
    }

    if (!place.place_id) {
      window.alert('Erro: campo place_id vazio');
      return;
    }

    onChange({
      coordinates: place.geometry.location.toJSON(),
      formattedAddress: place.formatted_address,
      placeId: place.place_id,
    });

    // If the place has a geometry, then present it on a map
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(defaultPlaceZoom);
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
  });
}
