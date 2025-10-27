/**
 * Client-side FHE Operations
 * Provides utilities for FHE operations in the browser
 */

import {
  createFhevmInstance,
  encryptInput,
  decryptOutput,
  FhevmInstance,
  EncryptedValue,
  EncryptionType,
} from '@fhevm/sdk';

/**
 * Initialize FHE client instance
 */
export async function initializeFHEClient(
  chainId: number,
  network: string
): Promise<FhevmInstance> {
  try {
    const instance = await createFhevmInstance({
      chainId,
      network,
    });
    return instance;
  } catch (error) {
    console.error('Failed to initialize FHE client:', error);
    throw error;
  }
}

/**
 * Encrypt a value for use in smart contracts
 */
export async function encryptValue(
  fhevm: FhevmInstance | null,
  value: number | bigint,
  type: EncryptionType = 'uint32'
): Promise<EncryptedValue> {
  if (!fhevm) {
    throw new Error('FHEVM instance not initialized');
  }

  try {
    return await encryptInput(fhevm, value, type);
  } catch (error) {
    console.error('Encryption failed:', error);
    throw error;
  }
}

/**
 * Decrypt a ciphertext from a smart contract
 */
export async function decryptValue(
  fhevm: FhevmInstance | null,
  ciphertext: string,
  contractAddress: string,
  userAddress: string
): Promise<bigint> {
  if (!fhevm) {
    throw new Error('FHEVM instance not initialized');
  }

  try {
    return await decryptOutput(fhevm, ciphertext, contractAddress, userAddress);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw error;
  }
}

/**
 * Batch encrypt multiple values
 */
export async function batchEncrypt(
  fhevm: FhevmInstance | null,
  values: Array<{ value: number | bigint; type: EncryptionType }>
): Promise<EncryptedValue[]> {
  if (!fhevm) {
    throw new Error('FHEVM instance not initialized');
  }

  return Promise.all(
    values.map(({ value, type }) => encryptInput(fhevm, value, type))
  );
}
