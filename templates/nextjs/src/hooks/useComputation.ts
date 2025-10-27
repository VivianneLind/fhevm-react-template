import { useState, useCallback } from 'react';

/**
 * Hook for managing homomorphic computations
 */
export function useComputation() {
  const [isComputing, setIsComputing] = useState(false);
  const [computationError, setComputationError] = useState<Error | null>(null);
  const [result, setResult] = useState<any>(null);

  const compute = useCallback(
    async (operation: string, operands: any[]) => {
      setIsComputing(true);
      setComputationError(null);

      try {
        const response = await fetch('/api/fhe/compute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operation, operands }),
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Computation failed');
        }

        setResult(data.result);
        return data.result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setComputationError(error);
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
    error: computationError,
    result,
  };
}
