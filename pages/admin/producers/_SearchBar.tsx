import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { useState } from 'react';
import { TextField } from '@material-ui/core';
import Keys from '@app/config/keys';
import { AddressChanged } from './models';

export function SearchBar(props: {
  onPlaceChanged: (data: AddressChanged) => void;
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: Keys.GOOGLE_MAPS_KEY,
    libraries: ['places'],
  });

  const [myRef, setRef] = useState<google.maps.places.Autocomplete | unknown>();

  const onPlaceChanged = () => {
    const r = myRef as google.maps.places.Autocomplete;

    if (
      !r.getPlace() ||
      !r.getPlace().geometry ||
      !r.getPlace().geometry!.location ||
      !r.getPlace().formatted_address
    ) {
      throw new Error(
        'Either Latitude/longitude or formatted_address is not defined'
      );
    } else {
      const latitude = r.getPlace()!.geometry!.location.lat();
      const longitude = r.getPlace()!.geometry!.location.lng();
      const address = r.getPlace().formatted_address!;

      props.onPlaceChanged({
        latitude,
        longitude,
        address,
      });
    }
  };

  const renderTextField = (options: { ready: boolean }) => {
    return (
      <TextField
        id="input-address-search"
        label="Buscar endereço"
        fullWidth
        disabled={!options.ready}
        margin="normal"
        type="search"
        helperText=" "
      />
    );
  };

  const renderSearchBar = () => {
    return (
      <Autocomplete
        onLoad={setRef}
        onPlaceChanged={onPlaceChanged}
        restrictions={{ country: ['br'] }}
      >
        {renderReadyTextField()}
      </Autocomplete>
    );
  };

  const renderReadyTextField = renderTextField.bind(null, { ready: true });
  const renderNotReadyTextField = renderTextField.bind(null, { ready: false });

  // render a disabled text field while maps component is being initialized
  // so that the ui doesn't flick
  return isLoaded ? renderSearchBar() : renderNotReadyTextField();
}
