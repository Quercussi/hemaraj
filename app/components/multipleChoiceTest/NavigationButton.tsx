import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
}

export function NavigationButton({ direction, onClick }: NavigationButtonProps) {
  const isNext = direction === 'next';
  const Icon = isNext ? ChevronRight : ChevronLeft;

  return (
    <motion.button
      initial={{ opacity: 0, x: isNext ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isNext ? 20 : -20 }}
      onClick={onClick}
      className="flex-shrink-0 w-16 h-16 flex items-center justify-center hover:scale-110 transition-all duration-300 ease-out text-rose-400 hover:text-rose-600 drop-shadow-lg z-50"
    >
      <Icon size={48} strokeWidth={1.5} />
    </motion.button>
  );
}
