/**
 * Validation utilities for FHEVM SDK
 */

/**
 * Validates an Ethereum address
 *
 * @param address - Address to validate
 * @returns true if address is valid
 */
export function validateAddress(address: string): boolean {
  if (typeof address !== 'string') {
    return false;
  }

  // Check if it starts with 0x
  if (!address.startsWith('0x')) {
    return false;
  }

  // Check if it has the correct length (42 characters including 0x)
  if (address.length !== 42) {
    return false;
  }

  // Check if all characters after 0x are valid hex
  const hexPart = address.slice(2);
  return /^[0-9a-fA-F]{40}$/.test(hexPart);
}

/**
 * Validates a chain ID
 *
 * @param chainId - Chain ID to validate
 * @returns true if chain ID is valid
 */
export function validateChainId(chainId: number): boolean {
  return Number.isInteger(chainId) && chainId > 0;
}

/**
 * Validates a URL
 *
 * @param url - URL to validate
 * @returns true if URL is valid
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates an encryption type
 *
 * @param type - Type to validate
 * @returns true if type is valid
 */
export function validateEncryptionType(type: string): boolean {
  const validTypes = ['uint8', 'uint16', 'uint32', 'uint64', 'bool', 'address'];
  return validTypes.includes(type);
}

/**
 * Normalizes an Ethereum address to checksum format
 *
 * @param address - Address to normalize
 * @returns Checksum address
 */
export function normalizeAddress(address: string): string {
  if (!validateAddress(address)) {
    throw new Error(`Invalid address: ${address}`);
  }

  // Simple lowercase normalization
  // For production, use ethers or viem for proper checksum
  return address.toLowerCase();
}

/**
 * Converts a hex string to Uint8Array
 *
 * @param hex - Hex string (with or without 0x prefix)
 * @returns Uint8Array
 */
export function hexToUint8Array(hex: string): Uint8Array {
  const hexString = hex.startsWith('0x') ? hex.slice(2) : hex;
  const bytes = hexString.match(/.{1,2}/g);

  if (!bytes) {
    throw new Error('Invalid hex string');
  }

  return new Uint8Array(bytes.map(byte => parseInt(byte, 16)));
}

/**
 * Converts Uint8Array to hex string
 *
 * @param bytes - Uint8Array to convert
 * @param prefix - Whether to include 0x prefix
 * @returns Hex string
 */
export function uint8ArrayToHex(bytes: Uint8Array, prefix: boolean = true): string {
  const hex = Array.from(bytes)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');

  return prefix ? `0x${hex}` : hex;
}
