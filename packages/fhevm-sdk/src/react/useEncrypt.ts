/**
 * React hook for encrypting values
 */

import { useState, useCallback } from 'react';
import { encryptInput } from '../core/encryption';
import type { FhevmInstance, EncryptedValue, EncryptionType, UseEncryptReturn } from '../types';

/**
 * React hook for encrypting values
 *
 * @param fhevm - FHEVM instance from useFhevm hook
 * @returns Object containing encrypt function, loading state, and error
 *
 * @example
 * ```typescript
 * function EncryptForm() {
 *   const { fhevm } = useFhevm({ chainId: 11155111, network: 'sepolia' });
 *   const { encrypt, isEncrypting, error } = useEncrypt(fhevm);
 *   const [value, setValue] = useState('');
 *
 *   const handleSubmit = async (e: React.FormEvent) => {
 *     e.preventDefault();
 *     try {
 *       const encrypted = await encrypt(parseInt(value), 'uint32');
 *       // Use encrypted value...
 *     } catch (err) {
 *       console.error('Encryption failed:', err);
 *     }
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input
 *         type="number"
 *         value={value}
 *         onChange={(e) => setValue(e.target.value)}
 *       />
 *       <button type="submit" disabled={isEncrypting}>
 *         {isEncrypting ? 'Encrypting...' : 'Encrypt & Submit'}
 *       </button>
 *       {error && <p className="error">{error.message}</p>}
 *     </form>
 *   );
 * }
 * ```
 */
export function useEncrypt(fhevm: FhevmInstance | null): UseEncryptReturn {
  const [isEncrypting, setIsEncrypting] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const encrypt = useCallback(
    async (
      value: number | bigint | boolean | string,
      type?: EncryptionType
    ): Promise<EncryptedValue> => {
      setIsEncrypting(true);
      setError(null);

      try {
        const encrypted = await encryptInput(fhevm, value, type);
        return encrypted;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Encryption failed');
        setError(error);
        throw error;
      } finally {
        setIsEncrypting(false);
      }
    },
    [fhevm]
  );

  return {
    encrypt,
    isEncrypting,
    error,
  };
}

/**
 * React hook for batch encrypting multiple values
 *
 * @param fhevm - FHEVM instance from useFhevm hook
 * @returns Object containing encryptBatch function, loading state, and error
 *
 * @example
 * ```typescript
 * function BatchEncryptForm() {
 *   const { fhevm } = useFhevm({ chainId: 11155111, network: 'sepolia' });
 *   const { encryptBatch, isEncrypting } = useEncryptBatch(fhevm);
 *
 *   const handleSubmit = async () => {
 *     const encrypted = await encryptBatch([
 *       { value: 42, type: 'uint32' },
 *       { value: true, type: 'bool' },
 *       { value: 100, type: 'uint8' }
 *     ]);
 *     // Use encrypted values...
 *   };
 *
 *   return (
 *     <button onClick={handleSubmit} disabled={isEncrypting}>
 *       {isEncrypting ? 'Encrypting...' : 'Encrypt All'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useEncryptBatch(fhevm: FhevmInstance | null) {
  const [isEncrypting, setIsEncrypting] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const encryptBatch = useCallback(
    async (
      values: Array<{ value: number | bigint | boolean | string; type?: EncryptionType }>
    ): Promise<EncryptedValue[]> => {
      setIsEncrypting(true);
      setError(null);

      try {
        const encrypted = await Promise.all(
          values.map(({ value, type }) => encryptInput(fhevm, value, type))
        );
        return encrypted;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Batch encryption failed');
        setError(error);
        throw error;
      } finally {
        setIsEncrypting(false);
      }
    },
    [fhevm]
  );

  return {
    encryptBatch,
    isEncrypting,
    error,
  };
}
