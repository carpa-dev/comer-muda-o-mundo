import { MotionConfig, AnimationFeature, ExitFeature, m } from 'framer-motion';

// Wrapper for framer-motion

export { AnimatePresence } from 'framer-motion';

// https://www.framer.com/api/motion/guide-reduce-bundle-size/#how-to-reduce-bundle-size
const MOTION_FEATURES = [AnimationFeature, ExitFeature];

export function MotionProvider(props: Parameters<typeof MotionConfig>[0]) {
  return <MotionConfig features={MOTION_FEATURES} {...props} />;
}

export const motion = m;
