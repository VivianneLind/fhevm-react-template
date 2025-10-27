'use client';

import React, { useState } from 'react';
import { useEncrypt } from '@fhevm/sdk/react';
import { useFHEContext } from './FHEProvider';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const EncryptionDemo: React.FC = () => {
  const { fhevm, isReady } = useFHEContext();
  const { encrypt, isEncrypting, error } = useEncrypt(fhevm);
  const [value, setValue] = useState('');
  const [encryptedValue, setEncryptedValue] = useState<string | null>(null);

  const handleEncrypt = async () => {
    if (!value) return;

    try {
      const encrypted = await encrypt(parseInt(value), 'uint32');
      setEncryptedValue(JSON.stringify(encrypted, null, 2));
    } catch (err) {
      console.error('Encryption error:', err);
    }
  };

  return (
    <Card title="Encryption Demo">
      <div className="space-y-4">
        <Input
          label="Value to Encrypt"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a number"
          disabled={!isReady}
        />

        <Button
          onClick={handleEncrypt}
          disabled={!isReady || isEncrypting || !value}
        >
          {isEncrypting ? 'Encrypting...' : 'Encrypt Value'}
        </Button>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded">
            Error: {error.message}
          </div>
        )}

        {encryptedValue && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Encrypted Result:</h3>
            <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm">
              {encryptedValue}
            </pre>
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
