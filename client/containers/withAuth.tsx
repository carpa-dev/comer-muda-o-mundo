import { NextComponentType } from 'next';
import { DocumentContext } from 'next/document';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import { Component } from 'react';
import * as jwt from 'jsonwebtoken';

// this is loosely based on
// https://github.com/zeit/next.js/blob/canary/examples/with-cookie-auth/utils/auth.js
const getDisplayName = (Component: NextComponentType) =>
  Component.displayName || Component.name || 'Component';

function redirectTo(route: string, ctx: DocumentContext): void {
  switch (whereAreWe(ctx)) {
    case 'server': {
      if (ctx && ctx.res) {
        ctx.res.writeHead(302, { Location: route });
        ctx.res.end();
      }
    }

    case 'client': {
      Router.push(route);
    }
  }
}

function withAuth(WrappedComponent: NextComponentType) {
  return class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx: DocumentContext) {
      const token = getToken(ctx);

      if (!token) {
        redirectTo('/login', ctx);
      } else {
        const decoded = jwt.decode(JSON.parse(token).access_token);
        // TODO:
        // decode with yup
        if (decoded && (decoded as any).active) {
          console.log('everything is right');
        } else {
          redirectTo('/activate', ctx);
        }
      }

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, token };
      // TODO:
      // user is not active yet
    }

    componentDidMount() {
      window.addEventListener('storage', this.syncLogout);
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.syncLogout);
      // TODO: add local storage checks
      window.localStorage.removeItem('logout');
    }

    syncLogout = (event: StorageEvent) => {
      if (event.key === 'logout') {
        Router.push('/admin/login');
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

function whereAreWe(ctx: DocumentContext): 'server' | 'client' {
  if (ctx.req && ctx.res) {
    return 'server';
  }
  return 'client';
}

function getToken(ctx: DocumentContext): string | undefined {
  const { token } = nextCookie(ctx);

  return token;
}

export default withAuth;
