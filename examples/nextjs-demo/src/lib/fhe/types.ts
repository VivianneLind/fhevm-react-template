/**
 * FHE Type Definitions
 * TypeScript types for FHE operations
 */

export type {
  EncryptionType,
  FhevmConfig,
  FhevmInstance,
  EncryptedValue,
  NetworkConfig,
} from '@fhevm/sdk';

/**
 * FHE Operation Result
 */
export interface FHEOperationResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: {
    timestamp: number;
    operation: string;
    [key: string]: any;
  };
}

/**
 * Encryption Request
 */
export interface EncryptionRequest {
  value: number | bigint;
  type?: string;
  contractAddress?: string;
}

/**
 * Decryption Request
 */
export interface DecryptionRequest {
  ciphertext: string;
  contractAddress: string;
  userAddress: string;
}

/**
 * Computation Request
 */
export interface ComputationRequest {
  operation: 'add' | 'multiply' | 'compare';
  encryptedValues: any[];
  metadata?: Record<string, any>;
}

/**
 * Key Info
 */
export interface KeyInfo {
  available: boolean;
  chainId: number;
  network: string;
  lastUpdated?: number;
}
