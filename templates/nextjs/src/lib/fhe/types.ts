/**
 * Type definitions for FHEVM operations
 */

export type FHEDataType = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool' | 'address';

export interface EncryptedValue {
  ciphertext: string;
  type: FHEDataType;
  signature?: string;
}

export interface DecryptionRequest {
  ciphertext: string;
  contractAddress: string;
  userAddress: string;
  signature: string;
}

export interface FHEOperation {
  type: 'add' | 'sub' | 'mul' | 'div' | 'eq' | 'ne' | 'lt' | 'lte' | 'gt' | 'gte';
  operands: EncryptedValue[];
}

export interface FHEResult {
  success: boolean;
  result?: any;
  error?: string;
}
