import { NextComponentType } from 'next';
import { DocumentContext } from 'next/document';
import Router from 'next/router';
import { Component } from 'react';
import cookies from 'next-cookies';

function auth(ctx: DocumentContext) {
  const { token } = cookies(ctx);

  // redirect to /admin if user is logged in (server side)
  if (ctx.req && ctx.res && token) {
    ctx.res.writeHead(302, { Location: '/admin' });
    ctx.res.end();
  }

  if (token) {
    Router.push('/admin');
  }

  return token;
}

const getDisplayName = (Component: NextComponentType) =>
  Component.displayName || Component.name || 'Component';

function withGuest(WrappedComponent: NextComponentType) {
  return class extends Component {
    static displayName = `withGuestSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx: DocumentContext) {
      auth(ctx);

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withGuest;
