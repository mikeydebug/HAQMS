'use client';

import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  enter: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.3, ease: 'easeIn' } },
};

export default function PageTransition({ children, transitionKey }) {
  return (
    <motion.div
      key={transitionKey}
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
