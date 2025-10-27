import { createFhevmInstance } from '@fhevm/sdk';

export interface FHEClientConfig {
  chainId: number;
  network: string;
  gatewayUrl?: string;
  aclAddress?: string;
}

/**
 * Initialize FHEVM client instance
 */
export async function initializeFHEClient(config: FHEClientConfig) {
  return await createFhevmInstance(config);
}

/**
 * Get default configuration for common networks
 */
export function getNetworkConfig(network: 'sepolia' | 'localhost'): FHEClientConfig {
  const configs = {
    sepolia: {
      chainId: 11155111,
      network: 'sepolia',
    },
    localhost: {
      chainId: 31337,
      network: 'localhost',
    },
  };

  return configs[network];
}
