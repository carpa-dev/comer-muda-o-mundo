import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import NextApp, { Container } from 'next/app';
import React from 'react';
import theme from '../config/theme';
import ErrorComponent from '@app/containers/error';
import '../style.css';
import { registerInterceptors } from '@api/axios';
import Router from 'next/router';
import { logout } from '@api/auth';

class App extends NextApp {
  state = { error: null };

  componentDidMount() {
    // Remove the server-side injected CSS
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles !== null && jssStyles.parentNode !== null) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    registerInterceptors({
      onError: error => {
        this.setState({
          error,
        });
      },
      onNotLoggedIn: () => {
        logout();
        Router.push('/admin/login');
      },
    });
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />

          <ErrorComponent
            error={this.state.error}
            onClose={() => this.setState({ error: null })}
          ></ErrorComponent>
        </ThemeProvider>
      </Container>
    );
  }
}

export default App;
