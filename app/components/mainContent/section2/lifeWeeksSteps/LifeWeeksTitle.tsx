import { motion } from 'framer-motion';

interface LifeWeeksTitleProps {
  label: string;
}

export const LifeWeeksTitle = ({ label }: LifeWeeksTitleProps) => (
  <motion.h4
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-2xl font-semibold text-gray-800 mb-2 flex items-center gap-2"
  >
    <span>{label}</span>
  </motion.h4>
);
