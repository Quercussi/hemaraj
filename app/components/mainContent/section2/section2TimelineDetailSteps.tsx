import { motion } from 'framer-motion';
import type { StepConfig } from './section2Types';
import { TRIPS, TRIP_COUNT, type Trip } from './section2Data';
import { PolaroidBackground, PolaroidBackgroundProgressive } from './timelineComponents';

// ============================================================================
// TIMELINE DETAIL STEPS - Trip-by-trip storytelling
// Each trip has: intro slide, then narrative slides with polaroid backgrounds
// ============================================================================

// Helper component for trip layout (progress bar is now persistent in Section2)
interface TripLayoutProps {
  tripId: number;
  children: React.ReactNode;
  showPolaroids?: boolean;
  polaroidSeed?: number;
}

const TripLayout = ({
  tripId,
  children,
  showPolaroids = false,
  polaroidSeed = 42,
}: TripLayoutProps) => {
  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="w-full pt-8 md:pt-10 pb-8 md:pb-12 flex-1 relative">
        {showPolaroids && (
          <PolaroidBackground tripId={tripId} seed={polaroidSeed} className="z-0" />
        )}
      </div>
      <div className="w-full pb-8 md:pb-12 relative z-10">{children}</div>
    </div>
  );
};

// Helper component for comic-style speech bubble narration with CSS typewriter effect
interface ComicNarrationProps {
  text: string;
  textKey: string; // Unique key to force text remount and restart animation
  delay?: number;
  duration?: number; // Total typing duration in seconds
}

const ComicNarration = ({ text, textKey, delay = 0, duration = 1 }: ComicNarrationProps) => {
  const charCount = text.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white border-4 border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl relative w-3/4 mx-4"
    >
      <p
        key={textKey}
        className="font-handwriting text-xl md:text-2xl text-gray-800 leading-relaxed text-center overflow-hidden whitespace-nowrap mx-auto"
        style={{
          width: 0,
          animation: `typing ${duration}s steps(${charCount}, end) ${delay}s forwards`,
        }}
      >
        {text}
      </p>
      <style jsx>{`
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </motion.div>
  );
};

// Generate steps for each trip
const generateTripSteps = (trip: Trip, tripIndex: number): StepConfig[] => {
  const duration = Math.ceil((trip.end.getTime() - trip.start.getTime()) / (1000 * 60 * 60 * 24));

  const dateRange = `${trip.start.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })} - ${trip.end.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`;

  const steps: StepConfig[] = [];

  // Step 1: Trip intro (location + dates, no polaroids yet)
  steps.push({
    id: `trip-${trip.id}-intro`,
    component: (
      <TripLayout tripId={trip.id} showPolaroids={false}>
        <div className="text-center space-y-6 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="text-6xl md:text-7xl"
          >
            📍
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-rose-100 text-rose-600 rounded-full text-sm md:text-base font-medium mb-4">
              {trip.label}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
              {trip.location}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-500"
          >
            {dateRange} • {duration} {duration === 1 ? 'day' : 'days'}
          </motion.p>
        </div>
      </TripLayout>
    ),
  });

  // Steps 2+: Narrative slides with polaroids
  trip.narratives.forEach((narrative, narrativeIndex) => {
    steps.push({
      id: `trip-${trip.id}-narrative-${narrativeIndex}`,
      component: (
        <TripLayout tripId={trip.id} showPolaroids={true} polaroidSeed={trip.id * 100}>
          <div className="flex flex-col items-center space-y-4 px-4">
            {/* Trip label badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <span className="text-4xl">📍</span>
              <span className="text-xl md:text-2xl font-bold text-gray-700">{trip.location}</span>
            </motion.div>

            {/* Comic narration */}
            <ComicNarration
              text={narrative}
              textKey={`trip-${trip.id}-narrative-${narrativeIndex}`}
              delay={0.3}
            />
          </div>
        </TripLayout>
      ),
    });
  });

  return steps;
};

// ============================================================================
// ENDING SLIDES - Final collage and soft closing
// ============================================================================

const ENDING_STEPS: StepConfig[] = [
  // Final collage with all polaroids (progress bar is persistent in Section2)
  {
    id: 'timeline-final-collage',
    component: (
      <div className="w-full h-full flex flex-col relative overflow-hidden">
        {/* Space for persistent progress bar */}
        <div className="w-full pt-24 md:pt-28" />

        {/* All polaroids in background - uses all images from context */}
        {/*<PolaroidBackground seed={9999} className="z-0" />*/}

        {/* Central content */}
        <div className="flex-1 flex items-center justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            className="bg-white/95 backdrop-blur-xl border-4 border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl max-w-lg mx-4 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="text-6xl md:text-7xl mb-6"
            >
              💕
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl md:text-3xl font-handwriting text-gray-800 leading-relaxed"
            >
              {TRIP_COUNT} trips. Countless memories. And this is just the beginning...
            </motion.h2>
          </motion.div>
        </div>
      </div>
    ),
  },

  // Soft closing - looking forward (progress bar is persistent in Section2)
  {
    id: 'timeline-future-trips',
    component: (
      <div className="w-full h-full flex flex-col relative overflow-hidden">
        {/* Space for persistent progress bar */}
        <div className="w-full pt-24 md:pt-28" />

        {/* Scattered polaroids, more faded - uses first 6 images from context */}
        <div className="absolute inset-0 opacity-30">
          <PolaroidBackgroundProgressive visibleCount={6} seed={7777} />
        </div>

        {/* Central content */}
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="text-center space-y-8 px-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl md:text-7xl"
            >
              ✈️
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl md:text-4xl font-handwriting bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent"
            >
              The best trips are the ones we haven&apos;t taken yet
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed"
            >
              Every gap in that timeline is just time waiting for our next adventure. And we have so
              many more ahead of us.
            </motion.p>
          </div>
        </div>
      </div>
    ),
  },

  // Quiet emotional beat to close
  {
    id: 'timeline-soft-close',
    component: (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-yellow-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center px-4"
        >
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-handwriting bg-gradient-to-r from-yellow-500 via-rose-500 to-purple-500 bg-clip-text text-transparent leading-relaxed"
          >
            Distance means nothing
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-4xl md:text-6xl font-handwriting bg-gradient-to-r from-purple-500 via-rose-500 to-yellow-500 bg-clip-text text-transparent leading-relaxed mt-4"
          >
            when someone means everything
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12 text-5xl"
          >
            💕
          </motion.div>
        </motion.div>
      </div>
    ),
  },
];

// Generate all trip detail steps
export const TIMELINE_DETAIL_STEPS: StepConfig[] = [
  ...TRIPS.flatMap((trip, index) => generateTripSteps(trip, index)),
  ...ENDING_STEPS,
];
