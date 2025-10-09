import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { http } from 'wagmi';

// Custom Sepolia configuration with multiple RPC endpoints for better reliability
const sepoliaWithCustomRpc = {
  ...sepolia,
  rpcUrls: {
    default: {
      http: [
        'https://blockchain.googleapis.com/v1/projects/fhevm-425800/locations/us-central1/blockchain-networks/fhe-sepolia/rpc',
        'https://eth-sepolia.g.alchemy.com/v2/demo',
        'https://rpc.sepolia.org',
      ],
    },
    public: {
      http: [
        'https://blockchain.googleapis.com/v1/projects/fhevm-425800/locations/us-central1/blockchain-networks/fhe-sepolia/rpc',
        'https://rpc.sepolia.org',
      ],
    },
  },
};

export const config = getDefaultConfig({
  appName: 'Housing Assessment Example',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [sepoliaWithCustomRpc],
  transports: {
    [sepolia.id]: http(sepoliaWithCustomRpc.rpcUrls.default.http[0], {
      timeout: 30_000,
      retryCount: 3,
      retryDelay: 1000,
    }),
  },
  ssr: true,
});
