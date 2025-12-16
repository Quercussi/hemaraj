'use client';

import { createContext, useContext } from 'react';

export interface KeyContextValue {
  get: (componentKey: string) => string;
}

const KeyContext = createContext<KeyContextValue | null>(null);

export const KeyContextProvider = KeyContext.Provider;

export const useKeyContext = (): KeyContextValue => {
  const context = useContext(KeyContext);
  if (!context) {
    throw new Error('useKeyContext must be used within a KeyContextProvider');
  }
  return context;
};

// Fallback context for components that may be used outside a provider
const fallbackContext: KeyContextValue = {
  get: (componentKey: string) => componentKey,
};

export const useKeyContextOptional = (): KeyContextValue => {
  const context = useContext(KeyContext);
  return context ?? fallbackContext;
};
