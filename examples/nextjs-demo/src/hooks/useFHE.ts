/**
 * useFHE Hook
 * Main hook for FHE operations
 */

import { useEffect, useState, useCallback } from 'react';
import { createFhevmInstance, FhevmInstance } from '@fhevm/sdk';

export interface UseFHEConfig {
  chainId: number;
  network: string;
  autoInitialize?: boolean;
}

export interface UseFHEReturn {
  fhevm: FhevmInstance | null;
  isReady: boolean;
  isInitializing: boolean;
  error: Error | null;
  reinitialize: () => Promise<void>;
}

export function useFHE(config: UseFHEConfig): UseFHEReturn {
  const { chainId, network, autoInitialize = true } = config;

  const [fhevm, setFhevm] = useState<FhevmInstance | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const initialize = useCallback(async () => {
    setIsInitializing(true);
    setError(null);

    try {
      const instance = await createFhevmInstance({
        chainId,
        network,
      });

      setFhevm(instance);
      setIsReady(true);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to initialize FHEVM');
      setError(error);
      setIsReady(false);
    } finally {
      setIsInitializing(false);
    }
  }, [chainId, network]);

  useEffect(() => {
    if (autoInitialize) {
      initialize();
    }
  }, [autoInitialize, initialize]);

  return {
    fhevm,
    isReady,
    isInitializing,
    error,
    reinitialize: initialize,
  };
}
