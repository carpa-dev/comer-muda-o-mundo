import Head from 'next/head';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createStyles,
  makeStyles,
  Theme,
  createMuiTheme,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {ThemeProvider} from '@material-ui/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

function Font() {
  return (
    <Head>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Head>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      fontWeight: 400,
      marginLeft: theme.spacing(2),
    },
    appTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
  }),
);

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.appTitle}>
          Comer muda o mundo
        </Typography>

        <Link
          variant="button"
          color="inherit"
          href="#"
          className={classes.link}>
          Quem Somos
        </Link>

        <Link
          variant="button"
          color="inherit"
          href="#"
          className={classes.link}>
          Mapa
        </Link>

        <Link
          variant="button"
          color="inherit"
          href="#"
          className={classes.link}>
          Iniciativas
        </Link>
      </Toolbar>
    </AppBar>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
});

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Font />

      <Navbar></Navbar>
      <main>cachorro</main>
    </ThemeProvider>
  );
}

export default Home;
