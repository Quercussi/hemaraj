'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import RotatingMessages from '../rotatingMessages/RotatingMessages';
import { useRelationship } from '../../contexts/RelationshipContext';

export default function Section1() {
  const { relationshipStart } = useRelationship();
  const [duration, setDuration] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateDuration = () => {
      const start = new Date(relationshipStart);
      const now = new Date();
      const diff = now.getTime() - start.getTime();

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const years = Math.floor(days / 365);
      const months = Math.floor((days % 365) / 30);

      setDuration({
        years,
        months: months,
        days: days % 30,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
      });
    };

    calculateDuration();
    const interval = setInterval(calculateDuration, 1000);

    return () => clearInterval(interval);
  }, [relationshipStart]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center max-w-4xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          className="text-8xl mb-8"
        >
          💕
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-8"
        >
          Our Love Story
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xl text-gray-600 mb-12"
        >
          We&#39;ve been together for
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-xl max-w-7xl mx-auto"
        >
          <div className="flex items-center justify-around divide-x divide-gray-200">
            {[
              { value: duration.years, label: 'Years' },
              { value: duration.months, label: 'Months' },
              { value: duration.days, label: 'Days' },
              { value: duration.hours, label: 'Hours' },
              { value: duration.minutes, label: 'Minutes' },
              { value: duration.seconds, label: 'Seconds' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex-1 text-center px-6"
              >
                <motion.div
                  key={item.value}
                  initial={{ scale: 1.2, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent mb-2"
                >
                  {item.value}
                </motion.div>
                <div className="text-gray-600 text-xs md:text-sm font-medium uppercase tracking-wide">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <RotatingMessages />
      </motion.div>
    </div>
  );
}
