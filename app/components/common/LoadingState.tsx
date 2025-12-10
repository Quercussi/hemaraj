import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface LoadingStateProps {
  children?: ReactNode;
}

export function LoadingState({ children = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center">
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-rose-400 text-xl"
      >
        {children}
      </motion.div>
    </div>
  );
}
