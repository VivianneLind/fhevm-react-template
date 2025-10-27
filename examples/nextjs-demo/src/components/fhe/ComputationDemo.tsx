'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const ComputationDemo: React.FC = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [operation, setOperation] = useState<'add' | 'multiply' | 'compare'>('add');
  const [result, setResult] = useState<any>(null);
  const [isComputing, setIsComputing] = useState(false);

  const handleCompute = async () => {
    setIsComputing(true);
    try {
      // Simulate homomorphic computation
      const response = await fetch('/api/fhe/compute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation,
          encryptedValues: [value1, value2],
        }),
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Computation failed:', error);
    } finally {
      setIsComputing(false);
    }
  };

  return (
    <Card title="Homomorphic Computation" subtitle="Compute on encrypted data">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            label="First Value"
            placeholder="Enter first number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
          />
          <Input
            type="number"
            label="Second Value"
            placeholder="Enter second number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Operation
          </label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="add">Addition</option>
            <option value="multiply">Multiplication</option>
            <option value="compare">Comparison</option>
          </select>
        </div>

        <Button
          onClick={handleCompute}
          disabled={!value1 || !value2}
          isLoading={isComputing}
          className="w-full"
        >
          Compute on Encrypted Data
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold mb-2 text-blue-900">Computation Result:</h4>
            <p className="text-sm text-blue-700 mb-2">{result.description}</p>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto font-mono">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </Card>
  );
};
