import { Navbar, LoadingButton, ErrorSnackbar } from '@components/index';
import { Container, TextField, Theme, Grid } from '@material-ui/core';
import { useState, ChangeEvent, FormEvent } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import * as ProducerAPI from '@api/producer';
import Router from 'next/router';
import './new.css';
import { SearchBar } from './_SearchBar';
import * as yup from 'yup';
import { Formik, FormikTouched, FormikErrors } from 'formik';

export const NewProducerSchema = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),

  // do monte caburaí até o chuí
  latitude: yup
    .number()
    .required()
    .max(5)
    .min(-34),

  // de ilhas martin vaz até serra do divisor
  longitude: yup
    .number()
    .required()
    .max(-29)
    .min(-74),
});
type NewProducer = yup.InferType<typeof NewProducerSchema>;

const useStyles = makeStyles(() =>
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

function NewProducer() {
  const classes = useStyles();

  return (
    <>
      <Navbar admin />
      <Container>
        <Formik
          initialValues={{
            name: '',
            address: '',
            latitude: -9999,
            longitude: -9999,
          }}
          validationSchema={NewProducerSchema}
          onSubmit={(newProducer: NewProducer) => {
            return ProducerAPI.create(newProducer).then(res => {
              Router.push('/admin/producers');
            });
          }}
        >
          {({
            values,
            handleChange,
            errors,
            touched,
            handleSubmit,
            isSubmitting,
            setSubmitting,
            setFieldValue,
          }) => (
            <form
              onSubmit={async r => {
                await handleSubmit(r);

                setSubmitting(false);
              }}
              noValidate
              autoComplete="off"
              className={classes.container}
            >
              <TextField
                id="input-name"
                name="name"
                label="Nome"
                required
                value={values.name}
                error={!!(touched.name && errors.name)}
                onChange={handleChange}
                margin="normal"
                helperText={mountErrMsg(touched, errors, 'name')}
                fullWidth
              />

              <div className="search-bar-wrapper">
                <SearchBar
                  onPlaceChanged={v => {
                    setFieldValue('latitude', v.latitude);
                    setFieldValue('longitude', v.longitude);
                    setFieldValue('address', v.address);
                  }}
                ></SearchBar>
              </div>

              <TextField
                id="address"
                label="Endereço Amigável"
                value={values.address}
                required
                onChange={handleChange}
                error={!!(touched.address && errors.address)}
                margin="normal"
                helperText={mountErrMsg(
                  touched,
                  errors,
                  'address',
                  'Que será mostrado ao usuário'
                )}
                fullWidth
              />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="input-latitude"
                    label="Latitude"
                    value={values.latitude}
                    error={!!(touched.latitude && errors.latitude)}
                    helperText={mountErrMsg(touched, errors, 'latitude')}
                    required
                    margin="normal"
                    disabled
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="input-longitude"
                    label="Longitude"
                    value={values.longitude}
                    error={!!(touched.longitude && errors.longitude)}
                    helperText={mountErrMsg(touched, errors, 'longitude')}
                    required
                    margin="normal"
                    disabled
                    fullWidth
                  />
                </Grid>
              </Grid>

              <LoadingButton
                loading={isSubmitting}
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
              >
                Salvar
              </LoadingButton>
            </form>
          )}
        </Formik>
      </Container>
    </>
  );
}

export default NewProducer;

function mountErrMsg(
  touched: FormikTouched<NewProducer>,
  errors: FormikErrors<NewProducer>,
  name: keyof NewProducer,
  defaultMsg = ' '
) {
  // return defaultMessage except when there's no an error
  // otherwise everytime error shows up
  // the content will be shifted
  if (touched[name] && errors[name]) {
    return errors[name];
  }

  return defaultMsg;
}
