/**
 * React hook for decrypting values
 */

import { useState, useCallback } from 'react';
import { decryptOutput, grantAccess, revokeAccess, hasAccess } from '../core/decryption';
import type { FhevmInstance, UseDecryptReturn } from '../types';

/**
 * React hook for decrypting values
 *
 * @param fhevm - FHEVM instance from useFhevm hook
 * @returns Object containing decrypt function, loading state, and error
 *
 * @example
 * ```typescript
 * function ViewScore() {
 *   const { fhevm } = useFhevm({ chainId: 11155111, network: 'sepolia' });
 *   const { decrypt, isDecrypting } = useDecrypt(fhevm);
 *   const [score, setScore] = useState<number | null>(null);
 *
 *   const { data: encryptedScore } = useReadContract({
 *     address: CONTRACT_ADDRESS,
 *     abi: CONTRACT_ABI,
 *     functionName: 'getScore'
 *   });
 *
 *   useEffect(() => {
 *     if (encryptedScore && fhevm) {
 *       decrypt(encryptedScore as string, CONTRACT_ADDRESS)
 *         .then(setScore)
 *         .catch(console.error);
 *     }
 *   }, [encryptedScore, fhevm]);
 *
 *   return (
 *     <div>
 *       {isDecrypting && <p>Decrypting...</p>}
 *       {score !== null && <p>Your score: {score}</p>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useDecrypt(fhevm: FhevmInstance | null): UseDecryptReturn {
  const [isDecrypting, setIsDecrypting] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const decrypt = useCallback(
    async (
      ciphertext: string | Uint8Array,
      contractAddress: string,
      userAddress?: string
    ): Promise<number | bigint | boolean | string> => {
      setIsDecrypting(true);
      setError(null);

      try {
        const decrypted = await decryptOutput(fhevm, ciphertext, contractAddress, userAddress);
        return decrypted;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Decryption failed');
        setError(error);
        throw error;
      } finally {
        setIsDecrypting(false);
      }
    },
    [fhevm]
  );

  return {
    decrypt,
    isDecrypting,
    error,
  };
}

/**
 * React hook for managing access permissions
 *
 * @param fhevm - FHEVM instance from useFhevm hook
 * @returns Object containing permission management functions
 *
 * @example
 * ```typescript
 * function AccessControl() {
 *   const { fhevm } = useFhevm({ chainId: 11155111, network: 'sepolia' });
 *   const { grant, revoke, check, isLoading } = useAccess(fhevm);
 *
 *   const handleGrantAccess = async (userAddress: string) => {
 *     await grant(CONTRACT_ADDRESS, userAddress);
 *     alert('Access granted!');
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={() => handleGrantAccess('0x...')} disabled={isLoading}>
 *         Grant Access
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useAccess(fhevm: FhevmInstance | null) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const grant = useCallback(
    async (contractAddress: string, userAddress: string): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        await grantAccess(fhevm, contractAddress, userAddress);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to grant access');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [fhevm]
  );

  const revoke = useCallback(
    async (contractAddress: string, userAddress: string): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        await revokeAccess(fhevm, contractAddress, userAddress);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to revoke access');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [fhevm]
  );

  const check = useCallback(
    async (contractAddress: string, userAddress: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        const hasPermission = await hasAccess(fhevm, contractAddress, userAddress);
        return hasPermission;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to check access');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [fhevm]
  );

  return {
    grant,
    revoke,
    check,
    isLoading,
    error,
  };
}
