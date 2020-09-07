import type { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';

import {
  AnimatePresence,
  MotionProvider,
} from '../components/animation/framer-motion';
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

export default function App({ Component, pageProps, router }: AppProps) {
  const appState: AppState = useGlobalExploreMap();

  // Persistent layout between groups of pages
  // (but not *all* pages)
  // https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
  const getLayout = Component.getLayout || getNoLayout;

  // With page transition animations
  // Use router.route as unique key for page transition animations
  // https://reacttricks.com/animating-next-page-transitions-with-framer-motion/
  // https://www.framer.com/api/motion/animate-presence/
  return (
    <MotionProvider>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AppBar />
      <main className="w-full h-full relative overflow-hidden">
        {getLayout(
          <AnimatePresence initial={false} exitBeforeEnter>
            <Component key={router.route} {...appState} {...pageProps} />
          </AnimatePresence>
        )}
      </main>
    </MotionProvider>
  );
}

function getNoLayout(page: JSX.Element) {
  return page;
}
