'use client';

import { motion } from 'framer-motion';
import { useRef, useCallback, useState } from 'react';

interface StepSliderProps {
  currentStep: number;
  totalSteps: number;
  onStepChange: (step: number) => void;
  isVisible: boolean;
}

export const StepSlider = ({
  currentStep,
  totalSteps,
  onStepChange,
  isVisible,
}: StepSliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate thumb position as percentage (quantized to steps)
  const thumbPosition = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  // Calculate step from mouse/touch position
  const getStepFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return currentStep;

      const rect = trackRef.current.getBoundingClientRect();
      const posX = clientX - rect.left;
      const percentage = posX / rect.width;
      const newStep = Math.round(percentage * (totalSteps - 1));
      return Math.max(0, Math.min(totalSteps - 1, newStep));
    },
    [totalSteps, currentStep]
  );

  // Handle click on track to jump to step
  const handleTrackClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const newStep = getStepFromPosition(e.clientX);
      onStepChange(newStep);
    },
    [getStepFromPosition, onStepChange]
  );

  // Handle mouse/touch drag
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);

      const handlePointerMove = (moveEvent: PointerEvent) => {
        const newStep = getStepFromPosition(moveEvent.clientX);
        onStepChange(newStep);
      };

      const handlePointerUp = () => {
        setIsDragging(false);
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    },
    [getStepFromPosition, onStepChange]
  );

  return (
    <motion.div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -20,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Step counter */}
      <motion.div
        className="text-xs text-gray-500 font-medium bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm"
        layout
      >
        {currentStep + 1} / {totalSteps}
      </motion.div>

      {/* Slider track */}
      <div
        ref={trackRef}
        className="relative w-96 md:w-[32rem] h-2 bg-gray-200/80 backdrop-blur-sm rounded-full cursor-pointer shadow-inner"
        onClick={handleTrackClick}
      >
        {/* Step tick marks */}
        {Array.from({ length: totalSteps }, (_, i) => {
          const tickPosition = totalSteps > 1 ? (i / (totalSteps - 1)) * 100 : 0;
          return (
            <div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-gray-400/50"
              style={{ left: `${tickPosition}%`, transform: 'translate(-50%, -50%)' }}
            />
          );
        })}

        {/* Progress fill - quantized, with smooth animation */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-rose-500 rounded-full"
          initial={false}
          animate={{ width: `${thumbPosition}%` }}
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />

        {/* Thumb - quantized position with smooth animation */}
        <motion.div
          className={`absolute top-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-rose-500 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          initial={false}
          animate={{ left: `${thumbPosition}%` }}
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          style={{ y: '-50%', x: '-50%' }}
          onPointerDown={handlePointerDown}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>
    </motion.div>
  );
};

export default StepSlider;
