import type { ReactNode } from 'react';
import { memo } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}

export const PageWrapper = memo(
  function PageWrapper({ children }: PageWrapperProps) {
    return (
      <div className="w-full h-full p-2 py-20 bg-white">
        {children}
      </div>
    );
  }
);
