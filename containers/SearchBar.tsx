import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@material-ui/core/TextField';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { useState } from 'react';

import Keys from '@app/config/keys';

function TextField({ disabled }: MuiTextFieldProps) {
  return (
    <MuiTextField
      id="input-address-search"
      label="Buscar endereço"
      margin="normal"
      type="search"
      variant="outlined"
      helperText=" "
      disabled={disabled}
      fullWidth
    />
  );
}

interface Place {
  address: string;
  latitude: number;
  longitude: number;
}

interface SearchBarProps {
  onPlaceChanged: (place: Place) => void;
}

function SearchBar({ onPlaceChanged }: SearchBarProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: Keys.GOOGLE_MAPS_KEY,
    libraries: ['places'],
  });

  const [ref, setRef] = useState<google.maps.places.Autocomplete | unknown>();

  const handlePlaceChanged = () => {
    const r = ref as google.maps.places.Autocomplete;

    if (
      !r.getPlace() ||
      !r.getPlace().geometry ||
      !r.getPlace().geometry!.location ||
      !r.getPlace().formatted_address
    ) {
      throw new Error(
        'Either latitude/longitude or formatted_address is not defined'
      );
    }

    const latitude = r.getPlace()!.geometry!.location.lat();
    const longitude = r.getPlace()!.geometry!.location.lng();
    const address = r.getPlace().formatted_address!;

    onPlaceChanged({
      latitude,
      longitude,
      address,
    });
  };

  // render a disabled text field while maps component is being initialized
  // so that the ui doesn't flick
  return isLoaded ? (
    <Autocomplete
      onLoad={setRef}
      onPlaceChanged={handlePlaceChanged}
      restrictions={{ country: ['br'] }}
    >
      <TextField />
    </Autocomplete>
  ) : (
    <TextField disabled />
  );
}

export default SearchBar;
