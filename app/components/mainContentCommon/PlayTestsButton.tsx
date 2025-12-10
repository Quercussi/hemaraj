'use client';

import { motion } from 'framer-motion';

interface PlayTestsButtonProps {
  onClick: () => void;
}

export default function PlayTestsButton({ onClick }: PlayTestsButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2 }}
      onClick={onClick}
      className="fixed left-8 bottom-8 z-50 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="bg-gradient-to-r from-rose-500 to-purple-500 p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>
      <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-medium text-gray-700 shadow-lg">
        Play Tests Again 🎮
      </span>
    </motion.button>
  );
}
