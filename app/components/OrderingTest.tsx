'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../utils/soundManager';
import { PolaroidImage } from '@/app/components/orderingTest/PolaroidImage';
import { ErrorMessage } from '@/app/components/common/ErrorMessage';
import { SubmitButton } from '@/app/components/common/SubmitButton';

interface ImageData {
  id: number;
  url: string;
  caption: string;
}

interface OrderingTestProps {
  images: ImageData[];
  onComplete: () => void;
}

export default function OrderingTest({ images, onComplete }: OrderingTestProps) {
  const [placements, setPlacements] = useState<(number | null)[]>([null, null, null, null, null]);
  const [draggedImage, setDraggedImage] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDragStart = (imageId: number) => {
    setDraggedImage(imageId);
    playSound('pick-up', 0.4);
  };

  const handleDragEnd = () => {
    setDraggedImage(null);
  };

  const handleDrop = (position: number) => {
    if (draggedImage === null) return;

    playSound('place-down', 0.4);

    const newPlacements = placements.map((p) => (p === draggedImage ? null : p));
    newPlacements[position] = draggedImage;

    setPlacements(newPlacements);
    setDraggedImage(null);
  };

  const handleRemoveFromSlot = (position: number) => {
    const newPlacements = [...placements];
    newPlacements[position] = null;
    setPlacements(newPlacements);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/orderingTest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: placements }),
      });

      const data = await response.json();

      if (data.success && data.data.correct) {
        playSound('success', 0.6);
        onComplete();
      } else {
        playSound('error', 0.5);
        setError(data.message);
        setPlacements([null, null, null, null, null]);
        setTimeout(() => setError(''), 3000);
      }
    } catch (err) {
      playSound('error', 0.5);
      setError('Something went wrong. Please try again.');
      setPlacements([null, null, null, null, null]);
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const allPlaced = placements.every((p) => p !== null);
  const availableImages = images.filter((img) => !placements.includes(img.id));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center p-8 overflow-y-auto"
    >
      {/* Title */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent mb-2">
          Arrange Our Story
        </h1>
        <p className="text-gray-600">Put these memories in the correct chronological order 📸</p>
      </motion.div>

      {/* Paper Board Container */}
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl p-8 border-4 border-rose-100">
        {/* Target Slots */}
        <div className="flex gap-4 mb-8 justify-center px-4 py-4">
          {placements.map((placedImageId, position) => {
            const image = images.find((img) => img.id === placedImageId);

            return (
              <motion.div
                key={position}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(position)}
                className={`relative w-40 aspect-[7/10] rounded-xl border-4 border-dashed transition-all ${
                  placedImageId !== null
                    ? 'border-purple-400 bg-purple-50'
                    : 'border-gray-300 bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-3">
                  {placedImageId === null ? (
                    <span className="text-gray-400 text-lg font-semibold">{position + 1}</span>
                  ) : image ? (
                    <PolaroidImage
                      image={image}
                      onRemove={() => handleRemoveFromSlot(position)}
                      isPlaced
                    />
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Available Images Tray */}
        <div className="min-h-[280px] border-4 border-dashed border-purple-300 rounded-2xl bg-purple-50/50 p-4 pt-1 mx-4 mt-6">
          <p className="text-center text-gray-600 mb-4 font-semibold text-base">
            Drag photos to timeline above
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            {availableImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                draggable
                onDragStart={() => handleDragStart(image.id)}
                onDragEnd={handleDragEnd}
                className="cursor-grab active:cursor-grabbing"
              >
                <PolaroidImage image={image} isDragging={draggedImage === image.id} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>{error && <ErrorMessage>{error}</ErrorMessage>}</AnimatePresence>

      {/* Submit */}
      <AnimatePresence>
        {allPlaced && !error && (
          <SubmitButton isSubmitting={isSubmitting} onClick={handleSubmit}>
            Check Order ✨
          </SubmitButton>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
