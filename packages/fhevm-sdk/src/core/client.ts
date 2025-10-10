/**
 * FHEVM Client - Core instance management
 * Creates and manages FHEVM instances for encryption/decryption operations
 */

import { createInstance, FhevmInstance as FhevmjsInstance, initFhevm } from 'fhevmjs';
import type { FhevmConfig, FhevmInstance } from '../types';
import { NETWORK_CONFIGS } from '../config/networks';
import { validateAddress } from '../utils/validation';

/**
 * Creates an FHEVM instance for encryption and decryption operations
 *
 * @param config - Configuration object
 * @param config.chainId - Ethereum chain ID (e.g., 11155111 for Sepolia)
 * @param config.network - Network name (e.g., 'sepolia') - optional if gatewayUrl is provided
 * @param config.gatewayUrl - Custom gateway URL - optional
 * @param config.aclAddress - Custom ACL contract address - optional
 * @param config.kmsVerifierAddress - Custom KMS verifier address - optional
 *
 * @returns Promise resolving to FhevmInstance
 *
 * @example
 * ```typescript
 * // Using network preset
 * const fhevm = await createFhevmInstance({
 *   chainId: 11155111,
 *   network: 'sepolia'
 * });
 *
 * // Using custom configuration
 * const fhevm = await createFhevmInstance({
 *   chainId: 11155111,
 *   gatewayUrl: 'https://custom-gateway.com',
 *   aclAddress: '0x...'
 * });
 * ```
 */
export async function createFhevmInstance(config: FhevmConfig): Promise<FhevmInstance> {
  try {
    // Get network configuration
    let networkConfig = config.network ? NETWORK_CONFIGS[config.network] : null;

    // Merge with user-provided config (user config takes precedence)
    const finalConfig = {
      chainId: config.chainId,
      gatewayUrl: config.gatewayUrl || networkConfig?.gatewayUrl,
      aclAddress: config.aclAddress || networkConfig?.aclAddress,
      kmsVerifierAddress: config.kmsVerifierAddress || networkConfig?.kmsVerifierAddress,
    };

    // Validate required fields
    if (!finalConfig.gatewayUrl) {
      throw new Error('Gateway URL is required. Either provide a network name or gatewayUrl in config.');
    }

    if (!finalConfig.aclAddress) {
      throw new Error('ACL address is required. Either provide a network name or aclAddress in config.');
    }

    // Validate ACL address
    if (!validateAddress(finalConfig.aclAddress)) {
      throw new Error(`Invalid ACL address: ${finalConfig.aclAddress}`);
    }

    // Initialize FHEVM library
    await initFhevm();

    // Create instance with public key
    const instance = await createInstance({
      chainId: finalConfig.chainId,
      publicKey: '', // Will be fetched from gateway
      gatewayUrl: finalConfig.gatewayUrl,
      aclAddress: finalConfig.aclAddress,
    });

    // Wrap the instance with our interface
    const fhevmInstance: FhevmInstance = {
      instance,
      config: finalConfig,
      isReady: true,
    };

    return fhevmInstance;
  } catch (error) {
    throw new Error(
      `Failed to create FHEVM instance: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Refreshes an existing FHEVM instance
 * Useful when network conditions change or instance becomes stale
 *
 * @param fhevm - Existing FHEVM instance
 * @returns Promise resolving to new FhevmInstance
 */
export async function refreshFhevmInstance(fhevm: FhevmInstance): Promise<FhevmInstance> {
  return createFhevmInstance(fhevm.config);
}

/**
 * Checks if an FHEVM instance is ready for use
 *
 * @param fhevm - FHEVM instance to check
 * @returns boolean indicating if instance is ready
 */
export function isFhevmReady(fhevm: FhevmInstance | null): boolean {
  return fhevm !== null && fhevm.isReady === true && fhevm.instance !== null;
}
