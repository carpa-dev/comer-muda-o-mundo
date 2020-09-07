import type { ReactNode } from 'react';
import { memo } from 'react';

import { motion } from '../animation/framer-motion';

interface PageOverlayWrapperProps {
  children: ReactNode;
}

export const PageOverlayWrapper = memo(function PageOverlayWrapper({
  children,
}: PageOverlayWrapperProps) {
  return (
    <motion.div
      className="w-full h-full absolute top-0 right-0 p-2 py-20 bg-white"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
});
