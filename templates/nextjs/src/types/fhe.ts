/**
 * Type definitions for FHE operations
 */

export type FHEDataType = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool' | 'address';

export interface FHEVMConfig {
  chainId: number;
  network: string;
  gatewayUrl?: string;
  aclAddress?: string;
}

export interface EncryptedData {
  ciphertext: string;
  type: FHEDataType;
  handles?: string[];
}

export interface DecryptionParams {
  ciphertext: string;
  contractAddress: string;
  userAddress?: string;
}

export interface FHEOperationResult {
  success: boolean;
  data?: any;
  error?: string;
}
