'use client';

import React, { useState } from 'react';
import { useEncrypt } from '@fhevm/sdk/react';
import { useFHEContext } from '../fhe/FHEProvider';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface MedicalRecord {
  id: number;
  recordType: string;
  value: string;
  encryptedData: any;
  timestamp: string;
}

export const MedicalExample: React.FC = () => {
  const { fhevm, isReady } = useFHEContext();
  const { encrypt, isEncrypting } = useEncrypt(fhevm);

  const [recordType, setRecordType] = useState('blood-pressure');
  const [recordValue, setRecordValue] = useState('');
  const [records, setRecords] = useState<MedicalRecord[]>([]);

  const handleAddRecord = async () => {
    if (!recordValue) return;

    try {
      const encrypted = await encrypt(parseInt(recordValue), 'uint32');

      const newRecord: MedicalRecord = {
        id: Date.now(),
        recordType,
        value: recordValue,
        encryptedData: encrypted,
        timestamp: new Date().toISOString(),
      };

      setRecords([newRecord, ...records]);
      setRecordValue('');
    } catch (error) {
      console.error('Failed to add record:', error);
    }
  };

  const recordTypeLabels: Record<string, string> = {
    'blood-pressure': 'Blood Pressure',
    'heart-rate': 'Heart Rate',
    'glucose': 'Glucose Level',
    'temperature': 'Temperature',
  };

  return (
    <Card title="Medical Records Example" subtitle="Privacy-preserving health data management">
      <div className="space-y-6">
        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <h4 className="font-semibold text-sm text-green-900 mb-3">Add Medical Record</h4>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Record Type
              </label>
              <select
                value={recordType}
                onChange={(e) => setRecordType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                disabled={!isReady}
              >
                <option value="blood-pressure">Blood Pressure (mmHg)</option>
                <option value="heart-rate">Heart Rate (bpm)</option>
                <option value="glucose">Glucose Level (mg/dL)</option>
                <option value="temperature">Temperature (°F)</option>
              </select>
            </div>

            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Enter value"
                value={recordValue}
                onChange={(e) => setRecordValue(e.target.value)}
                disabled={!isReady}
              />
              <Button
                onClick={handleAddRecord}
                disabled={!isReady || !recordValue}
                isLoading={isEncrypting}
                variant="success"
              >
                Add Record
              </Button>
            </div>
          </div>
        </div>

        {records.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-3">
              Encrypted Medical Records ({records.length})
            </h4>
            <div className="space-y-3">
              {records.map((record) => (
                <div key={record.id} className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="font-semibold text-gray-900">
                        {recordTypeLabels[record.recordType]}
                      </h5>
                      <p className="text-sm text-gray-500">
                        Recorded: {new Date(record.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold">
                      Encrypted
                    </span>
                  </div>
                  <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-100">
                    <p className="text-xs font-mono text-gray-600 break-all">
                      {JSON.stringify(record.encryptedData).substring(0, 80)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {records.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No medical records yet. Add your first encrypted record above.
          </div>
        )}
      </div>
    </Card>
  );
};
