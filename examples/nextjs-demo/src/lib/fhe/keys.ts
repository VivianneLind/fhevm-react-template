/**
 * FHE Key Management Utilities
 * Handles public/private key operations for FHE
 */

import { createFhevmInstance, FhevmInstance } from '@fhevm/sdk';

/**
 * Fetch public encryption key for a network
 */
export async function getPublicKey(
  chainId: number,
  network: string
): Promise<any> {
  try {
    const fhevm = await createFhevmInstance({
      chainId,
      network,
    });

    // The public key is embedded in the FHEVM instance
    return {
      available: true,
      chainId,
      network,
    };
  } catch (error) {
    console.error('Failed to fetch public key:', error);
    throw error;
  }
}

/**
 * Refresh encryption keys
 */
export async function refreshKeys(
  chainId: number,
  network: string
): Promise<boolean> {
  try {
    // Re-initialize FHEVM instance to refresh keys
    await createFhevmInstance({
      chainId,
      network,
    });
    return true;
  } catch (error) {
    console.error('Failed to refresh keys:', error);
    return false;
  }
}

/**
 * Validate key availability
 */
export async function validateKeyAvailability(
  chainId: number,
  network: string
): Promise<boolean> {
  try {
    await getPublicKey(chainId, network);
    return true;
  } catch {
    return false;
  }
}
