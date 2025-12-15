'use client';

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { STEPS } from '@/app/components/mainContent/section2/section2Steps';
import { useRelationship } from '@/app/contexts/RelationshipContext';
import NavigationButton from '@/app/components/mainContent/section2/NavigationButton';
import { StepSlider } from '@/app/components/mainContent/section2/StepSlider';
import { RelationshipProgressBar } from '@/app/components/mainContent/section2/timelineComponents';

// Helper to extract trip ID from step ID
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
  useRelationship();

  const [isInView, setIsInView] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const canScrollRef = useRef(true);

  const currentStep = STEPS[currentStepIndex];
  const stepKey = currentStep.id.startsWith('life-weeks-')
    ? 'life-weeks'
    : currentStep.id.startsWith('timeline-strip-')
      ? 'timeline-strip'
      : (currentStep.id.match(/^trip-\d+/)?.[0] ?? currentStep.id);

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  // Determine progress bar configuration
  const progressBarConfig = useMemo(() => {
    const mode = getProgressBarMode(currentStep.id);
    const tripId = getTripIdFromStepId(currentStep.id);
    return { mode, tripId, show: mode !== null };
  }, [currentStep.id]);

  // Simple step navigation (no animation blocking)
  const nextStep = useCallback(() => {
    if (!isLastStep) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  }, [isLastStep]);

  const prevStep = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }, [isFirstStep]);

  // Handler for slider step changes
  const handleStepChange = useCallback((step: number) => {
    setCurrentStepIndex(step);
  }, []);

  // Detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.8);
      },
      { threshold: [0, 0.1, 0.5, 0.8, 0.9, 1] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle wheel scroll within Section 2
  useEffect(() => {
    if (!sectionRef.current) return;

    const handleWheel = (e: WheelEvent) => {
      // Only handle if we're in Section 2
      if (!isInView) return;

      // Check if we can scroll
      if (!canScrollRef.current) return;

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // At first step scrolling up OR at last step scrolling down -> allow section navigation
      if ((isFirstStep && scrollingUp) || (isLastStep && scrollingDown)) {
        return; // Let browser handle section snap
      }

      // Otherwise, navigate steps
      e.preventDefault();

      canScrollRef.current = false;

      if (scrollingDown && !isLastStep) {
        nextStep();
      } else if (scrollingUp && !isFirstStep) {
        prevStep();
      }

      // Re-enable scrolling after delay
      setTimeout(() => {
        canScrollRef.current = true;
      }, 500);
    };

    const section = sectionRef.current;
    section.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      section.removeEventListener('wheel', handleWheel);
    };
  }, [isInView, isFirstStep, isLastStep, nextStep, prevStep]);

  return (
    <div ref={sectionRef} className="min-h-screen flex items-center justify-center p-8 relative">
      {/* Step slider at top */}
      <StepSlider
        currentStep={currentStepIndex}
        totalSteps={STEPS.length}
        onStepChange={handleStepChange}
        isVisible={isInView}
      />

      {/* Persistent progress bar */}
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

        {/* Step content */}
        <div className="relative w-full max-w-6xl min-h-[700px]">
          <LayoutGroup>
            <AnimatePresence mode="wait">
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
    </div>
  );
}
