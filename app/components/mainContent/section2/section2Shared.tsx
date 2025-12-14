import { ReactElement } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { RandomGen } from '@/app/utils/RandomGen';

// Important dates
export const HER_BIRTHDATE = new Date('2002-12-19');
export const MY_BIRTHDATE = new Date('2003-01-29');
export const FIRST_MET = new Date('2024-11-08');
export const STARTED_DATING = new Date('2025-06-14');

// Meeting history - periods when we were together physically
export const MEETING_PERIODS = [
  {
    start: new Date('2024-11-08'),
    end: new Date('2024-11-15'),
    location: 'First Meeting',
    description: 'Where it all began ✨',
    images: [
      { id: 1, url: '/images/YahaUsagi.png', caption: 'First time together!' },
      { id: 2, url: '/images/YahaUsagi.png', caption: 'So nervous 💕' },
      { id: 3, url: '/images/YahaUsagi.png', caption: 'Best day ever' },
    ],
  },
  {
    start: new Date('2024-12-20'),
    end: new Date('2025-01-05'),
    location: 'Holiday Trip',
    description: 'Celebrating the holidays together 🎄',
    images: [
      { id: 4, url: '/images/YahaUsagi.png', caption: 'Christmas magic ✨' },
      { id: 5, url: '/images/YahaUsagi.png', caption: 'New Year together' },
      { id: 6, url: '/images/YahaUsagi.png', caption: 'Winter wonderland' },
      { id: 7, url: '/images/YahaUsagi.png', caption: 'Cozy moments' },
    ],
  },
  {
    start: new Date('2025-02-14'),
    end: new Date('2025-02-20'),
    location: "Valentine's Getaway",
    description: "Our first Valentine's Day together 💕",
    images: [
      { id: 8, url: '/images/YahaUsagi.png', caption: 'Love is in the air' },
      { id: 9, url: '/images/YahaUsagi.png', caption: 'Valentine dinner' },
      { id: 10, url: '/images/YahaUsagi.png', caption: 'Forever us 💕' },
    ],
  },
];

// Helper functions for life weeks calculations
export const getWeekOfLife = (birthDate: Date, targetDate: Date): number => {
  const diff = targetDate.getTime() - birthDate.getTime();
  const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  return weeks;
};

// Polaroid Image Component
interface PolaroidProps {
  image: { id: number; url: string; caption: string };
  style?: React.CSSProperties;
}

export const PolaroidImage = ({ image, style }: PolaroidProps) => {
  const gen = new RandomGen(image.id * 1000);
  const [randomValue] = gen.next();
  const rotation = randomValue * 20 - 10;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{ type: 'spring', stiffness: 200 }}
      className="absolute bg-white p-3 pb-7 shadow-xl rounded-lg"
      style={style}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        zIndex: 50,
        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
        transition: { type: 'spring', stiffness: 300 },
      }}
    >
      <div className="w-32 aspect-[5/6] bg-gray-200 relative overflow-hidden rounded">
        <Image src={image.url} alt={image.caption} fill className="object-cover" />
      </div>
      <p className="text-center mt-2 text-xs font-handwriting text-gray-700 px-1">
        {image.caption}
      </p>
    </motion.div>
  );
};

// Step configuration interface
export interface StepConfig {
  id: string;
  component: ReactElement;
}

// Calculate percentage data (used by multiple steps)
const now = new Date();
export const herLifeWeeks = getWeekOfLife(HER_BIRTHDATE, now);
export const myLifeWeeks = getWeekOfLife(MY_BIRTHDATE, now);
export const togetherWeeks = getWeekOfLife(FIRST_MET, now);
export const herPercentage = ((togetherWeeks / herLifeWeeks) * 100).toFixed(2);
export const myPercentage = ((togetherWeeks / myLifeWeeks) * 100).toFixed(2);

// Timeline overview calculations
export const startDate = FIRST_MET;
export const endDate = new Date();
export const totalDays = Math.floor(
  (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
);
export const totalTogetherDays = MEETING_PERIODS.reduce((acc, period) => {
  const days = Math.ceil((period.end.getTime() - period.start.getTime()) / (1000 * 60 * 60 * 24));
  return acc + days;
}, 0);
export const meetingCount = MEETING_PERIODS.length;

// Timeline detail calculations
export const daysSinceDating = Math.floor(
  (new Date().getTime() - STARTED_DATING.getTime()) / (1000 * 60 * 60 * 24)
);
export const togetherDaysSinceDating = MEETING_PERIODS.reduce((acc, period) => {
  const start = Math.max(period.start.getTime(), STARTED_DATING.getTime());
  const end = Math.min(period.end.getTime(), new Date().getTime());
  if (start < end) {
    acc += Math.floor((end - start) / (1000 * 60 * 60 * 24));
  }
  return acc;
}, 0);
