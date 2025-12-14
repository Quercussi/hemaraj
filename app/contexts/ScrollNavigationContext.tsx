'use client';

import { createContext, useContext, useState, ReactNode, useRef, useCallback } from 'react';

interface ScrollNavigationContextType {
  scrollToSection: (index: number) => void;
  setScrollToSectionFn: (fn: (index: number) => void) => void;
  currentSection: number;
  setCurrentSection: (index: number) => void;
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
}

const ScrollNavigationContext = createContext<ScrollNavigationContextType | null>(null);

export function ScrollNavigationProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollFnRef = useRef<((index: number) => void) | null>(null);

  const setScrollToSectionFn = useCallback((fn: (index: number) => void) => {
    scrollFnRef.current = fn;
  }, []);

  const scrollToSection = useCallback((index: number) => {
    if (scrollFnRef.current) {
      scrollFnRef.current(index);
    }
  }, []);

  return (
    <ScrollNavigationContext.Provider
      value={{
        scrollToSection,
        setScrollToSectionFn,
        currentSection,
        setCurrentSection,
        isAnimating,
        setIsAnimating,
      }}
    >
      {children}
    </ScrollNavigationContext.Provider>
  );
}

export function useScrollNavigation() {
  const context = useContext(ScrollNavigationContext);
  if (!context) {
    throw new Error('useScrollNavigation must be used within ScrollNavigationProvider');
  }
  return context;
}
