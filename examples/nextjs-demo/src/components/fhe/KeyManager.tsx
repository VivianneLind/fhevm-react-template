'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const KeyManager: React.FC = () => {
  const [keyInfo, setKeyInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchKeyInfo();
  }, []);

  const fetchKeyInfo = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/keys?chainId=11155111');
      const data = await response.json();
      setKeyInfo(data);
    } catch (error) {
      console.error('Failed to fetch key info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshKeys = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation: 'refresh' }),
      });
      const data = await response.json();
      await fetchKeyInfo();
    } catch (error) {
      console.error('Failed to refresh keys:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      title="Key Management"
      subtitle="Manage FHE encryption keys"
      headerAction={
        <Button size="sm" onClick={handleRefreshKeys} isLoading={isLoading}>
          Refresh Keys
        </Button>
      }
    >
      {keyInfo ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              keyInfo.publicKey?.available
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {keyInfo.publicKey?.available ? 'Available' : 'Unavailable'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Chain ID:</span>
            <span className="text-sm text-gray-900">{keyInfo.publicKey?.chainId}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Last Updated:</span>
            <span className="text-sm text-gray-900">
              {new Date(keyInfo.metadata?.timestamp).toLocaleString()}
            </span>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Loading key information...
        </div>
      )}
    </Card>
  );
};
