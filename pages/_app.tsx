import type { AppProps as NextAppProps } from 'next/app';
import type { ComponentType, ReactNode } from 'react';
import Link from 'next/link';
import { Fragment } from 'react';

import type { GlobalExploreMapState } from '../components/explore/global-state';
import { useGlobalExploreMap } from '../components/explore/global-state';

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
      <header className="w-full h-12 bg-yellow-400 shadow">
        <Link href="/">
          <a>cmom</a>
        </Link>
        <Link href="/sobre">
          <a>sobre</a>
        </Link>
      </header>
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
