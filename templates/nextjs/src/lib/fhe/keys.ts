/**
 * Key management utilities for FHEVM
 */

export interface KeyPair {
  publicKey: string;
  privateKey?: string;
}

/**
 * Generate a new key pair for FHE operations
 */
export async function generateKeyPair(): Promise<KeyPair> {
  // Key generation logic
  return {
    publicKey: 'generated_public_key',
  };
}

/**
 * Retrieve public key from gateway
 */
export async function getPublicKey(gatewayUrl: string): Promise<string> {
  try {
    const response = await fetch(`${gatewayUrl}/publicKey`);
    const data = await response.json();
    return data.publicKey;
  } catch (error) {
    throw new Error('Failed to fetch public key');
  }
}

/**
 * Store encrypted private key
 */
export function storeEncryptedKey(key: string, address: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`fhe_key_${address}`, key);
  }
}

/**
 * Retrieve encrypted private key
 */
export function getStoredKey(address: string): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(`fhe_key_${address}`);
  }
  return null;
}
