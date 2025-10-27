/**
 * API type definitions
 */

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface EncryptionRequest {
  value: any;
  type?: string;
}

export interface EncryptionResponse {
  encrypted: string;
  type: string;
}

export interface DecryptionRequest {
  ciphertext: string;
  contractAddress: string;
  userAddress?: string;
  signature?: string;
}

export interface DecryptionResponse {
  decrypted: any;
}

export interface ComputationRequest {
  operation: string;
  operands: any[];
}

export interface ComputationResponse {
  result: any;
  operation: string;
}
