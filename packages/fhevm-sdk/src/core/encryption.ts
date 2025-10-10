/**
 * FHEVM Encryption - Input encryption utilities
 * Encrypts values for use in FHEVM smart contracts
 */

import type { FhevmInstance, EncryptedValue, EncryptionType } from '../types';
import { isFhevmReady } from './client';

/**
 * Encrypts a value for use in FHEVM smart contracts
 *
 * @param fhevm - FHEVM instance from createFhevmInstance()
 * @param value - Value to encrypt (number, bigint, boolean, or string for addresses)
 * @param type - Encryption type (optional, auto-detected if not provided)
 * @returns Promise resolving to encrypted value
 *
 * @throws Error if FHEVM instance is not ready or encryption fails
 *
 * @example
 * ```typescript
 * // Encrypt a uint32
 * const encrypted = await encryptInput(fhevm, 42, 'uint32');
 *
 * // Encrypt a boolean
 * const encryptedBool = await encryptInput(fhevm, true, 'bool');
 *
 * // Auto-detect type (infers uint8 for small numbers)
 * const encrypted = await encryptInput(fhevm, 100);
 * ```
 */
export async function encryptInput(
  fhevm: FhevmInstance | null,
  value: number | bigint | boolean | string,
  type?: EncryptionType
): Promise<EncryptedValue> {
  // Validate FHEVM instance
  if (!isFhevmReady(fhevm)) {
    throw new Error('FHEVM instance is not ready. Please initialize with createFhevmInstance() first.');
  }

  try {
    const instance = fhevm!.instance;

    // Auto-detect type if not provided
    const encryptionType = type || detectEncryptionType(value);

    // Prepare the value based on type
    let preparedValue: number | bigint | boolean;

    if (encryptionType === 'address') {
      if (typeof value !== 'string') {
        throw new Error('Address type requires string value');
      }
      // Convert address to bigint for encryption
      preparedValue = BigInt(value);
    } else if (encryptionType === 'bool') {
      preparedValue = Boolean(value);
    } else {
      // Numeric types
      preparedValue = typeof value === 'bigint' ? value : BigInt(value);
    }

    // Encrypt based on type
    let encryptedData: Uint8Array;
    let handles: string[] = [];
    let inputProof: string = '';

    switch (encryptionType) {
      case 'uint8':
        const input8 = instance.createEncryptedInput(fhevm!.config.aclAddress!, fhevm!.config.chainId);
        input8.add8(Number(preparedValue));
        const encrypted8 = input8.encrypt();
        encryptedData = encrypted8.data;
        handles = encrypted8.handles;
        inputProof = encrypted8.inputProof;
        break;

      case 'uint16':
        const input16 = instance.createEncryptedInput(fhevm!.config.aclAddress!, fhevm!.config.chainId);
        input16.add16(Number(preparedValue));
        const encrypted16 = input16.encrypt();
        encryptedData = encrypted16.data;
        handles = encrypted16.handles;
        inputProof = encrypted16.inputProof;
        break;

      case 'uint32':
        const input32 = instance.createEncryptedInput(fhevm!.config.aclAddress!, fhevm!.config.chainId);
        input32.add32(Number(preparedValue));
        const encrypted32 = input32.encrypt();
        encryptedData = encrypted32.data;
        handles = encrypted32.handles;
        inputProof = encrypted32.inputProof;
        break;

      case 'uint64':
        const input64 = instance.createEncryptedInput(fhevm!.config.aclAddress!, fhevm!.config.chainId);
        input64.add64(BigInt(preparedValue));
        const encrypted64 = input64.encrypt();
        encryptedData = encrypted64.data;
        handles = encrypted64.handles;
        inputProof = encrypted64.inputProof;
        break;

      case 'bool':
        const inputBool = instance.createEncryptedInput(fhevm!.config.aclAddress!, fhevm!.config.chainId);
        inputBool.addBool(Boolean(preparedValue));
        const encryptedBool = inputBool.encrypt();
        encryptedData = encryptedBool.data;
        handles = encryptedBool.handles;
        inputProof = encryptedBool.inputProof;
        break;

      case 'address':
        const inputAddr = instance.createEncryptedInput(fhevm!.config.aclAddress!, fhevm!.config.chainId);
        inputAddr.add64(BigInt(preparedValue)); // Addresses encrypted as uint64
        const encryptedAddr = inputAddr.encrypt();
        encryptedData = encryptedAddr.data;
        handles = encryptedAddr.handles;
        inputProof = encryptedAddr.inputProof;
        break;

      default:
        throw new Error(`Unsupported encryption type: ${encryptionType}`);
    }

    return {
      data: encryptedData,
      handles,
      inputProof,
    };
  } catch (error) {
    throw new Error(
      `Failed to encrypt input: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Auto-detects the appropriate encryption type based on value
 *
 * @param value - Value to analyze
 * @returns Detected encryption type
 */
function detectEncryptionType(value: number | bigint | boolean | string): EncryptionType {
  if (typeof value === 'boolean') {
    return 'bool';
  }

  if (typeof value === 'string') {
    // Check if it looks like an Ethereum address
    if (value.startsWith('0x') && value.length === 42) {
      return 'address';
    }
    throw new Error('String values must be Ethereum addresses (0x...)');
  }

  const numValue = typeof value === 'bigint' ? value : BigInt(value);

  if (numValue < 0n) {
    throw new Error('Negative values are not supported');
  }

  // Detect appropriate size
  if (numValue <= 255n) {
    return 'uint8';
  } else if (numValue <= 65535n) {
    return 'uint16';
  } else if (numValue <= 4294967295n) {
    return 'uint32';
  } else {
    return 'uint64';
  }
}

/**
 * Encrypts multiple values in batch
 *
 * @param fhevm - FHEVM instance
 * @param values - Array of values to encrypt with their types
 * @returns Promise resolving to array of encrypted values
 *
 * @example
 * ```typescript
 * const encrypted = await encryptBatch(fhevm, [
 *   { value: 42, type: 'uint32' },
 *   { value: true, type: 'bool' },
 *   { value: 100, type: 'uint8' }
 * ]);
 * ```
 */
export async function encryptBatch(
  fhevm: FhevmInstance | null,
  values: Array<{ value: number | bigint | boolean | string; type?: EncryptionType }>
): Promise<EncryptedValue[]> {
  return Promise.all(values.map(({ value, type }) => encryptInput(fhevm, value, type)));
}
