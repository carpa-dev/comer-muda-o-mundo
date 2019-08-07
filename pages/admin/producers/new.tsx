import { Navbar, LoadingButton } from '@components/index';
import { Container, TextField, Theme } from '@material-ui/core';
import { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import Keys from '../../../config/keys';
import * as ProducerAPI from '@api/producer';
import Router from 'next/router';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import './new.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    mapWrapper: {
      width: '100%',
      height: 300,
    },
  })
);

interface AddressChanged {
  address: string;
  latitude: number;
  longitude: number;
}

function NewProducer() {
  const classes = useStyles();

  const [values, setValues] = useState({
    form: {
      name: '',
      address: '',
      latitude: 0,
      longitude: 0,
    },
    addressSearch: undefined,

    submitting: false,
  });

  const handleChange = (name: string) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValues({
      ...values,
      form: {
        ...values.form,
        [name]: event.target.value,
      },
    });
  };

  const onPlaceChanged = (a: AddressChanged) => {
    setValues({
      ...values,
      form: {
        ...values.form,
        ...a,
      },
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    setValues({
      ...values,
      submitting: true,
    });

    ProducerAPI.NewProducerSchema.validate(values.form)
      .then(value => {
        console.log(value);

        return ProducerAPI.create(value);
      })
      .then(res => {
        console.log('response is', res);

        setValues({
          ...values,
          submitting: false,
        });

        Router.push('/admin/producers');
      })
      .catch(e => {
        setValues({
          ...values,
          submitting: false,
        });

        // TODO: show error
        //validation error
        console.error(e);
      });
  };

  return (
    <>
      <Navbar admin />
      <Container>
        <form
          onSubmit={onSubmit}
          noValidate
          autoComplete="off"
          className={classes.container}
        >
          <TextField
            id="input-name"
            label="Nome"
            required
            value={values.form.name}
            onChange={handleChange('name')}
            margin="normal"
            fullWidth
          />

          <div className="search-bar-wrapper">
            <SearchBar onPlaceChanged={onPlaceChanged}></SearchBar>
          </div>

          <TextField
            id="input-address"
            label="Endereço Amigável"
            value={values.form.address}
            required
            onInput={handleChange('address')}
            margin="normal"
            helperText="Que será mostrado ao usuário"
            fullWidth
          />

          <TextField
            id="input-latitude"
            label="Latitude"
            value={values.form.latitude}
            required
            margin="normal"
            disabled
          />

          <TextField
            id="input-longitude"
            label="Longitude"
            value={values.form.longitude}
            required
            margin="normal"
            disabled
          />

          <LoadingButton
            loading={values.submitting}
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
          >
            Salvar
          </LoadingButton>
        </form>
      </Container>
    </>
  );
}

function SearchBar(props: { onPlaceChanged: (data: AddressChanged) => void }) {
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

  const renderSearchBar = () => {
    return (
      <Autocomplete
        onLoad={ref => {
          setRef(ref);
        }}
        onPlaceChanged={onPlaceChanged}
        restrictions={{ country: ['br'] }}
      >
        <TextField
          id="input-address-search"
          label="Buscar endereço"
          fullWidth
          margin="normal"
          type="search"
        />
      </Autocomplete>
    );
  };

  return isLoaded ? renderSearchBar() : null;
}

export default NewProducer;
