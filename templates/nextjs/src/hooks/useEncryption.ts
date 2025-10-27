import { useState, useCallback } from 'react';
import { useEncrypt } from '@fhevm/sdk/react';

/**
 * Enhanced encryption hook with additional features
 */
export function useEncryption(fhevm: any) {
  const { encrypt, isEncrypting, error } = useEncrypt(fhevm);
  const [encryptionHistory, setEncryptionHistory] = useState<any[]>([]);

  const encryptWithHistory = useCallback(
    async (value: any, type?: string) => {
      const encrypted = await encrypt(value, type);

      setEncryptionHistory(prev => [
        ...prev,
        {
          timestamp: Date.now(),
          value,
          type,
          encrypted,
        },
      ]);

      return encrypted;
    },
    [encrypt]
  );

  const clearHistory = useCallback(() => {
    setEncryptionHistory([]);
  }, []);

  return {
    encrypt: encryptWithHistory,
    isEncrypting,
    error,
    history: encryptionHistory,
    clearHistory,
  };
}
