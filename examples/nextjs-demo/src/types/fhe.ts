/**
 * FHE Type Definitions
 * Centralized type definitions for FHE operations
 */

export type {
  EncryptionType,
  FhevmConfig,
  FhevmInstance,
  EncryptedValue,
  NetworkConfig,
  UseFhevmReturn,
  UseEncryptReturn,
  UseDecryptReturn,
} from '@fhevm/sdk';

/**
 * Application-specific FHE types
 */

export interface FHEConfig {
  chainId: number;
  network: string;
  contractAddress?: string;
}

export interface EncryptedTransaction {
  id: string;
  encryptedData: any;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
}

export interface FHEAPIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: {
    timestamp: number;
    [key: string]: any;
  };
}
