import { motion, AnimatePresence } from 'framer-motion';

interface ChoiceItemProps {
  choice: string;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

export function ChoiceItem({ choice, index, isSelected, onSelect }: ChoiceItemProps) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.01, x: 3 }}
      whileTap={{ scale: 0.99 }}
      className="w-full text-left p-1 transition-all duration-150 bg-transparent hover:bg-gray-50"
      style={{ borderRadius: '2px' }}
    >
      <div className="flex items-center gap-5">
        <motion.div
          className={`w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 ${
            isSelected ? 'border-gray-700 bg-white' : 'border-gray-400 bg-white'
          }`}
          style={{ borderRadius: '2px' }}
        >
          <AnimatePresence>
            {isSelected && (
              <motion.svg
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                className="w-4 h-4 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.div>
        <span className="text-gray-800 font-normal text-base leading-relaxed">{choice}</span>
      </div>
    </motion.button>
  );
}

