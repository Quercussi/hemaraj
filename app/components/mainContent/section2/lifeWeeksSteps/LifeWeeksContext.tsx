'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { LifeWeeksGridVariant } from './enums/LifeWeeksGridVariant';
import { WeekStatus } from './enums/WeekStatus';

interface LifeWeekItem {
  index: number;
  status: WeekStatus;
}

interface LifeWeeksContextValue {
  herWeeks: LifeWeekItem[];
  myWeeks: LifeWeekItem[];
  variant: LifeWeeksGridVariant;
}

const LifeWeeksContext = createContext<LifeWeeksContextValue | null>(null);

interface LifeWeeksProviderProps {
  herWeeks: LifeWeekItem[];
  myWeeks: LifeWeekItem[];
  variant: LifeWeeksGridVariant;
  children: ReactNode;
}

export const LifeWeeksProvider = ({
  herWeeks,
  myWeeks,
  variant,
  children,
}: LifeWeeksProviderProps) => {
  return (
    <LifeWeeksContext.Provider value={{ herWeeks, myWeeks, variant }}>
      {children}
    </LifeWeeksContext.Provider>
  );
};

export const useLifeWeeksContext = (): LifeWeeksContextValue => {
  const ctx = useContext(LifeWeeksContext);
  if (!ctx) {
    throw new Error('useLifeWeeksContext must be used within a LifeWeeksProvider');
  }
  return ctx;
};
