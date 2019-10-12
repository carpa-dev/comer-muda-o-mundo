import { NextComponentType } from 'next';
import { DocumentContext } from 'next/document';
import Router from 'next/router';
import cookies from 'next-cookies';
import { Component } from 'react';

function auth(ctx: DocumentContext) {
  const { token } = cookies(ctx);

  /**
   * If `ctx.req` is available it means we are on the server
   * Additionally if there's no token it means the user is not logged in
   */
  if (ctx.req && ctx.res && !token) {
    ctx.res.writeHead(302, { Location: '/admin/login' });
    ctx.res.end();
  }

  /**
   * We are on the client
   */
  if (!token) {
    Router.push('/admin/login');
  }

  // TODO:
  // check it has not expired

  return token;
}

const getDisplayName = (Component: NextComponentType) =>
  Component.displayName || Component.name || 'Component';

function withAuth(WrappedComponent: NextComponentType) {
  return class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx: DocumentContext) {
      const token = auth(ctx);

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, token };
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

export default withAuth;
