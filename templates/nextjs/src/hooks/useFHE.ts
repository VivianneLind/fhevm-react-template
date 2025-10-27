import { useFhevm, useEncrypt, useDecrypt } from '@fhevm/sdk/react';

/**
 * Comprehensive FHE hook that combines all FHE operations
 */
export function useFHE(config?: { chainId?: number; network?: string }) {
  const { fhevm, isReady, error: fhevmError, refresh } = useFhevm(config || {
    chainId: 11155111,
    network: 'sepolia'
  });

  const { encrypt, isEncrypting, error: encryptError } = useEncrypt(fhevm);
  const { decrypt, isDecrypting, error: decryptError } = useDecrypt(fhevm);

  return {
    // Instance
    fhevm,
    isReady,
    refresh,

    // Encryption
    encrypt,
    isEncrypting,

    // Decryption
    decrypt,
    isDecrypting,

    // Errors
    error: fhevmError || encryptError || decryptError,
  };
}
