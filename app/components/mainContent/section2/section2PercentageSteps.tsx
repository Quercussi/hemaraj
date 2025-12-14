import { motion } from 'framer-motion';
import type { StepConfig } from './section2Shared';
import { herPercentage, myPercentage } from './section2Shared';

export const PERCENTAGE_STEPS: StepConfig[] = [
  {
    id: 'percentage-intro',
    component: (
      <div className="w-full h-full flex items-center justify-center">
        <div className="space-y-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-3xl text-gray-700 mb-8">
              Looking at the boxes above, we&apos;ve filled quite a bit together... 💕
            </p>
          </motion.div>
        </div>
      </div>
    ),
  },
  {
    id: 'percentage-container',
    component: (
      <div className="w-full h-full flex items-center justify-center">
        <div className="space-y-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-3xl text-gray-700 mb-8">
              Looking at the boxes above, we&apos;ve filled quite a bit together... 💕
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-xl"
          >
            <div className="space-y-8"></div>
          </motion.div>
        </div>
      </div>
    ),
  },
  {
    id: 'percentage-her',
    component: (
      <div className="w-full h-full flex items-center justify-center">
        <div className="space-y-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-3xl text-gray-700 mb-8">
              Looking at the boxes above, we&apos;ve filled quite a bit together... 💕
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-xl"
          >
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xl text-gray-600 mb-2">You have known me for</p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="text-6xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent"
                >
                  {herPercentage}%
                </motion.p>
                <p className="text-xl text-gray-600 mt-2">of your life</p>
              </motion.div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent origin-center"
              />
            </div>
          </motion.div>
        </div>
      </div>
    ),
  },
  {
    id: 'percentage-mine',
    component: (
      <div className="w-full h-full flex items-center justify-center">
        <div className="space-y-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-3xl text-gray-700 mb-8">
              Looking at the boxes above, we&apos;ve filled quite a bit together... 💕
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-xl"
          >
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xl text-gray-600 mb-2">You have known me for</p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="text-6xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent"
                >
                  {herPercentage}%
                </motion.p>
                <p className="text-xl text-gray-600 mt-2">of your life</p>
              </motion.div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent origin-center"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xl text-gray-600 mb-2">I have known you for</p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="text-6xl font-bold bg-gradient-to-r from-purple-500 to-rose-500 bg-clip-text text-transparent"
                >
                  {myPercentage}%
                </motion.p>
                <p className="text-xl text-gray-600 mt-2">of my life</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-2xl text-gray-600 text-center italic"
          >
            And this is just the beginning... 🌟
          </motion.p>
        </div>
      </div>
    ),
  },
];
