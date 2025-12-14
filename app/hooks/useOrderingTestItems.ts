import { useState, useEffect } from 'react';
import type { ImagesResponse, ImageItem } from '../api/orderingTest/dto';

export function useOrderingTestItems() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/orderingTest')
      .then((res) => res.json())
      .then((result: ImagesResponse) => {
        if (result.success) {
          setImages(result.data.images);
        } else {
          setError(result.message);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setError('Failed to load images');
        setIsLoading(false);
      });
  }, []);

  return { images, isLoading, error };
}
