import type { AppProps } from 'next/app';
import { Fragment } from 'react';

import '../styles/tailwind.css';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <header className="w-full h-12 bg-yellow-400 shadow">
        cmom
      </header>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
