'use client';

import { motion, AnimatePresence } from 'framer-motion';

export type NavigationDirection = 'previous' | 'next';

interface NavigationButtonProps {
  direction: NavigationDirection;
  onClick: () => void;
  disabled: boolean;
  isVisible: boolean;
}

export default function NavigationButton({
  direction,
  onClick,
  disabled,
  isVisible,
}: NavigationButtonProps) {
  const isPrevious = direction === 'previous';
  const animationX = isPrevious ? -10 : 10;
  const iconRotation = isPrevious ? 'rotate-90' : '-rotate-90';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, x: animationX }}
          animate={{ opacity: disabled ? 0.3 : 1, x: 0 }}
          exit={{ opacity: 0, x: animationX }}
          onClick={onClick}
          disabled={disabled}
          className="p-2 text-gray-500 hover:text-gray-900 disabled:text-gray-300 transition-colors disabled:cursor-not-allowed"
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.97 }}
        >
          <svg
            className={`w-5 h-5 text-gray-700 ${iconRotation}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
