import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Formik } from 'formik';
import Head from 'next/head';
import Router from 'next/router';
import * as yup from 'yup';

import { activate, saveAuthToken } from '@api/auth';
import AdminPage from '@components/AdminPage';
import LoadingButton from '@components/LoadingButton';
import { withAuthInactive } from '@containers/withAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginBottom: `${theme.spacing(2)}px`,
    },
    description: {
      marginBottom: `${theme.spacing(2)}px`,
    },
    card: {
      width: '100%',
      maxWidth: 400,
      minHeight: 200,
      margin: 'auto',
    },
    input: {
      marginBottom: `${theme.spacing(2)}px`,
    },
  })
);

const schema = yup.object({
  password: yup.string().required('Preencha sua senha'),
  passwordConfirmation: yup
    .string()
    .required('Confirme sua senha')
    .oneOf([yup.ref('password'), ''], 'Senhas devem ser idênticas'),
});

function Activate() {
  const classes = useStyles();

  const onSubmit = ({ password }: { password: string }) => {
    if (event) {
      event.preventDefault();
    }

    activate({ password })
      .then((res: any) => {
        saveAuthToken(res.data);

        // TODO:
        // redirect to where it was trying to go
        Router.push('/admin');
      })
      .catch(() => {
        // TODO: handle API error
      });
  };

  return (
    <AdminPage noAuth>
      <Head>
        <title>Ativar conta</title>
      </Head>
      <Card className={classes.card} data-testid="activate-card">
        <CardContent>
          <Typography component="h1" variant="h6" className={classes.title}>
            Ativar conta
          </Typography>
          <Typography component="p" className={classes.description}>
            Por favor, mude sua senha.
          </Typography>
          <Formik
            initialValues={{
              password: '',
              passwordConfirmation: '',
            }}
            validationSchema={schema}
            onSubmit={onSubmit}
          >
            {({
              values,
              handleChange,
              errors,
              touched,
              handleSubmit,
              isSubmitting,
              setSubmitting,
            }) => (
              <form
                onSubmit={async r => {
                  await handleSubmit(r);
                  setSubmitting(false);
                }}
                noValidate
              >
                <TextField
                  id="password"
                  name="password"
                  label="Senha"
                  variant="outlined"
                  type="password"
                  inputProps={{ 'data-testid': 'password' }}
                  FormHelperTextProps={
                    {
                      'data-testid': 'password-helper',
                    } as any
                  }
                  className={classes.input}
                  value={values.password}
                  onChange={handleChange}
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password ? errors.password : ''}
                  fullWidth
                  required
                />
                <TextField
                  id="password-confirmation"
                  name="passwordConfirmation"
                  label="Confirme sua senha"
                  variant="outlined"
                  type="password"
                  inputProps={{ 'data-testid': 'password-confirmation' }}
                  FormHelperTextProps={
                    {
                      'data-testid': 'password-confirmation-helper',
                    } as any
                  }
                  className={classes.input}
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  error={
                    !!touched.passwordConfirmation &&
                    !!errors.passwordConfirmation
                  }
                  helperText={
                    touched.passwordConfirmation
                      ? errors.passwordConfirmation
                      : ''
                  }
                  fullWidth
                  required
                />
                <LoadingButton
                  color="primary"
                  variant="contained"
                  type="submit"
                  data-testid="submit"
                  loading={isSubmitting}
                  fullWidth
                >
                  Ativar
                </LoadingButton>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </AdminPage>
  );
}

export default withAuthInactive(Activate);
