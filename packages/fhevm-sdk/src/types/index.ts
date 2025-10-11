/**
 * Type definitions for FHEVM SDK
 */

import type { FhevmInstance as FhevmjsInstance } from 'fhevmjs';

/**
 * Supported encryption types for FHEVM
 */
export type EncryptionType = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool' | 'address';

/**
 * FHEVM configuration object
 */
export interface FhevmConfig {
  /** Ethereum chain ID (e.g., 11155111 for Sepolia) */
  chainId: number;

  /** Network name (e.g., 'sepolia', 'localhost') - optional if custom URLs provided */
  network?: string;

  /** Custom gateway URL for decryption requests */
  gatewayUrl?: string;

  /** ACL (Access Control List) contract address */
  aclAddress?: string;

  /** KMS (Key Management System) verifier contract address */
  kmsVerifierAddress?: string;
}

/**
 * FHEVM instance object
 */
export interface FhevmInstance {
  /** Underlying fhevmjs instance */
  instance: FhevmjsInstance;

  /** Configuration used to create this instance */
  config: Required<Omit<FhevmConfig, 'network'>> & { network?: string };

  /** Whether the instance is ready for use */
  isReady: boolean;
}

/**
 * Encrypted value returned from encryption operations
 */
export interface EncryptedValue {
  /** Encrypted data as Uint8Array */
  data: Uint8Array;

  /** Handles for the encrypted values */
  handles: string[];

  /** Input proof for verification */
  inputProof: string;
}

/**
 * Network configuration preset
 */
export interface NetworkConfig {
  /** Chain ID */
  chainId: number;

  /** Gateway URL for decryption */
  gatewayUrl: string;

  /** ACL contract address */
  aclAddress: string;

  /** KMS verifier address (optional) */
  kmsVerifierAddress?: string;

  /** Network name */
  name: string;

  /** RPC URLs */
  rpcUrls?: string[];
}

/**
 * React hook return type for useFhevm
 */
export interface UseFhevmReturn {
  /** FHEVM instance (null if not initialized) */
  fhevm: FhevmInstance | null;

  /** Whether the instance is ready */
  isReady: boolean;

  /** Error that occurred during initialization */
  error: Error | null;

  /** Function to reload/refresh the instance */
  reload: () => Promise<void>;
}

/**
 * React hook return type for useEncrypt
 */
export interface UseEncryptReturn {
  /**
   * Encrypts a value
   * @param value - Value to encrypt
   * @param type - Encryption type (optional, auto-detected if not provided)
   */
  encrypt: (
    value: number | bigint | boolean | string,
    type?: EncryptionType
  ) => Promise<EncryptedValue>;

  /** Whether an encryption operation is in progress */
  isEncrypting: boolean;

  /** Error that occurred during encryption */
  error: Error | null;
}

/**
 * React hook return type for useDecrypt
 */
export interface UseDecryptReturn {
  /**
   * Decrypts a ciphertext
   * @param ciphertext - Encrypted value
   * @param contractAddress - Contract address
   * @param userAddress - User address (optional)
   */
  decrypt: (
    ciphertext: string | Uint8Array,
    contractAddress: string,
    userAddress?: string
  ) => Promise<number | bigint | boolean | string>;

  /** Whether a decryption operation is in progress */
  isDecrypting: boolean;

  /** Error that occurred during decryption */
  error: Error | null;
}

/**
 * Generic error for FHEVM operations
 */
export class FhevmError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'FhevmError';
  }
}

/**
 * Error specific to encryption operations
 */
export class EncryptionError extends FhevmError {
  constructor(message: string, details?: any) {
    super(message, 'ENCRYPTION_ERROR', details);
    this.name = 'EncryptionError';
  }
}

/**
 * Error specific to decryption operations
 */
export class DecryptionError extends FhevmError {
  constructor(message: string, details?: any) {
    super(message, 'DECRYPTION_ERROR', details);
    this.name = 'DecryptionError';
  }
}

/**
 * Error when FHEVM instance is not ready
 */
export class NotReadyError extends FhevmError {
  constructor(message: string = 'FHEVM instance is not ready') {
    super(message, 'NOT_READY');
    this.name = 'NotReadyError';
  }
}
