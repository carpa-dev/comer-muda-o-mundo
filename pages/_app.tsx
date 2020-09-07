import type { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';
import { Fragment } from 'react';

import type { GlobalExploreMapState } from '../components/explore/global-state';
import { useGlobalExploreMap } from '../components/explore/global-state';
import { AppBar } from '../components/navigation/AppBar';

import '../styles/tailwind.css';
import '../styles/global.css';

type AppState = GlobalExploreMapState;

interface AppProps extends NextAppProps {
  Component: NextAppProps['Component'] & {
    getLayout(page: JSX.Element): JSX.Element;
  };
}

export default function App({ Component, pageProps }: AppProps) {
  const appState: AppState = useGlobalExploreMap();

  // Persistent layout between groups of pages
  // (but not *all* pages)
  // https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
  const getLayout = Component.getLayout || getNoLayout;

  return (
    <Fragment>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AppBar />
      <main className="w-full h-full relative overflow-hidden">
        {getLayout(<Component {...appState} {...pageProps} />)}
      </main>
    </Fragment>
  );
}

function getNoLayout(page: JSX.Element) {
  return page;
}
