/**
 * useComputation Hook
 * Hook for performing homomorphic computations
 */

import { useState, useCallback } from 'react';

export type ComputationOperation = 'add' | 'multiply' | 'compare';

export interface ComputationResult {
  operation: string;
  description: string;
  encryptedResult: any;
}

export interface UseComputationReturn {
  compute: (
    operation: ComputationOperation,
    encryptedValues: any[]
  ) => Promise<ComputationResult>;
  isComputing: boolean;
  error: Error | null;
  lastResult: ComputationResult | null;
}

export function useComputation(): UseComputationReturn {
  const [isComputing, setIsComputing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastResult, setLastResult] = useState<ComputationResult | null>(null);

  const compute = useCallback(
    async (
      operation: ComputationOperation,
      encryptedValues: any[]
    ): Promise<ComputationResult> => {
      setIsComputing(true);
      setError(null);

      try {
        const response = await fetch('/api/fhe/compute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            operation,
            encryptedValues,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Computation failed');
        }

        const result = data.result;
        setLastResult(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Computation failed');
        setError(error);
        throw error;
      } finally {
        setIsComputing(false);
      }
    },
    []
  );

  return {
    compute,
    isComputing,
    error,
    lastResult,
  };
}
