/**
 * Validation Utilities
 * Input validation and data verification functions
 */

import { EncryptionType } from '@fhevm/sdk';

/**
 * Validate encryption type
 */
export function isValidEncryptionType(type: string): type is EncryptionType {
  const validTypes: EncryptionType[] = [
    'uint8',
    'uint16',
    'uint32',
    'uint64',
    'uint128',
    'uint256',
    'int8',
    'int16',
    'int32',
    'int64',
    'int128',
    'int256',
    'bool',
    'address',
  ];
  return validTypes.includes(type as EncryptionType);
}

/**
 * Validate numeric value for encryption type
 */
export function validateValueForType(
  value: number | bigint,
  type: EncryptionType
): boolean {
  const numValue = typeof value === 'bigint' ? value : BigInt(value);

  switch (type) {
    case 'uint8':
      return numValue >= 0n && numValue <= 255n;
    case 'uint16':
      return numValue >= 0n && numValue <= 65535n;
    case 'uint32':
      return numValue >= 0n && numValue <= 4294967295n;
    case 'uint64':
      return numValue >= 0n && numValue <= 18446744073709551615n;
    case 'bool':
      return numValue === 0n || numValue === 1n;
    default:
      return numValue >= 0n;
  }
}

/**
 * Validate encrypted data structure
 */
export function validateEncryptedData(data: any): boolean {
  if (!data || typeof data !== 'object') {
    return false;
  }

  return 'data' in data;
}

/**
 * Validate API response
 */
export function validateAPIResponse(response: any): boolean {
  return (
    response &&
    typeof response === 'object' &&
    'success' in response
  );
}

/**
 * Validate contract address
 */
export function validateContractAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate network name
 */
export function validateNetwork(network: string): boolean {
  const validNetworks = ['sepolia', 'mainnet', 'goerli', 'localhost'];
  return validNetworks.includes(network.toLowerCase());
}

/**
 * Sanitize and validate user input
 */
export function sanitizeAndValidate(
  value: any,
  type: EncryptionType
): number | bigint {
  // Convert to number or bigint
  let numValue: number | bigint;

  if (typeof value === 'string') {
    numValue = parseInt(value, 10);
    if (isNaN(numValue)) {
      throw new Error('Invalid numeric string');
    }
  } else if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      throw new Error('Value must be finite');
    }
    numValue = value;
  } else if (typeof value === 'bigint') {
    numValue = value;
  } else {
    throw new Error('Unsupported value type');
  }

  // Validate against type constraints
  if (!validateValueForType(numValue, type)) {
    throw new Error(`Value ${numValue} is out of range for type ${type}`);
  }

  return numValue;
}
