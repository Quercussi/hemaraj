import { motion } from 'framer-motion';
import { useLifeWeeksContext } from '@/app/components/mainContent/section2/lifeWeeksSteps/LifeWeeksContext';
import { createOpacityResolver } from '@/app/components/mainContent/section2/lifeWeeksSteps/lifeWeeksUtils';
import { WeekStatus } from '@/app/components/mainContent/section2/lifeWeeksSteps/enums/WeekStatus';

export const Legend = () => {
  const { variant } = useLifeWeeksContext();
  const getOpacity = createOpacityResolver(variant);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex gap-6 text-sm text-gray-600 mt-4 justify-center flex-wrap"
    >
      <div className="flex items-center gap-2">
        <div
          className={`w-4 h-4 bg-gray-900 rounded-sm transition-opacity duration-500 ${getOpacity(
            WeekStatus.BeforeMet
          )}`}
        />
        <span>Before we met</span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`w-4 h-4 bg-yellow-400 rounded-sm transition-opacity duration-500 ${getOpacity(
            WeekStatus.MetNotDating
          )}`}
        />
        <span>Friends</span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`w-4 h-4 bg-rose-500 rounded-sm transition-opacity duration-500 ${getOpacity(
            WeekStatus.Dating
          )}`}
        />
        <span>Together</span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`w-4 h-4 bg-rose-300 rounded-sm transition-opacity duration-500 ${getOpacity(
            WeekStatus.Future
          )}`}
        />
        <span>Future</span>
      </div>
    </motion.div>
  );
};
