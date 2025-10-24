/**
 * Universal FHEVM SDK
 * A framework-agnostic SDK for building confidential frontends with Fully Homomorphic Encryption
 *
 * @packageDocumentation
 */

// Core functions
export {
  createFhevmInstance,
  refreshFhevmInstance,
  isFhevmReady,
} from './core/client';

export {
  encryptInput,
  encryptBatch,
} from './core/encryption';

export {
  decryptOutput,
  grantAccess,
  revokeAccess,
  hasAccess,
} from './core/decryption';

// Configuration
export {
  NETWORK_CONFIGS,
  getNetworkConfig,
  getNetworkConfigByChainId,
  isNetworkSupported,
  getSupportedNetworks,
  getSupportedChainIds,
} from './config/networks';

// Utilities
export {
  validateAddress,
  validateChainId,
  validateUrl,
  validateEncryptionType,
  normalizeAddress,
  hexToUint8Array,
  uint8ArrayToHex,
} from './utils/validation';

// Types
export type {
  EncryptionType,
  FhevmConfig,
  FhevmInstance,
  EncryptedValue,
  NetworkConfig,
  UseFhevmReturn,
  UseEncryptReturn,
  UseDecryptReturn,
} from './types';

export {
  FhevmError,
  EncryptionError,
  DecryptionError,
  NotReadyError,
} from './types';

// Version
export const VERSION = '1.0.0';
