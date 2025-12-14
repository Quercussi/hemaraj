'use client';

import { motion } from 'framer-motion';
import { FRIENDS_WEEKS, DATING_WEEKS, TOTAL_RELATIONSHIP_WEEKS } from '../section2Data';

interface RelationshipWeekStripProps {
  maxWeeksToShow?: number;
  className?: string;
  animate?: boolean;
}

export const RelationshipWeekStrip = ({
  maxWeeksToShow = 60,
  className = '',
  animate = true,
}: RelationshipWeekStripProps) => {
  // Determine how many weeks we can reasonably show
  const weeksToShow = Math.min(TOTAL_RELATIONSHIP_WEEKS, maxWeeksToShow);
  const friendsRatio = FRIENDS_WEEKS / TOTAL_RELATIONSHIP_WEEKS;
  const datingRatio = DATING_WEEKS / TOTAL_RELATIONSHIP_WEEKS;

  // Calculate visible weeks for each phase
  const visibleFriendsWeeks = Math.round(friendsRatio * weeksToShow);
  const visibleDatingWeeks = Math.round(datingRatio * weeksToShow);

  // Create week boxes
  const weeks = [];

  // Friends weeks (yellow)
  for (let i = 0; i < visibleFriendsWeeks; i++) {
    weeks.push({
      key: `friend-${i}`,
      color: 'bg-yellow-400',
      index: i,
    });
  }

  // Dating weeks (rose)
  for (let i = 0; i < visibleDatingWeeks; i++) {
    weeks.push({
      key: `dating-${i}`,
      color: 'bg-rose-500',
      index: visibleFriendsWeeks + i,
    });
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="flex flex-row gap-[2px] md:gap-1">
        {weeks.map((week, idx) => (
          <motion.div
            key={week.key}
            className={`w-2 h-4 md:w-3 md:h-5 rounded-[2px] ${week.color}`}
            initial={animate ? { scale: 0, opacity: 0 } : undefined}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: idx * 0.02,
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Also export a version that shows actual week counts
export const RelationshipWeekStripWithCounts = ({
  className = '',
  animate = true,
}: Omit<RelationshipWeekStripProps, 'maxWeeksToShow'>) => {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <RelationshipWeekStrip animate={animate} />
      <motion.div
        className="flex gap-8 text-sm"
        initial={animate ? { opacity: 0, y: 10 } : undefined}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-yellow-400" />
          <span className="text-gray-600">{FRIENDS_WEEKS} weeks as friends</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-rose-500" />
          <span className="text-gray-600">{DATING_WEEKS} weeks dating</span>
        </div>
      </motion.div>
    </div>
  );
};
