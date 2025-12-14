'use client';

import { createContext, useContext, ReactNode } from 'react';

interface RelationshipContextType {
  relationshipStart: string;
}

const RelationshipContext = createContext<RelationshipContextType | undefined>(undefined);

interface RelationshipProviderProps {
  relationshipStart: string;
  children: ReactNode;
}

export function RelationshipProvider({ relationshipStart, children }: RelationshipProviderProps) {
  return (
    <RelationshipContext.Provider value={{ relationshipStart }}>
      {children}
    </RelationshipContext.Provider>
  );
}

export function useRelationship() {
  const context = useContext(RelationshipContext);
  if (context === undefined) {
    throw new Error('useRelationship must be used within a RelationshipProvider');
  }
  return context;
}
