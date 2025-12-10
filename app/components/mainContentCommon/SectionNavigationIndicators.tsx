'use client';

import { motion } from 'framer-motion';
import { sections } from '../../data/sections';

interface SectionNavigationIndicatorsProps {
  activeSection: number;
  onSectionClick: (index: number) => void;
}

export default function SectionNavigationIndicators({
  activeSection,
  onSectionClick,
}: SectionNavigationIndicatorsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4"
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionClick(section.id)}
          className="group relative"
        >
          <motion.div
            animate={{
              scale: activeSection === section.id ? 1.5 : 1,
              opacity: activeSection === section.id ? 1 : 0.4,
            }}
            whileHover={{ scale: 1.3, opacity: 1 }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-gradient-to-r from-rose-500 to-purple-500 shadow-lg'
                : 'bg-gray-400'
            }`}
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-medium text-gray-700 shadow-lg">
            {section.label}
          </span>
        </button>
      ))}
    </motion.div>
  );
}
