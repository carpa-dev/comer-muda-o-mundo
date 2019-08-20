import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';
import Router from 'next/router';
import { useState, FormEvent } from 'react';

import { login, saveAuthToken } from '@api/auth';
import AdminPage from '@components/AdminPage';
import LoadingButton from '@components/LoadingButton';
import withGuest from '@containers/withGuest';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
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

function AdminLogin() {
  const classes = useStyles();
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    setLoading(true);

    login({ uid, password })
      .then((res: any) => {
        setLoading(false);

        saveAuthToken(res.data);

        // TODO:
        // redirect to where it was trying to go
        Router.push('/admin');
      })
      .catch(() => setLoading(false));
  };

  return (
    <AdminPage noAuth>
      <Head>
        <title>Login - Comer muda o mundo</title>
      </Head>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            component="h1"
            variant="h6"
            className={classes.title}
            gutterBottom
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="uid"
              label="Email ou usuário"
              variant="outlined"
              className={classes.input}
              value={uid}
              onChange={event => setUid(event.target.value)}
              autoFocus
              fullWidth
              required
            />
            <TextField
              id="password"
              label="Senha"
              variant="outlined"
              type="password"
              className={classes.input}
              value={password}
              onChange={event => setPassword(event.target.value)}
              fullWidth
              required
            />
            <LoadingButton
              color="primary"
              variant="contained"
              type="submit"
              loading={loading}
              fullWidth
            >
              Entrar
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </AdminPage>
  );
}

export default withGuest(AdminLogin);
