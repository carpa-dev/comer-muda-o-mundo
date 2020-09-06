import type { AppProps as NextAppProps } from 'next/app';
import type { ComponentType, ReactNode } from 'react';
import Link from 'next/link';
import { Fragment, useCallback, useState } from 'react';

import '../styles/tailwind.css';
import '../styles/global.css';

interface AppState {
  center: google.maps.LatLngLiteral;
  zoom: number;
}

// TODO: save last map state
const appInitialState: AppState = {
  center: { lat: -28.024, lng: 140.887 },
  zoom: 3,
};

type LayoutProps = AppState & {
  onMapInit(map: any): void;
};

interface AppProps extends NextAppProps {
  Component: NextAppProps['Component'] & {
    Layout: ComponentType<LayoutProps>; 
  };
}

export default function App({ Component, pageProps }: AppProps) {
  const [map, setMap] = useState<any>(undefined);
  const onMapInit = useCallback((map: any) => {
    setMap(map);
  }, [setMap]);
  console.log(map)

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
      </header>
      <main className="w-full h-full relative">
        <Layout {...appInitialState} onMapInit={onMapInit}>
          <Component {...pageProps} />
        </Layout>
      </main>
    </Fragment>
  );
}

function NoLayout(props: { children: ReactNode }) {
  console.log('no layout');
  return <Fragment>{props.children}</Fragment>;
}
