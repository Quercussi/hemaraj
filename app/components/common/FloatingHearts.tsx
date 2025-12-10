'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { RandomGen } from '../../utils/RandomGen';

const SEED = Date.now();

export default function FloatingHearts() {
  const floatingElements = useMemo(() => {
    let gen = new RandomGen(SEED);

    return [...Array(50)].map(() => {
      const [randoms, newGen] = RandomGen.generateMany(gen, 5);
      gen = newGen;

      return {
        isSpecialImage: randoms[0] < 0.05, // 5% chance for special images
        startX: randoms[1],
        endX: randoms[2],
        duration: randoms[3] * 20 + 15, // 15-35 seconds
        delay: randoms[4] * 10,
      };
    });
  }, []);

  const startY = typeof window !== 'undefined' ? window.innerHeight + 100 : 1100;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {floatingElements.map((element, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: element.isSpecialImage ? '40px' : 'auto',
            height: element.isSpecialImage ? '40px' : 'auto',
          }}
          initial={{
            left: `${element.startX * 100}vw`,
            y: startY,
          }}
          animate={{
            y: -100,
            left: `${element.endX * 100}vw`,
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: 'linear',
          }}
        >
          {element.isSpecialImage ? (
            <Image
              src="/images/YahaUsagi.png"
              alt="Special"
              width={40}
              height={40}
              className="opacity-30"
            />
          ) : (
            <span className="text-rose-200/20 text-3xl">❤️</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
