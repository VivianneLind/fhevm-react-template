'use client';

import React, { useState } from 'react';
import { useEncrypt } from '@fhevm/sdk/react';
import { useFHEContext } from '@/components/fhe/FHEProvider';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const MedicalExample: React.FC = () => {
  const { fhevm, isReady } = useFHEContext();
  const { encrypt, isEncrypting } = useEncrypt(fhevm);
  const [heartRate, setHeartRate] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!heartRate || !bloodPressure) return;

    try {
      setStatus('Encrypting medical data...');

      const encryptedHeartRate = await encrypt(parseInt(heartRate), 'uint32');
      const encryptedBP = await encrypt(parseInt(bloodPressure), 'uint32');

      setStatus('Storing encrypted medical records...');
      // In a real implementation, this would store data on-chain
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStatus('Medical data securely stored on-chain');
      setHeartRate('');
      setBloodPressure('');
    } catch (error) {
      setStatus('Failed to store medical data');
      console.error(error);
    }
  };

  return (
    <Card title="Privacy-Preserving Medical Records">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Store sensitive medical data encrypted on-chain
        </p>

        <Input
          label="Heart Rate (bpm)"
          type="number"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          placeholder="Enter heart rate"
          disabled={!isReady}
        />

        <Input
          label="Blood Pressure (mmHg)"
          type="number"
          value={bloodPressure}
          onChange={(e) => setBloodPressure(e.target.value)}
          placeholder="Enter blood pressure"
          disabled={!isReady}
        />

        <Button
          onClick={handleSubmit}
          disabled={!isReady || isEncrypting || !heartRate || !bloodPressure}
        >
          {isEncrypting ? 'Processing...' : 'Store Medical Data'}
        </Button>

        {status && (
          <div className={`p-3 rounded ${
            status.includes('securely') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {status}
          </div>
        )}
      </div>
    </Card>
  );
};
