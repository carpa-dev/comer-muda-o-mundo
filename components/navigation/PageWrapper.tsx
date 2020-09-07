import { m as motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { memo } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}

export const PageWrapper = memo(function PageWrapper({
  children,
}: PageWrapperProps) {
  // Set transition to 0 to make route change faster
  return (
    <motion.div
      className="w-full h-full p-2 py-20 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0 }}
    >
      {children}
    </motion.div>
  );
});
