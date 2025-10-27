'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const KeyManager: React.FC = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPublicKey = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/keys');
      const data = await response.json();
      setPublicKey(data.publicKey);
    } catch (error) {
      console.error('Failed to fetch public key:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Key Management">
      <div className="space-y-4">
        <Button onClick={fetchPublicKey} disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch Public Key'}
        </Button>

        {publicKey && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Public Key:</h3>
            <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm">
              {publicKey}
            </pre>
          </div>
        )}
      </div>
    </Card>
  );
};
