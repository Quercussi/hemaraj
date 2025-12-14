import { motion } from 'framer-motion';
import type { WeekStatus } from '@/app/components/mainContent/section2/lifeWeeksSteps/enums/WeekStatus';
import type { LifeWeeksGridVariant } from '@/app/components/mainContent/section2/lifeWeeksSteps/enums/LifeWeeksGridVariant';
import {
  createOpacityResolver,
  getWeekColor,
} from '@/app/components/mainContent/section2/lifeWeeksSteps/lifeWeeksUtils';

interface LifeWeeksGridProps {
  weeksArray: { index: number; status: WeekStatus }[];
  variant: LifeWeeksGridVariant;
}

export const LifeWeeksGrid = ({ weeksArray, variant }: LifeWeeksGridProps) => {
  const getOpacity = createOpacityResolver(variant);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="flex flex-wrap gap-px max-w-4xl"
    >
      {weeksArray.map((week) => (
        <div
          key={week.index}
          className={`${getWeekColor(week.status)} rounded-full w-[6px] h-[6px] ${getOpacity(
            week.status
          )}`}
          title={`Week ${week.index}`}
        />
      ))}
    </motion.div>
  );
};
