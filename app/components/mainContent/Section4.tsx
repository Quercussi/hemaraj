'use client';

import { motion } from 'framer-motion';
import { useRelationship } from '../../contexts/RelationshipContext';

export default function Section4() {
  const { relationshipStart } = useRelationship();
  const getYearsToMilestone = (milestone: number) => {
    const start = new Date(relationshipStart);
    const now = new Date();
    const currentYears = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);
    const yearsLeft = Math.max(0, milestone - currentYears);
    return yearsLeft.toFixed(1);
  };

  const milestones = [
    {
      year: 1,
      emoji: '🎂',
      title: 'First Anniversary',
      description: 'Our first year together - full of firsts and unforgettable memories',
      color: 'from-rose-400 to-pink-400',
    },
    {
      year: 2,
      emoji: '🌹',
      title: 'Two Years Strong',
      description: 'Deeper love, stronger bond, countless adventures',
      color: 'from-pink-400 to-purple-400',
    },
    {
      year: 5,
      emoji: '💎',
      title: 'Half a Decade',
      description: 'Five years of building our life together, creating our own world',
      color: 'from-purple-400 to-indigo-400',
    },
    {
      year: 10,
      emoji: '🏆',
      title: 'A Decade Together',
      description: 'Ten years of partnership, growth, and endless love',
      color: 'from-indigo-400 to-blue-400',
    },
    {
      year: 25,
      emoji: '👑',
      title: 'Silver Anniversary',
      description: 'A quarter century of sharing our lives, dreams, and hearts',
      color: 'from-blue-400 to-cyan-400',
    },
    {
      year: 50,
      emoji: '🎖️',
      title: 'Golden Anniversary',
      description: 'Half a century of unconditional love and unwavering commitment',
      color: 'from-amber-400 to-yellow-400',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-6xl w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          className="text-center mb-16"
        >
          <div className="text-8xl mb-8">🗓️</div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Our Journey Together
          </h1>
          <p className="text-xl text-gray-600">
            Every year with you is a milestone worth celebrating
          </p>
        </motion.div>

        <div className="space-y-8">
          {milestones.map((milestone, index) => {
            const yearsLeft = parseFloat(getYearsToMilestone(milestone.year));
            const isPassed = yearsLeft === 0;
            const isCurrent = yearsLeft > 0 && yearsLeft < 1;

            return (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border-2 ${
                    isCurrent
                      ? 'border-purple-400 shadow-purple-200/50'
                      : isPassed
                        ? 'border-green-300'
                        : 'border-gray-200'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <motion.div
                      animate={
                        isCurrent
                          ? {
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, -10, 0],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: isCurrent ? Infinity : 0,
                      }}
                      className="text-7xl"
                    >
                      {milestone.emoji}
                    </motion.div>

                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                        <h3
                          className={`text-3xl font-bold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}
                        >
                          {milestone.title}
                        </h3>
                        {isPassed && <span className="text-2xl">✅</span>}
                        {isCurrent && (
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-2xl"
                          >
                            ⭐
                          </motion.span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{milestone.description}</p>
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        {isPassed ? (
                          <span className="text-sm font-semibold text-green-600 bg-green-100 px-4 py-2 rounded-full">
                            🎉 Completed!
                          </span>
                        ) : isCurrent ? (
                          <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-4 py-2 rounded-full">
                            🌟 Coming up in {yearsLeft} years!
                          </span>
                        ) : (
                          <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                            📅 In {yearsLeft} years
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-center">
                      <div
                        className={`text-5xl font-bold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}
                      >
                        {milestone.year}
                      </div>
                      <div className="text-gray-500 text-sm">Years</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 text-center bg-gradient-to-r from-rose-400/20 to-purple-400/20 backdrop-blur-xl rounded-3xl p-12 border border-white/40"
        >
          <div className="text-6xl mb-4">💫</div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">To Infinity and Beyond</h3>
          <p className="text-xl text-gray-600 italic">
            "No matter how many years pass, my love for you only grows stronger"
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
