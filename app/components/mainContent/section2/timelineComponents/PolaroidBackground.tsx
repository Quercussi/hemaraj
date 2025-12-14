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
      className="absolute bg-white p-2 pb-8 shadow-xl rounded-sm cursor-pointer -translate-x-1/2 -translate-y-1/2"
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

  // Distribution and transform configuration (all values normalized 0-1)
  const minRadius = 0.6; // Minimum distance from center (0-1, where 1 = edge of unit circle)
  const maxRadius = 0.95; // Maximum distance from center (0-1)
  const angleJitter = 30; // Random variation added to angle (±degrees)
  const centerX = 0.5; // Horizontal center position (0-1)
  const centerY = 0.4; // Vertical center position (0-1)
  const spreadX = 0.5; // Horizontal spread from center (0.4 = ±40%, giving range 10-90%)
  const spreadY = 0.4; // Vertical spread from center (0.25 = ±25%, giving range 5-55%)
  const maxRotation = 30; // Maximum polaroid rotation (±degrees)
  const delayStep = 0.1; // Animation delay between each polaroid (seconds)

  // Generate scattered positions for images
  const positions = images.map((img, idx) => {
    const gen = new RandomGen(seed + img.id * 777 + idx);
    const [r1, r2, r3] = Array.from({ length: 3 }, () => {
      const [val] = gen.next();
      return val;
    });

    // Circular distribution (normalized -1 to 1)
    const angleJitterRad = angleJitter * (Math.PI / 180); // Convert degrees to radians
    const angle = (idx / images.length) * Math.PI * 2 + r1 * angleJitterRad;
    const radius = minRadius + r2 * (maxRadius - minRadius);

    const rawX = Math.cos(angle) * radius; // -1 to 1
    const rawY = Math.sin(angle) * radius; // -1 to 1

    // Linear transform to container bounds (normalized 0-1)
    const x = centerX + rawX * spreadX;
    const y = centerY + rawY * spreadY;

    return {
      image: img,
      left: `${x * 100}%`,
      top: `${y * 100}%`,
      rotation: (r3 - 0.5) * maxRotation,
      zIndex: idx + 1,
      delay: idx * delayStep,
    };
  });

  return (
    <div key={stableKey} className={`absolute inset-0 pointer-events-none z-0 ${className}`}>
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
