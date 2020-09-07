import type { ReactNode } from 'react';
import { memo, useCallback, useEffect, useState } from 'react';

interface PageOverlayWrapperProps {
  children: ReactNode;
  show: boolean;
}

export const PageOverlayWrapper = memo(
  function PageOverlayWrapper({ children, show }: PageOverlayWrapperProps) {
    // https://czaplinski.io/blog/super-easy-animation-with-react-hooks/
    // https://reactjs.org/docs/events.html#transition-events

    const [render, setRender] = useState(show);

    useEffect(() => {
      if (show) {
        setRender(true);
      }
    }, [show]);
  
    const onTransitionEnd = useCallback((e) => {
      if (!show) {
        setRender(false);
      }
    }, [setRender]);
  
    const containerClassName = show
      ? 'w-full h-full absolute top-0 right-0 p-2 py-20 bg-white transition-transform duration-1000 delay-75 ease-in-out transform translate-y-0'
      : 'w-full h-full absolute top-0 right-0 p-2 py-20 bg-white transition-transform duration-1000 delay-75 ease-in-out transform translate-y-full';

    const contentClassName = show
      ? 'w-full h-full transition duration-1000 delay-150 ease-in-out opacity-100 transform translate-y-0'
      : 'w-full h-full transition duration-1000 delay-150 ease-in-out opacity-0 transform translate-y-1/2';

    return (
      <div className={containerClassName}>
        {render ? <div className={contentClassName} onTransitionEnd={onTransitionEnd}>{children}</div> : null}
      </div>
    );
  }
);
