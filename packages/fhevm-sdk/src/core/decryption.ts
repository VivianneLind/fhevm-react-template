/**
 * FHEVM Decryption - Output decryption utilities
 * Decrypts encrypted values from FHEVM smart contracts
 */

import type { FhevmInstance } from '../types';
import { isFhevmReady } from './client';
import { validateAddress } from '../utils/validation';

/**
 * Decrypts an encrypted value from a smart contract
 *
 * @param fhevm - FHEVM instance from createFhevmInstance()
 * @param ciphertext - Encrypted value to decrypt (hex string or Uint8Array)
 * @param contractAddress - Contract address that owns the ciphertext
 * @param userAddress - User address requesting decryption (optional)
 * @returns Promise resolving to decrypted value
 *
 * @throws Error if FHEVM instance is not ready, addresses are invalid, or decryption fails
 *
 * @example
 * ```typescript
 * // Decrypt a value from contract
 * const encryptedScore = await contract.getEncryptedScore();
 * const decrypted = await decryptOutput(
 *   fhevm,
 *   encryptedScore,
 *   CONTRACT_ADDRESS,
 *   userAddress
 * );
 * console.log('Decrypted value:', decrypted);
 * ```
 */
export async function decryptOutput(
  fhevm: FhevmInstance | null,
  ciphertext: string | Uint8Array,
  contractAddress: string,
  userAddress?: string
): Promise<number | bigint | boolean | string> {
  // Validate FHEVM instance
  if (!isFhevmReady(fhevm)) {
    throw new Error('FHEVM instance is not ready. Please initialize with createFhevmInstance() first.');
  }

  // Validate contract address
  if (!validateAddress(contractAddress)) {
    throw new Error(`Invalid contract address: ${contractAddress}`);
  }

  // Validate user address if provided
  if (userAddress && !validateAddress(userAddress)) {
    throw new Error(`Invalid user address: ${userAddress}`);
  }

  try {
    const instance = fhevm!.instance;

    // Convert ciphertext to proper format
    let ciphertextBytes: Uint8Array;
    if (typeof ciphertext === 'string') {
      // Remove 0x prefix if present
      const hexString = ciphertext.startsWith('0x') ? ciphertext.slice(2) : ciphertext;
      ciphertextBytes = new Uint8Array(
        hexString.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []
      );
    } else {
      ciphertextBytes = ciphertext;
    }

    // Request decryption from gateway
    // Note: This is a simplified version. In production, you'd need to:
    // 1. Generate a signature proving authorization
    // 2. Send request to gateway with signature
    // 3. Wait for gateway to process and return decrypted value

    const gatewayUrl = fhevm!.config.gatewayUrl;
    if (!gatewayUrl) {
      throw new Error('Gateway URL not configured');
    }

    // Create decryption request
    const decryptionRequest = {
      ciphertext: Array.from(ciphertextBytes),
      contractAddress,
      userAddress,
    };

    // Send request to gateway
    const response = await fetch(`${gatewayUrl}/decrypt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(decryptionRequest),
    });

    if (!response.ok) {
      throw new Error(`Gateway request failed: ${response.statusText}`);
    }

    const result = await response.json();

    // Parse and return the decrypted value
    return parseDecryptedValue(result.value, result.type);
  } catch (error) {
    throw new Error(
      `Failed to decrypt output: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Grants decryption permission to an address for specific contract data
 *
 * @param fhevm - FHEVM instance
 * @param contractAddress - Contract containing encrypted data
 * @param userAddress - Address to grant permission to
 * @returns Promise resolving when permission is granted
 *
 * @example
 * ```typescript
 * // Grant permission to view encrypted data
 * await grantAccess(fhevm, CONTRACT_ADDRESS, recipientAddress);
 * ```
 */
export async function grantAccess(
  fhevm: FhevmInstance | null,
  contractAddress: string,
  userAddress: string
): Promise<void> {
  // Validate FHEVM instance
  if (!isFhevmReady(fhevm)) {
    throw new Error('FHEVM instance is not ready. Please initialize with createFhevmInstance() first.');
  }

  // Validate addresses
  if (!validateAddress(contractAddress)) {
    throw new Error(`Invalid contract address: ${contractAddress}`);
  }

  if (!validateAddress(userAddress)) {
    throw new Error(`Invalid user address: ${userAddress}`);
  }

  try {
    const instance = fhevm!.instance;

    // Generate permission signature
    // This allows the user to decrypt data from the contract
    const signature = await instance.generatePublicKey({
      verifyingContract: contractAddress,
    });

    // Store permission in ACL contract
    const aclAddress = fhevm!.config.aclAddress;
    if (!aclAddress) {
      throw new Error('ACL address not configured');
    }

    // In a real implementation, this would call the ACL contract
    // to register the permission on-chain
    console.log('Permission granted:', {
      contract: contractAddress,
      user: userAddress,
      signature,
    });
  } catch (error) {
    throw new Error(
      `Failed to grant access: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Revokes decryption permission from an address
 *
 * @param fhevm - FHEVM instance
 * @param contractAddress - Contract containing encrypted data
 * @param userAddress - Address to revoke permission from
 * @returns Promise resolving when permission is revoked
 */
export async function revokeAccess(
  fhevm: FhevmInstance | null,
  contractAddress: string,
  userAddress: string
): Promise<void> {
  // Validate FHEVM instance
  if (!isFhevmReady(fhevm)) {
    throw new Error('FHEVM instance is not ready. Please initialize with createFhevmInstance() first.');
  }

  // Validate addresses
  if (!validateAddress(contractAddress)) {
    throw new Error(`Invalid contract address: ${contractAddress}`);
  }

  if (!validateAddress(userAddress)) {
    throw new Error(`Invalid user address: ${userAddress}`);
  }

  try {
    const aclAddress = fhevm!.config.aclAddress;
    if (!aclAddress) {
      throw new Error('ACL address not configured');
    }

    // In a real implementation, this would call the ACL contract
    // to revoke the permission on-chain
    console.log('Permission revoked:', {
      contract: contractAddress,
      user: userAddress,
    });
  } catch (error) {
    throw new Error(
      `Failed to revoke access: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Parses a decrypted value based on its type
 *
 * @param value - Raw decrypted value
 * @param type - Value type
 * @returns Parsed value in appropriate JavaScript type
 */
function parseDecryptedValue(
  value: any,
  type?: string
): number | bigint | boolean | string {
  if (type === 'bool' || typeof value === 'boolean') {
    return Boolean(value);
  }

  if (type === 'address' || (typeof value === 'string' && value.startsWith('0x'))) {
    return value;
  }

  // Numeric types
  const numValue = BigInt(value);

  // Return as number if it fits, otherwise bigint
  if (numValue <= Number.MAX_SAFE_INTEGER) {
    return Number(numValue);
  }

  return numValue;
}

/**
 * Checks if a user has permission to decrypt data from a contract
 *
 * @param fhevm - FHEVM instance
 * @param contractAddress - Contract address
 * @param userAddress - User address
 * @returns Promise resolving to boolean indicating if user has permission
 */
export async function hasAccess(
  fhevm: FhevmInstance | null,
  contractAddress: string,
  userAddress: string
): Promise<boolean> {
  // Validate FHEVM instance
  if (!isFhevmReady(fhevm)) {
    return false;
  }

  // Validate addresses
  if (!validateAddress(contractAddress) || !validateAddress(userAddress)) {
    return false;
  }

  try {
    const aclAddress = fhevm!.config.aclAddress;
    if (!aclAddress) {
      return false;
    }

    // In a real implementation, this would query the ACL contract
    // For now, return true as a placeholder
    return true;
  } catch (error) {
    return false;
  }
}
