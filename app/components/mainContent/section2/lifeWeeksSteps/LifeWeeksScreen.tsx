import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { LifeWeeksProvider } from '@/app/components/mainContent/section2/lifeWeeksSteps/LifeWeeksContext';
import {
  HER_WEEKS,
  MY_WEEKS,
} from '@/app/components/mainContent/section2/lifeWeeksSteps/lifeWeeksUtils';
import { LifeWeeksColumn } from '@/app/components/mainContent/section2/lifeWeeksSteps/LifeWeeksColumn';
import { Legend } from '@/app/components/mainContent/section2/lifeWeeksSteps/Legend';
import { LifeWeeksGridVariant } from '@/app/components/mainContent/section2/lifeWeeksSteps/enums/LifeWeeksGridVariant';
import { PersonKey } from '@/app/components/mainContent/section2/lifeWeeksSteps/enums/PersonKey';

interface LifeWeeksScreenProps {
  narrativeKey: string;
  narrative: ReactNode;
  gridVariant?: LifeWeeksGridVariant;
}

export const LifeWeeksScreen = ({
  narrativeKey,
  narrative,
  gridVariant = LifeWeeksGridVariant.Normal,
}: LifeWeeksScreenProps) => {
  return (
    <LifeWeeksProvider herWeeks={HER_WEEKS} myWeeks={MY_WEEKS} variant={gridVariant}>
      <div className="w-full h-full flex items-center justify-center">
        <motion.div layout className="space-y-8 max-w-6xl w-full -mt-10">
          <motion.h3
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-semibold text-gray-800 text-center mb-2"
          >
            Your life and my life, side by side
          </motion.h3>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <LifeWeeksColumn person={PersonKey.Her} label="Your life" />
            <LifeWeeksColumn person={PersonKey.Mine} label="My life" />
          </motion.div>

          <Legend />

          {/* Narrative subtitle */}
          <motion.div
            key={narrativeKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-center space-y-1"
          >
            {narrative}
          </motion.div>
        </motion.div>
      </div>
    </LifeWeeksProvider>
  );
};
