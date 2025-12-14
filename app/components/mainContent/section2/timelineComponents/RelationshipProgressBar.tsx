'use client';

import { motion } from 'framer-motion';
import {
  FRIENDS_WEEKS,
  DATING_WEEKS,
  TOTAL_RELATIONSHIP_WEEKS,
  TRIPS,
  FIRST_MET,
  Trip,
} from '../section2Data';

// Different display modes for the progress bar
export type ProgressBarMode = 'strip' | 'bar' | 'segmented' | 'withTrips';

interface RelationshipProgressBarProps {
  mode: ProgressBarMode;
  showTripMarkers?: boolean;
  activeTripId?: number;
  className?: string;
  animate?: boolean;
}

// Calculate trip positions on the timeline as percentages
const getTripPositions = () => {
  const totalMs = new Date().getTime() - FIRST_MET.getTime();
  return TRIPS.map((trip) => {
    const startOffset = trip.start.getTime() - FIRST_MET.getTime();
    const endOffset = trip.end.getTime() - FIRST_MET.getTime();
    const startPercent = (startOffset / totalMs) * 100;
    const endPercent = (endOffset / totalMs) * 100;
    return {
      trip,
      startPercent,
      endPercent,
      centerPercent: (startPercent + endPercent) / 2,
    };
  });
};

const tripPositions = getTripPositions();

// Friends portion percentage
const friendsPercent = (FRIENDS_WEEKS / TOTAL_RELATIONSHIP_WEEKS) * 100;
const datingPercent = (DATING_WEEKS / TOTAL_RELATIONSHIP_WEEKS) * 100;

export const RelationshipProgressBar = ({
  mode,
  showTripMarkers = false,
  activeTripId,
  className = '',
  animate = true,
}: RelationshipProgressBarProps) => {
  // Base bar styles based on mode
  const getBarHeight = () => {
    switch (mode) {
      case 'strip':
        return 'h-8 md:h-10';
      case 'bar':
        return 'h-4 md:h-6';
      case 'segmented':
      case 'withTrips':
        return 'h-6 md:h-8';
      default:
        return 'h-6';
    }
  };

  // Render shadow overlay for long-distance gaps (segmented and withTrips modes)
  const renderGapShadows = () => {
    if (mode !== 'segmented' && mode !== 'withTrips') return null;

    // Create shadow segments between trips
    const shadows: React.ReactNode[] = [];
    let lastEndPercent = 0;

    tripPositions.forEach((pos, i) => {
      if (pos.startPercent > lastEndPercent) {
        shadows.push(
          <motion.div
            key={`gap-${i}`}
            className="absolute top-0 bottom-0 bg-black/30"
            style={{
              left: `${lastEndPercent}%`,
              width: `${pos.startPercent - lastEndPercent}%`,
            }}
            initial={animate ? { opacity: 0 } : undefined}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          />
        );
      }
      lastEndPercent = pos.endPercent;
    });

    // Add shadow after last trip to current time
    if (lastEndPercent < 100) {
      shadows.push(
        <motion.div
          key="gap-final"
          className="absolute top-0 bottom-0 bg-black/30"
          style={{
            left: `${lastEndPercent}%`,
            width: `${100 - lastEndPercent}%`,
          }}
          initial={animate ? { opacity: 0 } : undefined}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + tripPositions.length * 0.1 }}
        />
      );
    }

    return shadows;
  };

  // Render trip markers - base markers at fixed positions
  const renderTripMarkers = () => {
    if (!showTripMarkers) return null;

    return (
      <>
        {/* Base markers (always visible, inactive style) */}
        {tripPositions.map((pos, i) => {
          const isActive = activeTripId === pos.trip.id;

          return (
            <motion.div
              key={`marker-${pos.trip.id}`}
              className="absolute -bottom-6 -translate-x-1/2"
              style={{ left: `${pos.centerPercent}%` }}
              initial={animate ? { opacity: 0, y: -10 } : undefined}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.15 }}
            >
              {/* Base circle - fades when active indicator is on top */}
              <motion.div
                className="w-3 h-3 rounded-full bg-white/70"
                initial={false}
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              {/* Label */}
              <motion.div
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap"
                initial={false}
                animate={{
                  color: isActive ? '#f43f5e' : '#6b7280',
                  fontWeight: isActive ? 700 : 400,
                }}
                transition={{ duration: 0.3 }}
              >
                {i + 1}
              </motion.div>
            </motion.div>
          );
        })}

        {/* Sliding active indicator - moves between markers */}
        {activeTripId && (
          <motion.div
            className="absolute -bottom-6 -translate-x-1/2 pointer-events-none"
            style={{ left: `${getActivePosition()}%` }}
            layout
            initial={false}
            transition={{
              layout: { type: 'spring', stiffness: 300, damping: 30 },
            }}
          >
            <motion.div
              className="w-3 h-3 rounded-full bg-white"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              style={{ boxShadow: '0 0 0 2px #f43f5e' }}
            />
          </motion.div>
        )}
      </>
    );
  };

  // Get active trip position for the sliding arrow
  const getActivePosition = () => {
    if (!activeTripId) return tripPositions[0]?.centerPercent ?? 0;
    const activePos = tripPositions.find((p) => p.trip.id === activeTripId);
    return activePos?.centerPercent ?? 0;
  };

  // Get active trip label
  const getActiveLabel = () => {
    if (!activeTripId) return '';
    const activePos = tripPositions.find((p) => p.trip.id === activeTripId);
    return activePos?.trip.label ?? '';
  };

  // Render sliding arrow indicator - always rendered, slides between positions using layout
  const renderSlidingArrow = () => {
    if (mode !== 'withTrips') return null;

    const position = getActivePosition();
    const isVisible = !!activeTripId;

    return (
      <motion.div
        className="absolute -top-8 -translate-x-1/2 pointer-events-none"
        style={{ left: `${position}%` }}
        layout
        initial={false}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{
          layout: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-rose-500">
            <path
              d="M12 4L12 20M12 20L6 14M12 20L18 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Sliding arrow indicator */}
      {renderSlidingArrow()}

      {/* Main bar container */}
      <div
        className={`relative ${getBarHeight()} rounded-full overflow-hidden bg-gray-200 shadow-inner`}
      >
        {/* Friends segment (yellow) */}
        <motion.div
          className="absolute top-0 bottom-0 left-0 bg-yellow-400"
          style={{ width: `${friendsPercent}%` }}
          initial={animate ? { width: 0 } : undefined}
          animate={{ width: `${friendsPercent}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {/* Dating segment (rose) with gradient transition */}
        <motion.div
          className="absolute top-0 bottom-0"
          style={{
            left: `${friendsPercent - 2}%`,
            width: `${datingPercent + 2}%`,
            background: `linear-gradient(to right, #facc15 0%, #f43f5e 8%, #f43f5e 100%)`,
          }}
          initial={animate ? { width: 0, opacity: 0 } : undefined}
          animate={{ width: `${datingPercent + 2}%`, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />

        {/* Gap shadows for long-distance periods */}
        {renderGapShadows()}
      </div>

      {/* Trip markers below the bar */}
      {renderTripMarkers()}
    </div>
  );
};

// Export trip positions for use in other components
export { tripPositions, getTripPositions };
export type { Trip };
