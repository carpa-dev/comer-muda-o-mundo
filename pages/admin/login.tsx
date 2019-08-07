// import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import cookie from 'js-cookie';
import { useState, FormEvent } from 'react';

import { login } from '../../api/auth';
import { Navbar, LoadingButton } from '../../components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: '100%',
      maxWidth: 400,
      minHeight: 200,
      margin: `${theme.spacing(3)}px auto`,
    },
    input: {
      marginBottom: `${theme.spacing(2)}px`,
    },
    loading: {},
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
        console.log(res);
        cookie.set('token', res.data.token, { expires: 1 });
      })
      .catch(() => setLoading(false));
  };

  return (
    <>
      <Navbar admin />
      <main>
        <Card className={classes.card}>
          <CardContent>
            <Typography component="h1" variant="h6" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                id="uid"
                label="Email ou usuário"
                value={uid}
                onChange={event => setUid(event.target.value)}
                className={classes.input}
                variant="outlined"
                autoFocus
                fullWidth
                required
              />
              <TextField
                id="password"
                label="Senha"
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                className={classes.input}
                variant="outlined"
                fullWidth
                required
              />
              <LoadingButton
                loading={loading}
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
              >
                Entrar
              </LoadingButton>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

export default AdminLogin;
