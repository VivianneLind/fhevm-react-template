'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createFhevmInstance, FhevmInstance } from '@fhevm/sdk';

interface FHEContextValue {
  fhevm: FhevmInstance | null;
  isReady: boolean;
  error: Error | null;
}

const FHEContext = createContext<FHEContextValue>({
  fhevm: null,
  isReady: false,
  error: null,
});

export const useFHEContext = () => useContext(FHEContext);

interface FHEProviderProps {
  children: React.ReactNode;
  chainId?: number;
  network?: string;
}

export const FHEProvider: React.FC<FHEProviderProps> = ({
  children,
  chainId = 11155111,
  network = 'sepolia',
}) => {
  const [fhevm, setFhevm] = useState<FhevmInstance | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const initializeFhevm = async () => {
      try {
        const instance = await createFhevmInstance({
          chainId,
          network,
        });

        if (mounted) {
          setFhevm(instance);
          setIsReady(true);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to initialize FHEVM'));
          setIsReady(false);
        }
      }
    };

    initializeFhevm();

    return () => {
      mounted = false;
    };
  }, [chainId, network]);

  return (
    <FHEContext.Provider value={{ fhevm, isReady, error }}>
      {children}
    </FHEContext.Provider>
  );
};
