import { motion, LayoutGroup } from 'framer-motion';
import type { StepConfig } from './section2Types';
import {
  TRIP_COUNT,
  TOTAL_DAYS_TOGETHER,
  TOTAL_DAYS_SINCE_FIRST_MET,
  FRIENDS_WEEKS,
  DATING_WEEKS,
} from './section2Data';
import { RelationshipWeekStrip, RelationshipProgressBar } from './timelineComponents';

// ============================================================================
// TIMELINE STEPS - Continuation from Life Weeks
// Flow: Week Strip → Progress Bar → Meeting Count → Segmented with Gaps
// ============================================================================

export const TIMELINE_STEPS: StepConfig[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // Step Group A: "This is our life" - Week Strip Introduction
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'timeline-strip-intro',
    component: (
      <LayoutGroup id="our-story-group">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center space-y-12 max-w-4xl px-4">
            <motion.h2
              layoutId="our-story-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-rose-500 bg-clip-text text-transparent"
            >
              This is our story
            </motion.h2>

            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <RelationshipWeekStrip animate={true} />
            </motion.div>

            <motion.p
              key="intro-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-lg md:text-2xl text-gray-600"
            >
              Every week we&apos;ve known each other, in a single line.
            </motion.p>
          </div>
        </div>
      </LayoutGroup>
    ),
  },

  {
    id: 'timeline-strip-with-legend',
    component: (
      <LayoutGroup id="our-story-group">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center space-y-12 max-w-4xl px-4">
            <motion.h2
              layoutId="our-story-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-rose-500 bg-clip-text text-transparent"
            >
              This is our story
            </motion.h2>

            {/* Inlined from RelationshipWeekStripWithCounts - same structure as intro step */}
            <motion.div layout>
              <RelationshipWeekStrip animate={false} />
            </motion.div>

            {/* Legend appears separately with its own animation */}
            <motion.div
              key="legend"
              className="flex gap-8 text-sm justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
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

            <motion.p
              key="legend-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-lg md:text-2xl text-gray-600"
            >
              From friends... to something more.
            </motion.p>
          </div>
        </div>
      </LayoutGroup>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Step Group B: Transition to Progress Bar
  // Uses layoutId for smooth transitions between these two steps
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'timeline-progress-bar-intro',
    component: (
      <LayoutGroup id="journey-progress-group">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center space-y-12 max-w-3xl px-4">
            <motion.h2
              layoutId="journey-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-rose-500 bg-clip-text text-transparent"
            >
              Our journey so far
            </motion.h2>

            <motion.div
              layoutId="journey-progress-bar"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full"
            >
              <RelationshipProgressBar mode="bar" animate={true} />
            </motion.div>

            <motion.p
              key="journey-intro-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="text-lg md:text-2xl text-gray-600 leading-relaxed"
            >
              Yellow fading into rose... friends becoming something more. The gradient shows where
              one chapter ended and another began.
            </motion.p>
          </div>
        </div>
      </LayoutGroup>
    ),
  },

  {
    id: 'timeline-progress-bar-narrative',
    component: (
      <LayoutGroup id="journey-progress-group">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center space-y-12 max-w-3xl px-4">
            <motion.h2
              layoutId="journey-title"
              className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-rose-500 bg-clip-text text-transparent"
            >
              Our journey so far
            </motion.h2>

            <motion.div layoutId="journey-progress-bar" className="w-full">
              <RelationshipProgressBar mode="bar" animate={false} />
            </motion.div>

            <motion.div
              key="journey-speech-bubble"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white border-4 border-gray-800 rounded-lg p-6 shadow-xl relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-gray-800" />
              <div className="absolute -top-[9px] left-1/2 -translate-x-[10px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white" />

              <p className="font-handwriting text-xl md:text-2xl text-gray-800 leading-relaxed">
                But wait... this bar doesn&apos;t tell the whole story. We&apos;re long distance,
                remember?
              </p>
            </motion.div>
          </div>
        </div>
      </LayoutGroup>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Step Group C: Meeting Count + Shadowed Gaps
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'timeline-meeting-count',
    component: (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center space-y-12 max-w-3xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold font-handwriting text-gray-800"
          >
            We&apos;ve met{' '}
            <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
              {TRIP_COUNT} times
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-600"
          >
            {TOTAL_DAYS_TOGETHER} days together out of {TOTAL_DAYS_SINCE_FIRST_MET} days since we
            first met.
          </motion.p>
        </div>
      </div>
    ),
  },

  {
    id: 'timeline-segmented-intro',
    component: (
      <LayoutGroup id="segmented-progress-group">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center space-y-12 max-w-3xl px-4">
            <motion.h2
              layoutId="segmented-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-500 to-rose-500 bg-clip-text text-transparent"
            >
              The times we were together
            </motion.h2>

            <motion.div
              layoutId="segmented-progress-bar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full"
            >
              <RelationshipProgressBar mode="segmented" showTripMarkers={true} animate={true} />
            </motion.div>

            <motion.p
              key="segmented-intro-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed"
            >
              The bright parts? Those are when we were together. The shadowed parts... that&apos;s
              the distance between us.
            </motion.p>
          </div>
        </div>
      </LayoutGroup>
    ),
  },
  {
    id: 'timeline-segmented-narrative',
    component: (
      <LayoutGroup id="segmented-progress-group">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center space-y-12 max-w-3xl px-4">
            <motion.h2
              layoutId="segmented-title"
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-500 to-rose-500 bg-clip-text text-transparent"
            >
              The times we were together
            </motion.h2>

            <motion.div layoutId="segmented-progress-bar" className="w-full">
              <RelationshipProgressBar mode="segmented" showTripMarkers={true} animate={false} />
            </motion.div>

            <motion.div
              key="segmented-speech-bubble"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white border-4 border-gray-800 rounded-lg p-6 shadow-xl relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-gray-800" />
              <div className="absolute -top-[9px] left-1/2 -translate-x-[10px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white" />

              <p className="font-handwriting text-xl md:text-2xl text-gray-800 leading-relaxed">
                Each trip is a little window of togetherness in our long-distance story. Let&apos;s
                look at what we did in each of them...
              </p>
            </motion.div>
          </div>
        </div>
      </LayoutGroup>
    ),
  },
];
