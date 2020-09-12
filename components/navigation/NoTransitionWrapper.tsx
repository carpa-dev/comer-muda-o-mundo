import type { ReactNode } from 'react';
import { memo } from 'react';

import { motion } from '../animation/framer-motion';

interface NoTransitionWrapperProps {
  children: ReactNode;
}

export const NoTransitionWrapper = memo(function NoTransitionWrapper({
  children,
}: NoTransitionWrapperProps) {
  return <motion.div>{children}</motion.div>;
});
