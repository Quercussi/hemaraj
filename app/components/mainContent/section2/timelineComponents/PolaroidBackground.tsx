'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { RandomGen } from '@/app/utils/RandomGen';
import type { TripImage } from '../section2Data';
import { useTripImages } from '@/app/contexts/TripImagesContext';
import React from 'react';

interface PolaroidBackgroundProps {
  images?: TripImage[]; // Optional - falls back to all images from context
  tripId?: number; // Optional - get images for specific trip
  className?: string;
  seed?: number;
}

interface PolaroidProps {
  image: TripImage;
  style: React.CSSProperties;
  rotation: number;
  delay: number;
}

const Polaroid = ({ image, style, rotation, delay }: PolaroidProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: rotation }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
        delay,
      }}
      className="absolute bg-white p-2 pb-8 shadow-xl rounded-sm cursor-pointer"
      style={style}
      whileHover={{
        scale: 1.15,
        rotate: 0,
        zIndex: 100,
        boxShadow: '0 25px 50px rgba(0,0,0,0.35)',
        transition: { type: 'spring', stiffness: 300 },
      }}
    >
      <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 relative overflow-hidden">
        {/* Images preloaded to Next.js Image Cache by TripImagesContext.
            sizes="128px" ensures <Image> requests w=256 (2x), matching preload. */}
        <Image src={image.url} alt={image.caption} fill className="object-cover" sizes="128px" />
      </div>
      <p className="text-center mt-2 text-[10px] md:text-xs font-handwriting text-gray-700 px-1 truncate">
        {image.caption}
      </p>
    </motion.div>
  );
};

export const PolaroidBackground = ({
  images: imagesProp,
  tripId,
  className = '',
  seed = 42,
}: PolaroidBackgroundProps) => {
  const { getAllImages, getImagesByTripId } = useTripImages();

  const stableKey = `polaroid-${tripId}-${seed}`;

  // Determine which images to use:
  // 1. If images prop provided, use those
  // 2. If tripId provided, get images for that trip
  // 3. Otherwise, use all images
  const images = imagesProp ?? (tripId ? getImagesByTripId(tripId) : getAllImages());

  // Generate scattered positions for images
  const positions = images.map((img, idx) => {
    const gen = new RandomGen(seed + img.id * 777 + idx);
    const [r1, r2, r3] = Array.from({ length: 3 }, () => {
      const [val] = gen.next();
      return val;
    });

    // Distribute images across the screen with some randomness
    // Avoid the center where content will be
    const angle = (idx / images.length) * Math.PI * 2 + r1 * 0.5;
    const radius = 25 + r2 * 20; // 25-45% from center

    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;

    // Keep within bounds
    const boundedX = Math.max(5, Math.min(85, x));
    const boundedY = Math.max(10, Math.min(80, y));

    return {
      image: img,
      left: `${boundedX}%`,
      top: `${boundedY}%`,
      rotation: (r3 - 0.5) * 30, // -15 to +15 degrees
      zIndex: idx + 1,
      delay: idx * 0.1,
    };
  });

  return (
    <div
      key={stableKey}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {positions.map((pos) => (
        <Polaroid
          key={pos.image.id}
          image={pos.image}
          style={{
            left: pos.left,
            top: pos.top,
            zIndex: pos.zIndex,
          }}
          rotation={pos.rotation}
          delay={pos.delay}
        />
      ))}
    </div>
  );
};

// A variant that progressively reveals polaroids
export const PolaroidBackgroundProgressive = ({
  images,
  tripId,
  visibleCount,
  className = '',
  seed = 42,
}: PolaroidBackgroundProps & { visibleCount: number }) => {
  const { getAllImages, getImagesByTripId } = useTripImages();

  // Determine source images
  const sourceImages = images ?? (tripId ? getImagesByTripId(tripId) : getAllImages());
  const visibleImages = sourceImages.slice(0, visibleCount);

  return <PolaroidBackground images={visibleImages} className={className} seed={seed} />;
};
