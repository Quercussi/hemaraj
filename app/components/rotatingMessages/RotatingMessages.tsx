'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { shuffleArray } from '@/app/utils/arrayUtils';

const MESSAGES = [
  'Every moment with you is a treasure.',
  'You make my heart smile every single day.',
  'Together is my favorite place to be.',
  "You're my today and all of my tomorrows.",
  "In your arms, I've found my home",
  'Every love story is beautiful, but ours is my favorite.',
  "You're the reason I believe in forever.",
  'Life with you is a beautiful adventure.',
  "You're my sunshine on the cloudiest days.",
  'With you, every moment is magic.',
];

const shuffleArrayAvoidingFirst = <T,>(array: T[], avoidFirst?: T): T[] => {
  const shuffled = shuffleArray(array);

  if (avoidFirst !== undefined && shuffled[0] === avoidFirst && shuffled.length > 1) {
    [shuffled[0], shuffled[shuffled.length - 1]] = [shuffled[shuffled.length - 1], shuffled[0]];
  }

  return shuffled;
};

export default function RotatingMessages() {
  const [shuffledMessages, setShuffledMessages] = useState<string[]>(() => shuffleArray(MESSAGES));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;

        if (nextIndex >= shuffledMessages.length) {
          const lastMessage = shuffledMessages[shuffledMessages.length - 1];
          setShuffledMessages(shuffleArrayAvoidingFirst(MESSAGES, lastMessage));
          return 0;
        }

        return nextIndex;
      });
    }, 10000); // 10 seconds

    return () => clearInterval(messageInterval);
  }, [shuffledMessages]);

  return (
    <div className="relative h-8">
      <AnimatePresence mode="wait">
        <motion.p
          key={`${currentIndex}-${shuffledMessages[currentIndex]}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-lg text-gray-500 italic absolute inset-0 mt-6"
        >
          &#34;{shuffledMessages[currentIndex]}&#34;
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
