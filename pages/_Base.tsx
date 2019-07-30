import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Head from 'next/head';
import { useEffect } from 'react';

import { Navbar } from '../components';

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
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles !== null && jssStyles.parentNode !== null) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  });

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
