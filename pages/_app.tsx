import type { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';
import type { ComponentType, ReactNode } from 'react';
import { Fragment } from 'react';

import type { GlobalExploreMapState } from '../components/explore/global-state';
import { useGlobalExploreMap } from '../components/explore/global-state';
import { AppBar } from '../components/navigation/AppBar';

import '../styles/tailwind.css';
import '../styles/global.css';

type AppState = GlobalExploreMapState;

type LayoutProps = AppState;

interface AppProps extends NextAppProps {
  Component: NextAppProps['Component'] & {
    Layout: ComponentType<LayoutProps>; 
  };
}

export default function App({ Component, pageProps }: AppProps) {
  const globalExploreMapState = useGlobalExploreMap();

  // Persistent layout between groups of pages
  // (but not *all* pages)
  // https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
  const Layout = Component.Layout || NoLayout;

  return (
    <Fragment>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
          rel="stylesheet"
        /> 
      </Head>
      <AppBar />
      <main className="w-full h-full relative">
        <Layout {...globalExploreMapState}>
          <Component {...globalExploreMapState} {...pageProps} />
        </Layout>
      </main>
    </Fragment>
  );
}

function NoLayout(props: { children: ReactNode }) {
  return <Fragment>{props.children}</Fragment>;
}
