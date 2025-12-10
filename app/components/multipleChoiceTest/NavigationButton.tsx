import { motion } from 'framer-motion';

interface NavigationButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
}

export function NavigationButton({ direction, onClick }: NavigationButtonProps) {
  const isNext = direction === 'next';

  return (
    <motion.button
      initial={{ opacity: 0, x: isNext ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isNext ? 20 : -20 }}
      onClick={onClick}
      className={`fixed ${isNext ? 'right-8' : 'left-8'} top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center hover:bg-rose-50 transition-colors text-2xl`}
    >
      {isNext ? '→' : '←'}
    </motion.button>
  );
}
