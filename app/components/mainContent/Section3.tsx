'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { useRelationship } from '../../contexts/RelationshipContext';

export default function Section3() {
  const { relationshipStart } = useRelationship();
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate next anniversary using useMemo instead of state
  const nextAnniversary = useMemo(() => {
    const start = new Date(relationshipStart);
    const now = new Date();

    // Calculate next anniversary
    let anniversary = new Date(
      now.getFullYear(),
      start.getMonth(),
      start.getDate(),
      start.getHours(),
      start.getMinutes(),
      start.getSeconds()
    );

    if (anniversary < now) {
      anniversary = new Date(
        now.getFullYear() + 1,
        start.getMonth(),
        start.getDate(),
        start.getHours(),
        start.getMinutes(),
        start.getSeconds()
      );
    }

    return anniversary;
  }, [relationshipStart]);

  useEffect(() => {
    const calculateCountdown = () => {
      const diff = nextAnniversary.getTime() - new Date().getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [nextAnniversary]);

  const getYearNumber = () => {
    const start = new Date(relationshipStart);
    const now = new Date();
    return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365)) + 1;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center max-w-4xl"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          className="text-8xl mb-8"
        >
          🎊
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent mb-8"
        >
          Next Milestone
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-2xl text-gray-600 mb-4"
        >
          Our {getYearNumber()} Year Anniversary
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-lg text-gray-500 mb-12"
        >
          {nextAnniversary.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { value: countdown.days, label: 'Days', emoji: '📆' },
            { value: countdown.hours, label: 'Hours', emoji: '⏰' },
            { value: countdown.minutes, label: 'Minutes', emoji: '⏱️' },
            { value: countdown.seconds, label: 'Seconds', emoji: '⚡' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl"
            >
              <div className="text-4xl mb-3">{item.emoji}</div>
              <motion.div
                key={item.value}
                initial={{ scale: 1.2, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-rose-500 bg-clip-text text-transparent"
              >
                {item.value}
              </motion.div>
              <div className="text-gray-600 text-sm mt-2">{item.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
          className="bg-gradient-to-r from-purple-400/20 to-rose-400/20 backdrop-blur-xl rounded-3xl p-8 border border-white/40"
        >
          <p className="text-2xl font-semibold text-gray-700 mb-3">
            Can&#39;t wait to celebrate! 🥂
          </p>
          <p className="text-gray-600 italic">
            &#34;Here&#39;s to many more years of love, laughter, and adventure together&#34;
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
