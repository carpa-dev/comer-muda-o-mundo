import { Navbar, LoadingButton } from '@components/index';
import { Container, TextField, Theme } from '@material-ui/core';
import { useState, ChangeEvent, Component, createRef, FormEvent } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { withScriptjs } from 'react-google-maps';
import Keys from '../../../config/keys';
import { compose, withProps } from 'recompose';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import * as ProducerAPI from '@api/producer';
import Router from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
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

function NewProducer() {
  const classes = useStyles();

  const [values, setValues] = useState({
    form: {
      name: '',
      address: '',
      latitude: '',
      longitude: '',
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
            className={classes.textField}
            onChange={handleChange('name')}
            margin="normal"
            fullWidth
          />

          <PlacesWithStandaloneSearchBox
            value={values.addressSearch}
            className={classes.textField}
            onChange={(p: any) => {
              const {
                formatted_address,
                geometry: { location },
              } = p[0];
              setValues({
                ...values,
                form: {
                  ...values.form,
                  latitude: location.lat(),
                  longitude: location.lng(),
                  address: formatted_address,
                },
              });
            }}
            onInput={() => {
              // can improve this by creating a flag
              setValues({
                ...values,
                form: {
                  ...values.form,
                  latitude: '',
                  longitude: '',
                  address: '',
                },
              });
            }}
          />

          <TextField
            id="input-address"
            label="Endereço Amigável"
            value={values.form.address}
            required
            className={classes.textField}
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
            className={classes.textField}
            margin="normal"
            disabled
          />

          <TextField
            id="input-longitude"
            label="Longitude"
            value={values.form.longitude}
            required
            className={classes.textField}
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

interface PlacesWithStandaloneSearchBoxProps {
  className: string;
  onChange: (places: any[]) => void;
  onInput: () => void;
  value: any;
}

interface PlacesWithStandaloneSearchBoxState {
  places: any[];
}

class PlacesWithStandaloneSearchBox_ extends Component<
  PlacesWithStandaloneSearchBoxProps,
  PlacesWithStandaloneSearchBoxState
> {
  ref = createRef<any>();

  constructor(props: PlacesWithStandaloneSearchBoxProps) {
    super(props);
    this.state = {
      places: [],
    };
  }

  onPlacesChanged = () => {
    const places = this.ref.current.getPlaces();
    this.setState({ places });
    this.props.onChange(places);
  };

  render() {
    return (
      <StandaloneSearchBox
        ref={this.ref}
        // bounds={this.props.bounds}
        onPlacesChanged={this.onPlacesChanged}
      >
        <TextField
          id="input-address-search"
          label="Buscar endereço"
          value={this.props.value}
          className={this.props.className}
          onInput={this.props.onInput}
          margin="normal"
          type="search"
          fullWidth
        />
      </StandaloneSearchBox>
    );
  }
}

const PlacesWithStandaloneSearchBox = compose<
  PlacesWithStandaloneSearchBoxProps,
  PlacesWithStandaloneSearchBoxProps
>(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${Keys.GOOGLE_MAPS_KEY}&libraries=places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  withScriptjs
)(PlacesWithStandaloneSearchBox_);

// @ts-ignore-start
// const PlacesWithStandaloneSearchBox = compose<any, any>(
//   withProps({
//     googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${Keys.GOOGLE_MAPS_KEY}&libraries=geometry,drawing,places`,
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     onChange: (a) => console.log(a),
//   }),
//   lifecycle({
//     componentWillMount() {
//       const refs: any = {};

//       this.setState({
//         places: [],
//         onSearchBoxMounted: (ref: any) => {
//           refs.searchBox = ref as any;
//         },
//         onPlacesChanged: () => {
//           const places = refs.searchBox.getPlaces();

//           this.setState({
//             places,
//           });
//         },
//       });
//     },
//   }),
//   withScriptjs
// )((props: any) => (
//   <div data-standalone-searchbox="">
//     <StandaloneSearchBox
//       ref={props.onSearchBoxMounted}
//       bounds={props.bounds}
//       onPlacesChanged={props.onPlacesChanged}
//     >
//       <TextField
//         id="address-search"
//         label="Endereço Busca"
//         //value={props.addressSearch}
//         //className={props.className}
//         onChange={() => props.onChange(props.places)}
//         helperText="Utilizado para buscar latitude/longitude"
//         margin="normal"
//       />
//     </StandaloneSearchBox>
//     <ol>
//       {props.places.map(({ place_id, geometry: { location } }: any) => (
//         <li key={place_id}>
//           ({location.lat()}, {location.lng()})
//         </li>
//       ))}
//     </ol>
//   </div>
// ));
// @ts-ignore-end

export default NewProducer;
