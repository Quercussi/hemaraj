'use client';

import { AnimatePresence } from 'framer-motion';
import OrderingTest from '../components/OrderingTest';
import { LoadingState } from '../components/common/LoadingState';
import type { ImageItem } from '../api/orderingTest/dto';

interface OrderingViewProps {
  images: ImageItem[];
  isLoading: boolean;
  error: string | null;
  onComplete: () => void;
}

export default function OrderingView({ images, isLoading, error, onComplete }: OrderingViewProps) {
  if (isLoading) {
    return <LoadingState>Loading memories...</LoadingState>;
  }

  if (error || images.length === 0) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <p className="text-rose-600">Failed to load images. Please refresh the page.</p>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <OrderingTest images={images} onComplete={onComplete} />
      </AnimatePresence>
    </>
  );
}
