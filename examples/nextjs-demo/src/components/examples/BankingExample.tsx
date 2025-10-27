'use client';

import React, { useState } from 'react';
import { useEncrypt } from '@fhevm/sdk/react';
import { useFHEContext } from '../fhe/FHEProvider';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const BankingExample: React.FC = () => {
  const { fhevm, isReady } = useFHEContext();
  const { encrypt, isEncrypting } = useEncrypt(fhevm);

  const [accountBalance, setAccountBalance] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [encryptedBalance, setEncryptedBalance] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  const handleEncryptBalance = async () => {
    if (!accountBalance) return;

    try {
      const encrypted = await encrypt(parseFloat(accountBalance), 'uint64');
      setEncryptedBalance(encrypted);
    } catch (error) {
      console.error('Failed to encrypt balance:', error);
    }
  };

  const handleTransfer = async () => {
    if (!transferAmount) return;

    try {
      const encryptedAmount = await encrypt(parseFloat(transferAmount), 'uint64');

      const newTransaction = {
        id: Date.now(),
        amount: transferAmount,
        encryptedAmount,
        timestamp: new Date().toISOString(),
        status: 'completed',
      };

      setTransactions([newTransaction, ...transactions]);
      setTransferAmount('');
    } catch (error) {
      console.error('Transfer failed:', error);
    }
  };

  return (
    <Card title="Banking Example" subtitle="Private financial transactions using FHE">
      <div className="space-y-6">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-sm text-blue-900 mb-3">Account Balance</h4>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter balance"
              value={accountBalance}
              onChange={(e) => setAccountBalance(e.target.value)}
              disabled={!isReady}
            />
            <Button
              onClick={handleEncryptBalance}
              disabled={!isReady || !accountBalance}
              isLoading={isEncrypting}
            >
              Encrypt
            </Button>
          </div>

          {encryptedBalance && (
            <div className="mt-3 p-3 bg-white rounded border border-blue-100">
              <p className="text-xs font-mono text-gray-600 break-all">
                Encrypted: {JSON.stringify(encryptedBalance).substring(0, 100)}...
              </p>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-sm text-gray-900 mb-3">Private Transfer</h4>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Transfer amount"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              disabled={!isReady}
            />
            <Button
              onClick={handleTransfer}
              disabled={!isReady || !transferAmount}
              variant="success"
            >
              Transfer
            </Button>
          </div>
        </div>

        {transactions.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-3">Transaction History</h4>
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Amount: ${tx.amount}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      tx.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(tx.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
