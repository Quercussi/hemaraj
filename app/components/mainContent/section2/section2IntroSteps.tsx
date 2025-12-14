import { motion } from 'framer-motion';
import type { StepConfig } from './section2Types';

export const INTRO_STEPS: StepConfig[] = [
  // {
  //   id: 'intro-icon',
  //   component: (
  //     <div className="w-full h-full flex items-center justify-center">
  //       <div className="text-center space-y-8 max-w-4xl">
  //         <motion.div
  //           key="icon"
  //           initial={{ scale: 0, rotate: -180 }}
  //           animate={{ scale: 1, rotate: 0 }}
  //           transition={{ type: 'spring', stiffness: 200, damping: 20 }}
  //           className="text-8xl mb-8"
  //         >
  //           📊
  //         </motion.div>
  //       </div>
  //     </div>
  //   ),
  // },
  // {
  //   id: 'intro-title',
  //   component: (
  //     <div className="w-full h-full flex items-center justify-center">
  //       <div className="text-center space-y-8 max-w-4xl">
  //         <motion.div
  //           initial={{ scale: 0, rotate: -180 }}
  //           animate={{ scale: 1, rotate: 0 }}
  //           transition={{ type: 'spring', stiffness: 200, damping: 20 }}
  //           className="text-8xl mb-8"
  //         >
  //           📊
  //         </motion.div>
  //
  //         <motion.h1
  //           initial={{ opacity: 0, y: 30 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.6 }}
  //           className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent mb-8"
  //         >
  //           A Week of Our Lives
  //         </motion.h1>
  //       </div>
  //     </div>
  //   ),
  // },
  {
    id: 'intro-description',
    component: (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center space-y-8 max-w-4xl">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="text-8xl mb-8"
          >
            📊
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent mb-8"
          >
            A Week of Our Lives
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-4">
              They say life is short. Let&apos;s visualize it together...
            </p>
            <p className="text-lg text-gray-500 italic">
              Scroll down or click the arrow to continue →
            </p>
          </motion.div>
        </div>
      </div>
    ),
  },
];
