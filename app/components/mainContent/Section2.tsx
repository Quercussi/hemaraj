'use client';

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { STEPS } from '@/app/components/mainContent/section2/section2Steps';
import { useRelationship } from '@/app/contexts/RelationshipContext';
import NavigationButton from '@/app/components/mainContent/section2/NavigationButton';
import { StepSlider } from '@/app/components/mainContent/section2/StepSlider';
import { RelationshipProgressBar } from '@/app/components/mainContent/section2/timelineComponents';

// Helper to extract trip ID from step ID (e.g., "trip-3-intro" -> 3)
const getTripIdFromStepId = (stepId: string): number | null => {
  const match = stepId.match(/^trip-(\d+)/);
  return match ? parseInt(match[1], 10) : null;
};

// Helper to determine progress bar mode from step ID
const getProgressBarMode = (stepId: string): 'withTrips' | 'segmented' | 'bar' | null => {
  if (stepId.startsWith('trip-')) return 'withTrips';
  if (stepId === 'timeline-final-collage') return 'segmented';
  if (stepId === 'timeline-future-trips') return 'bar';
  return null;
};

export default function Section2() {
  // Ensure this section is used within RelationshipProvider (even if we don't use the value yet)
  useRelationship();

  const [isInView, setIsInView] = useState(false);
  const [canExitUp] = useState(true);
  const [canExitDown] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasScrolledPast = useRef(false);

  const currentStep = STEPS[currentStepIndex];
  const stepKey = currentStep.id.startsWith('life-weeks-')
    ? 'life-weeks'
    : currentStep.id.startsWith('timeline-strip-')
      ? 'timeline-strip'
      : (currentStep.id.match(/^trip-\d+/)?.[0] ?? currentStep.id);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  // Determine if we should show the persistent progress bar and which trip is active
  const progressBarConfig = useMemo(() => {
    const mode = getProgressBarMode(currentStep.id);
    const tripId = getTripIdFromStepId(currentStep.id);
    return { mode, tripId, show: mode !== null };
  }, [currentStep.id]);

  const nextStep = () => {
    if (!isLastStep) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  // Handler for slider step changes
  const handleStepChange = useCallback((step: number) => {
    setCurrentStepIndex(step);
  }, []);

  // Detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.8) {
          setIsInView(true);
          hasScrolledPast.current = false;
        } else if (!entry.isIntersecting && hasScrolledPast.current) {
          setIsInView(false);
        }
      },
      { threshold: [0, 0.1, 0.5, 0.8, 0.9, 1] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen flex items-center justify-center p-8 relative">
      {/* Step slider at top */}
      <StepSlider
        currentStep={currentStepIndex}
        totalSteps={STEPS.length}
        onStepChange={handleStepChange}
        isVisible={isInView}
      />

      {/* Persistent progress bar - stays outside AnimatePresence so it doesn't remount */}
      <motion.div
        className="fixed top-28 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 md:px-8 z-40"
        initial={false}
        animate={{
          opacity: progressBarConfig.show ? 1 : 0,
          y: progressBarConfig.show ? 0 : -20,
          pointerEvents: progressBarConfig.show ? 'auto' : 'none',
        }}
        transition={{ duration: 0.3 }}
      >
        <RelationshipProgressBar
          mode={progressBarConfig.mode || 'withTrips'}
          showTripMarkers={true}
          activeTripId={progressBarConfig.tripId ?? undefined}
          animate={false}
        />
      </motion.div>

      <div className="w-full flex items-center justify-center gap-3 sm:gap-16 relative">
        {/* Previous button */}
        <NavigationButton
          direction="previous"
          onClick={prevStep}
          disabled={isFirstStep}
          isVisible={isInView}
        />

        {/* STEP TRANSITIONS - content in the middle */}
        <div className="relative w-full max-w-6xl min-h-[420px]">
          <LayoutGroup>
            <AnimatePresence>
              <motion.div
                key={stepKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 z-10 flex items-center justify-center"
              >
                {currentStep.component}
              </motion.div>
            </AnimatePresence>
          </LayoutGroup>
        </div>

        {/* Next button */}
        <NavigationButton
          direction="next"
          onClick={nextStep}
          disabled={isLastStep}
          isVisible={isInView}
        />
      </div>

      {/* Exit hint at bottom boundary */}
      <AnimatePresence>
        {isLastStep && canExitDown && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-40 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-rose-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-xl">
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-center"
              >
                <p className="text-sm mb-1">Scroll again to continue</p>
                <div className="text-xl">↓</div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
