'use client';

import { EncryptionDemo } from '@/components/fhe/EncryptionDemo';
import { ComputationDemo } from '@/components/fhe/ComputationDemo';
import { FHEProvider } from '@/components/fhe/FHEProvider';

export default function Home() {
  return (
    <FHEProvider>
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">FHEVM SDK Demo</h1>

          <div className="space-y-8">
            <EncryptionDemo />
            <ComputationDemo />
          </div>
        </div>
      </main>
    </FHEProvider>
  );
}
