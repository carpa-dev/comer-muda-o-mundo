import type { ReactNode } from 'react';
import { memo } from 'react';

import { motion } from '../animation/framer-motion';

interface PageWrapperProps {
  children: ReactNode;
}

export const PageWrapper = memo(function PageWrapper({
  children,
}: PageWrapperProps) {
  // Set transition to 0 to make route change faster
  return (
    <motion.div
      className="w-full h-full px-4 py-20 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0 }}
    >
      {children}
    </motion.div>
  );
});
