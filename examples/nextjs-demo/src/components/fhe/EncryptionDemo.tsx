'use client';

import React, { useState } from 'react';
import { useEncrypt } from '@fhevm/sdk/react';
import { useFHEContext } from './FHEProvider';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

export const EncryptionDemo: React.FC = () => {
  const { fhevm, isReady } = useFHEContext();
  const { encrypt, isEncrypting } = useEncrypt(fhevm);

  const [inputValue, setInputValue] = useState('');
  const [encryptedData, setEncryptedData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleEncrypt = async () => {
    if (!inputValue) {
      setError('Please enter a value');
      return;
    }

    try {
      setError('');
      const encrypted = await encrypt(parseInt(inputValue), 'uint32');
      setEncryptedData(encrypted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encryption failed');
    }
  };

  return (
    <Card title="Encryption Demo" subtitle="Encrypt values using FHE">
      <div className="space-y-4">
        <Input
          type="number"
          label="Value to Encrypt"
          placeholder="Enter a number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={!isReady}
          error={error}
        />

        <Button
          onClick={handleEncrypt}
          disabled={!isReady || !inputValue}
          isLoading={isEncrypting}
          className="w-full"
        >
          Encrypt Value
        </Button>

        {encryptedData && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2 text-sm text-gray-700">Encrypted Result:</h4>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto font-mono">
              {JSON.stringify(encryptedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </Card>
  );
};
