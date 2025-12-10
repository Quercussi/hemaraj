import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ErrorMessageProps {
  children: ReactNode;
}

export function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-6 bg-rose-100 border border-rose-300 text-rose-700 px-6 py-3 rounded-xl text-center max-w-md"
    >
      {children}
    </motion.div>
  );
}

