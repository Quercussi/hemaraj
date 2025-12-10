import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SubmitButtonProps {
  isSubmitting: boolean;
  onClick: () => void;
  children?: ReactNode;
  submittingText?: ReactNode;
}

export function SubmitButton({ 
  isSubmitting, 
  onClick, 
  children = 'Submit ✨',
  submittingText = 'Checking...'
}: SubmitButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={isSubmitting}
      className="mt-8 px-12 py-4 bg-gradient-to-r from-rose-500 to-purple-500 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
    >
      {isSubmitting ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {submittingText}
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}

