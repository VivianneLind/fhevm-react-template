'use client';

import React, { createContext, useContext } from 'react';
import { useFhevm } from '@fhevm/sdk/react';

interface FHEContextType {
  fhevm: any;
  isReady: boolean;
  error: Error | null;
}

const FHEContext = createContext<FHEContextType | undefined>(undefined);

export const FHEProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { fhevm, isReady, error } = useFhevm({
    chainId: 11155111,
    network: 'sepolia'
  });

  return (
    <FHEContext.Provider value={{ fhevm, isReady, error }}>
      {children}
    </FHEContext.Provider>
  );
};

export const useFHEContext = () => {
  const context = useContext(FHEContext);
  if (!context) {
    throw new Error('useFHEContext must be used within FHEProvider');
  }
  return context;
};
