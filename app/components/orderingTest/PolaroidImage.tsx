import { motion } from 'framer-motion';
import Image from 'next/image';
import { RandomGen } from '@/app/utils/RandomGen';

interface ImageData {
  id: number;
  url: string;
  caption: string;
}

interface PolaroidImageProps {
  image: ImageData;
  isDragging?: boolean;
  isPlaced?: boolean;
  onRemove?: () => void;
}

export function PolaroidImage({
  image,
  isDragging = false,
  isPlaced = false,
  onRemove,
}: PolaroidImageProps) {
  const gen = new RandomGen(image.id * 1000);
  const [randomValue] = gen.next();
  const rotation = randomValue * 10 - 5;

  return (
    <motion.div
      className={`relative bg-white p-3 pb-7 shadow-xl rounded-lg ${
        isDragging ? 'opacity-50 rotate-6' : ''
      }`}
      animate={{
        rotate: isPlaced ? 0 : rotation,
        scale: isDragging ? 1.1 : 1,
      }}
      whileHover={
        !isPlaced ? { scale: 1.05, rotate: 0, y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' } : {}
      }
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="w-32 aspect-[5/6] bg-gray-200 relative overflow-hidden rounded">
        <Image src={image.url} alt={image.caption} fill className="object-cover" />
      </div>
      <p className="text-center mt-2 text-xs font-handwriting text-gray-700 px-1">
        {image.caption}
      </p>

      {isPlaced && onRemove && (
        <button
          onClick={onRemove}
          className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors shadow-md"
          title="Remove and return to tray"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
        </button>
      )}
    </motion.div>
  );
}
