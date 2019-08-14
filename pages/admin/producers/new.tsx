import { Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Formik, FormikTouched, FormikErrors } from 'formik';
import Head from 'next/head';
import Router from 'next/router';
import * as yup from 'yup';

import * as ProducerAPI from '@api/producer';
import AdminPage from '@components/AdminPage';
import Breadcrumbs from '@components/Breadcrumbs';
import LoadingButton from '@components/LoadingButton';
import SearchBar from '@containers/SearchBar';
import withAuth from '@containers/withAuth';
import '@styles/search-bar.css';

const NewProducerSchema = yup.object({
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

function NewProducer() {
  const classes = useStyles();

  return (
    <AdminPage>
      <Head>
        <title>Nova iniciativa - Comer muda o mundo</title>
      </Head>

      <Breadcrumbs
        aria-label="Breadcrumb"
        items={[
          { href: '/admin', label: 'Admin' },
          { href: '/admin/producers', label: 'Iniciativas' },
          { href: '/admin/producers/new', label: 'Nova iniciativa' },
        ]}
      />

      <Typography component="h1" variant="h4" gutterBottom>
        Nova iniciativa
      </Typography>

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
              margin="normal"
              variant="outlined"
              value={values.name}
              error={!!(touched.name && errors.name)}
              onChange={handleChange}
              helperText={mountErrMsg(touched, errors, 'name')}
              fullWidth
              required
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
              margin="normal"
              variant="outlined"
              value={values.address}
              onChange={handleChange}
              error={!!(touched.address && errors.address)}
              helperText={mountErrMsg(
                touched,
                errors,
                'address',
                'Que será mostrado ao usuário'
              )}
              fullWidth
              required
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="input-latitude"
                  margin="normal"
                  label="Latitude"
                  variant="outlined"
                  value={values.latitude}
                  error={!!(touched.latitude && errors.latitude)}
                  helperText={mountErrMsg(touched, errors, 'latitude')}
                  disabled
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="input-longitude"
                  label="Longitude"
                  margin="normal"
                  variant="outlined"
                  value={values.longitude}
                  error={!!(touched.longitude && errors.longitude)}
                  helperText={mountErrMsg(touched, errors, 'longitude')}
                  disabled
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <LoadingButton
              color="primary"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              fullWidth
            >
              Salvar
            </LoadingButton>
          </form>
        )}
      </Formik>
    </AdminPage>
  );
}

export default withAuth(NewProducer);
