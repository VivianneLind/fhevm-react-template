/**
 * API Type Definitions
 * Types for API requests and responses
 */

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: {
    timestamp: number;
    [key: string]: any;
  };
}

export interface EncryptAPIRequest {
  value: number | bigint;
  type?: string;
}

export interface EncryptAPIResponse extends APIResponse {
  encrypted?: any;
  metadata?: {
    type: string;
    timestamp: number;
  };
}

export interface DecryptAPIRequest {
  ciphertext: string;
  contractAddress: string;
  userAddress: string;
}

export interface DecryptAPIResponse extends APIResponse {
  decrypted?: bigint;
}

export interface ComputeAPIRequest {
  operation: 'add' | 'multiply' | 'compare';
  encryptedValues: any[];
}

export interface ComputeAPIResponse extends APIResponse {
  result?: {
    operation: string;
    description: string;
    encryptedResult: any;
  };
}

export interface KeysAPIResponse extends APIResponse {
  publicKey?: {
    available: boolean;
    chainId: number;
  };
}
