import Head from 'next/head';
import {createMuiTheme} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';
import {Navbar} from '../components';
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

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
});

function Base(props: any) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Font />
      <Navbar></Navbar>
      {props.children}
    </ThemeProvider>
  );
}

export default Base;
