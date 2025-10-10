/**
 * Network configurations for FHEVM
 * Pre-configured settings for supported networks
 */

import type { NetworkConfig } from '../types';

/**
 * Network configuration presets
 */
export const NETWORK_CONFIGS: Record<string, NetworkConfig> = {
  sepolia: {
    chainId: 11155111,
    name: 'Sepolia',
    gatewayUrl: 'https://gateway.sepolia.zama.ai',
    aclAddress: '0x9D6891A6240D6130c54ae243d8005063D05fE14b',
    kmsVerifierAddress: '0x33347831500F1e73f102B789773FBb27Fe321808',
    rpcUrls: [
      'https://ethereum-sepolia-rpc.publicnode.com',
      'https://rpc.sepolia.org',
      'https://eth-sepolia.g.alchemy.com/v2/demo',
    ],
  },

  localhost: {
    chainId: 31337,
    name: 'Localhost',
    gatewayUrl: 'http://localhost:8545/gateway',
    aclAddress: '0x9D6891A6240D6130c54ae243d8005063D05fE14b',
    kmsVerifierAddress: '0x33347831500F1e73f102B789773FBb27Fe321808',
    rpcUrls: ['http://127.0.0.1:8545'],
  },

  hardhat: {
    chainId: 31337,
    name: 'Hardhat',
    gatewayUrl: 'http://localhost:8545/gateway',
    aclAddress: '0x9D6891A6240D6130c54ae243d8005063D05fE14b',
    kmsVerifierAddress: '0x33347831500F1e73f102B789773FBb27Fe321808',
    rpcUrls: ['http://127.0.0.1:8545'],
  },
};

/**
 * Gets network configuration by name
 *
 * @param network - Network name
 * @returns Network configuration or undefined if not found
 */
export function getNetworkConfig(network: string): NetworkConfig | undefined {
  return NETWORK_CONFIGS[network.toLowerCase()];
}

/**
 * Gets network configuration by chain ID
 *
 * @param chainId - Chain ID
 * @returns Network configuration or undefined if not found
 */
export function getNetworkConfigByChainId(chainId: number): NetworkConfig | undefined {
  return Object.values(NETWORK_CONFIGS).find(config => config.chainId === chainId);
}

/**
 * Checks if a network is supported
 *
 * @param network - Network name
 * @returns true if network is supported
 */
export function isNetworkSupported(network: string): boolean {
  return network.toLowerCase() in NETWORK_CONFIGS;
}

/**
 * Gets list of supported networks
 *
 * @returns Array of supported network names
 */
export function getSupportedNetworks(): string[] {
  return Object.keys(NETWORK_CONFIGS);
}

/**
 * Gets list of supported chain IDs
 *
 * @returns Array of supported chain IDs
 */
export function getSupportedChainIds(): number[] {
  return Object.values(NETWORK_CONFIGS).map(config => config.chainId);
}
