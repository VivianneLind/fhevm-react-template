/**
 * React hook for managing FHEVM instance
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { createFhevmInstance, refreshFhevmInstance } from '../core/client';
import type { FhevmConfig, FhevmInstance, UseFhevmReturn } from '../types';

/**
 * React hook for initializing and managing FHEVM instance
 *
 * @param config - FHEVM configuration
 * @returns Object containing fhevm instance, ready state, error, and reload function
 *
 * @example
 * ```typescript
 * function MyComponent() {
 *   const { fhevm, isReady, error, reload } = useFhevm({
 *     chainId: 11155111,
 *     network: 'sepolia'
 *   });
 *
 *   if (error) {
 *     return <div>Error: {error.message} <button onClick={reload}>Retry</button></div>;
 *   }
 *
 *   if (!isReady) {
 *     return <div>Loading FHEVM...</div>;
 *   }
 *
 *   return <div>FHEVM Ready!</div>;
 * }
 * ```
 */
export function useFhevm(config: FhevmConfig): UseFhevmReturn {
  const [fhevm, setFhevm] = useState<FhevmInstance | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Memoize config to prevent unnecessary re-initializations
  const memoizedConfig = useMemo(
    () => config,
    [config.chainId, config.network, config.gatewayUrl, config.aclAddress, config.kmsVerifierAddress]
  );

  // Initialize FHEVM instance
  const initialize = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const instance = await createFhevmInstance(memoizedConfig);
      setFhevm(instance);
      setIsReady(true);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to initialize FHEVM');
      setError(error);
      setIsReady(false);
      setFhevm(null);
    } finally {
      setIsLoading(false);
    }
  }, [memoizedConfig]);

  // Reload/refresh the instance
  const reload = useCallback(async () => {
    if (fhevm) {
      setIsLoading(true);
      setError(null);

      try {
        const newInstance = await refreshFhevmInstance(fhevm);
        setFhevm(newInstance);
        setIsReady(true);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to refresh FHEVM');
        setError(error);
        // Don't set isReady to false here, keep the old instance
      } finally {
        setIsLoading(false);
      }
    } else {
      // If no instance exists, initialize a new one
      await initialize();
    }
  }, [fhevm, initialize]);

  // Initialize on mount and when config changes
  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    fhevm,
    isReady,
    error,
    reload,
  };
}

/**
 * Hook that throws an error if FHEVM is not ready
 * Useful for components that require FHEVM to be initialized
 *
 * @param fhevm - FHEVM instance from useFhevm
 * @throws Error if FHEVM is not ready
 *
 * @example
 * ```typescript
 * function MyComponent() {
 *   const { fhevm } = useFhevm({ chainId: 11155111, network: 'sepolia' });
 *   useRequireFhevm(fhevm); // Throws if not ready
 *
 *   // Safe to use fhevm here
 *   const handleEncrypt = async () => {
 *     const encrypted = await encryptInput(fhevm, 42, 'uint32');
 *   };
 * }
 * ```
 */
export function useRequireFhevm(fhevm: FhevmInstance | null): asserts fhevm is FhevmInstance {
  if (!fhevm || !fhevm.isReady) {
    throw new Error('FHEVM instance is required but not ready');
  }
}
