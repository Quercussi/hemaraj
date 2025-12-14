'use client';

import { createContext, useContext, useCallback, ReactNode } from 'react';
import {
  ALL_TRIP_IMAGES,
  TRIPS,
  type TripImage,
  type Trip,
} from '../components/mainContent/section2/section2Data';

interface TripImagesContextType {
  getTripById: (id: number) => Trip | undefined;
  getImagesByTripId: (tripId: number) => TripImage[];
  getAllTrips: () => Trip[];
  getAllImages: () => TripImage[];
}

const TripImagesContext = createContext<TripImagesContextType | undefined>(undefined);

interface TripImagesProviderProps {
  children: ReactNode;
}

export function TripImagesProvider({ children }: TripImagesProviderProps) {
  const getTripById = useCallback((id: number): Trip | undefined => {
    return TRIPS.find((trip) => trip.id === id);
  }, []);

  const getImagesByTripId = useCallback((tripId: number): TripImage[] => {
    const trip = TRIPS.find((t) => t.id === tripId);
    return trip?.images ?? [];
  }, []);

  const getAllTrips = useCallback((): Trip[] => {
    return TRIPS;
  }, []);

  const getAllImages = useCallback((): TripImage[] => {
    return ALL_TRIP_IMAGES;
  }, []);

  return (
    <TripImagesContext.Provider
      value={{
        getTripById,
        getImagesByTripId,
        getAllTrips,
        getAllImages,
      }}
    >
      {children}
    </TripImagesContext.Provider>
  );
}

export function useTripImages() {
  const context = useContext(TripImagesContext);
  if (context === undefined) {
    throw new Error('useTripImages must be used within a TripImagesProvider');
  }
  return context;
}
