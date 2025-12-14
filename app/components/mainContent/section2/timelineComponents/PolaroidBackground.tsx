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
  seed = 89,
}: PolaroidBackgroundProps) => {
  const { getAllImages, getImagesByTripId } = useTripImages();

  const stableKey = `polaroid-${tripId}-${seed}`;

  // Determine which images to use:
  // 1. If images prop provided, use those
  // 2. If tripId provided, get images for that trip
  // 3. Otherwise, use all images
  const images = imagesProp ?? (tripId ? getImagesByTripId(tripId) : getAllImages());

  // Elliptical distribution configuration
  const minRadius = 0.6; // Minimum distance from center (0-1, where 1 = edge of ellipse)
  const maxRadius = 0.95; // Maximum distance from center (0-1)
  const angleJitter = 30; // Random variation added to angle (±degrees)
  const centerX = 0.5; // Horizontal center position (0-1)
  const centerY = 0.4; // Vertical center position (0-1)
  const radiusX = 0.45; // Horizontal semi-axis of ellipse (controls width)
  const radiusY = 0.35; // Vertical semi-axis of ellipse (controls height)
  const maxRotation = 30; // Maximum polaroid rotation (±degrees)
  const delayStep = 0.1; // Animation delay between each polaroid (seconds)

  // Helper: Approximate arc length from angle 0 to theta on ellipse with semi-axes (a, b)
  // Uses numerical integration (Simpson's rule)
  const ellipseArcLength = (a: number, b: number, theta: number, steps = 100): number => {
    let sum = 0;
    const dt = theta / steps;

    for (let i = 0; i <= steps; i++) {
      const t = i * dt;
      const dx = -a * Math.sin(t);
      const dy = b * Math.cos(t);
      const weight = i === 0 || i === steps ? 1 : i % 2 === 0 ? 2 : 4;
      sum += weight * Math.sqrt(dx * dx + dy * dy);
    }

    return (sum * dt) / 3;
  };

  const findAngleForArcLength = (a: number, b: number, targetLength: number): number => {
    let low = 0;
    let high = 2 * Math.PI;
    const tolerance = 0.001;

    for (let i = 0; i < 50; i++) {
      const mid = (low + high) / 2;
      const length = ellipseArcLength(a, b, mid);

      if (Math.abs(length - targetLength) < tolerance) {
        return mid;
      }

      if (length < targetLength) {
        low = mid;
      } else {
        high = mid;
      }
    }

    return (low + high) / 2;
  };

  // Generate elliptical scattered positions with equal arc length spacing
  const positions = images.map((img, idx) => {
    const gen = new RandomGen(seed + img.id * 777 + idx);
    const [r1, r2, r3] = Array.from({ length: 3 }, () => {
      const [val] = gen.next();
      return val;
    });

    // Choose radius for this polaroid
    const radius = minRadius + r2 * (maxRadius - minRadius);

    // Scale ellipse semi-axes by radius
    const a = radiusX * radius;
    const b = radiusY * radius;

    // Calculate total perimeter of this ellipse (Ramanujan's approximation)
    const h = Math.pow((a - b) / (a + b), 2);
    const perimeter = Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));

    // Target arc length for equal spacing
    const targetArcLength = (idx / images.length) * perimeter;

    // Find angle that corresponds to this arc length
    let angle = findAngleForArcLength(a, b, targetArcLength);

    // Add jitter
    const angleJitterRad = angleJitter * (Math.PI / 180);
    angle += r1 * angleJitterRad;

    // Generate points on the ellipse
    const ellipseX = Math.cos(angle) * radius;
    const ellipseY = Math.sin(angle) * radius;

    // Transform to container space
    const x = centerX + ellipseX * radiusX;
    const y = centerY + ellipseY * radiusY;

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
