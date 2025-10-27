/**
 * useEncryption Hook
 * Hook for encrypting data using FHE
 */

import { useState, useCallback } from 'react';
import { encryptInput, FhevmInstance, EncryptionType, EncryptedValue } from '@fhevm/sdk';

export interface UseEncryptionReturn {
  encrypt: (value: number | bigint, type?: EncryptionType) => Promise<EncryptedValue>;
  encryptBatch: (values: Array<{ value: number | bigint; type: EncryptionType }>) => Promise<EncryptedValue[]>;
  isEncrypting: boolean;
  error: Error | null;
  lastEncrypted: EncryptedValue | null;
}

export function useEncryption(fhevm: FhevmInstance | null): UseEncryptionReturn {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastEncrypted, setLastEncrypted] = useState<EncryptedValue | null>(null);

  const encrypt = useCallback(
    async (value: number | bigint, type: EncryptionType = 'uint32'): Promise<EncryptedValue> => {
      if (!fhevm) {
        const err = new Error('FHEVM instance not initialized');
        setError(err);
        throw err;
      }

      setIsEncrypting(true);
      setError(null);

      try {
        const encrypted = await encryptInput(fhevm, value, type);
        setLastEncrypted(encrypted);
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

  const encryptBatch = useCallback(
    async (
      values: Array<{ value: number | bigint; type: EncryptionType }>
    ): Promise<EncryptedValue[]> => {
      if (!fhevm) {
        const err = new Error('FHEVM instance not initialized');
        setError(err);
        throw err;
      }

      setIsEncrypting(true);
      setError(null);

      try {
        const results = await Promise.all(
          values.map(({ value, type }) => encryptInput(fhevm, value, type))
        );
        return results;
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
    encrypt,
    encryptBatch,
    isEncrypting,
    error,
    lastEncrypted,
  };
}
