'use client';

import React, { useState } from 'react';
import { useFHEContext } from './FHEProvider';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const ComputationDemo: React.FC = () => {
  const { isReady } = useFHEContext();
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleCompute = async () => {
    if (!value1 || !value2) return;

    try {
      // Simulated homomorphic computation
      const sum = parseInt(value1) + parseInt(value2);
      setResult(`Encrypted computation result: ${sum} (simulated)`);
    } catch (err) {
      console.error('Computation error:', err);
    }
  };

  return (
    <Card title="Homomorphic Computation Demo">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Value"
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="Enter first number"
            disabled={!isReady}
          />
          <Input
            label="Second Value"
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder="Enter second number"
            disabled={!isReady}
          />
        </div>

        <Button
          onClick={handleCompute}
          disabled={!isReady || !value1 || !value2}
        >
          Compute Sum (Encrypted)
        </Button>

        {result && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
            {result}
          </div>
        )}

        {!isReady && (
          <div className="text-gray-500 text-sm">
            Initializing FHEVM...
          </div>
        )}
      </div>
    </Card>
  );
};
