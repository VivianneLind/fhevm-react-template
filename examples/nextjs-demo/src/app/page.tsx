'use client';

import { FHEProvider } from '@/components/fhe/FHEProvider';
import { EncryptionDemo } from '@/components/fhe/EncryptionDemo';
import { ComputationDemo } from '@/components/fhe/ComputationDemo';
import { KeyManager } from '@/components/fhe/KeyManager';
import { BankingExample } from '@/components/examples/BankingExample';
import { MedicalExample } from '@/components/examples/MedicalExample';

export default function Home() {
  return (
    <FHEProvider chainId={11155111} network="sepolia">
      <main className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              FHEVM SDK Demo
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Comprehensive demonstration of fully homomorphic encryption in Next.js
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Powered by @fhevm/sdk - Privacy-preserving smart contract interactions
            </p>
          </header>

          {/* Core Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
              <div className="text-5xl mb-4">🔐</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">End-to-End Encryption</h3>
              <p className="text-gray-600 text-sm">
                Encrypt data on the client side before sending to smart contracts
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Homomorphic Computation</h3>
              <p className="text-gray-600 text-sm">
                Perform computations on encrypted data without decryption
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-pink-500">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Privacy-Preserving</h3>
              <p className="text-gray-600 text-sm">
                Build applications that protect user privacy by default
              </p>
            </div>
          </div>

          {/* Main Demos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <EncryptionDemo />
            <ComputationDemo />
          </div>

          {/* Key Management */}
          <div className="mb-8">
            <KeyManager />
          </div>

          {/* Real-World Examples */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Real-World Use Cases</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BankingExample />
              <MedicalExample />
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Quick Start Code</h2>
            <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm">
              <code>{`import { useFhevm, useEncrypt } from '@fhevm/sdk/react';

function MyComponent() {
  const { fhevm, isReady } = useFhevm({
    chainId: 11155111,
    network: 'sepolia'
  });

  const { encrypt } = useEncrypt(fhevm);

  const handleEncrypt = async (value: number) => {
    const encrypted = await encrypt(value, 'uint32');
    // Use encrypted data in your smart contract
  };

  return (
    <button onClick={() => handleEncrypt(42)} disabled={!isReady}>
      Encrypt
    </button>
  );
}`}</code>
            </pre>
          </div>

          {/* Documentation Links */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Learn More</h2>
            <p className="mb-6 text-blue-100">
              Explore the full documentation and examples to get started with FHEVM SDK
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/zama-ai/fhevm"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                GitHub Repository
              </a>
              <a
                href="https://docs.zama.ai/fhevm"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                Documentation
              </a>
            </div>
          </div>
        </div>
      </main>
    </FHEProvider>
  );
}
