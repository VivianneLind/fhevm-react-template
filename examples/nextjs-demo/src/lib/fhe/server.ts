/**
 * Server-side FHE Operations
 * Provides utilities for FHE operations on the server
 */

import {
  createFhevmInstance,
  encryptInput,
  FhevmInstance,
  EncryptionType,
} from '@fhevm/sdk';

/**
 * Initialize server-side FHE instance
 * This should be called in API routes or server components
 */
export async function initializeServerFHE(
  chainId: number = 11155111,
  network: string = 'sepolia'
): Promise<FhevmInstance> {
  try {
    return await createFhevmInstance({
      chainId,
      network,
    });
  } catch (error) {
    console.error('Failed to initialize server FHE:', error);
    throw error;
  }
}

/**
 * Encrypt data on the server
 * Useful for pre-processing data before sending to contracts
 */
export async function serverEncrypt(
  value: number | bigint,
  type: EncryptionType = 'uint32',
  chainId?: number
): Promise<any> {
  const fhevm = await initializeServerFHE(chainId);
  return await encryptInput(fhevm, value, type);
}

/**
 * Validate encrypted data format
 */
export function validateEncryptedData(data: any): boolean {
  try {
    return (
      data &&
      typeof data === 'object' &&
      'data' in data
    );
  } catch {
    return false;
  }
}
