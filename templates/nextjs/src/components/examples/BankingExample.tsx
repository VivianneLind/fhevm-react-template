'use client';

import React, { useState } from 'react';
import { useEncrypt } from '@fhevm/sdk/react';
import { useFHEContext } from '@/components/fhe/FHEProvider';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const BankingExample: React.FC = () => {
  const { fhevm, isReady } = useFHEContext();
  const { encrypt, isEncrypting } = useEncrypt(fhevm);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleTransfer = async () => {
    if (!amount || !recipient) return;

    try {
      setStatus('Encrypting transfer amount...');
      const encryptedAmount = await encrypt(parseFloat(amount), 'uint64');

      setStatus('Processing confidential transfer...');
      // In a real implementation, this would call a smart contract
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStatus(`Successfully transferred ${amount} tokens to ${recipient}`);
      setAmount('');
      setRecipient('');
    } catch (error) {
      setStatus('Transfer failed');
      console.error(error);
    }
  };

  return (
    <Card title="Confidential Banking Transfer">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Transfer tokens privately using fully homomorphic encryption
        </p>

        <Input
          label="Recipient Address"
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="0x..."
          disabled={!isReady}
        />

        <Input
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          disabled={!isReady}
        />

        <Button
          onClick={handleTransfer}
          disabled={!isReady || isEncrypting || !amount || !recipient}
        >
          {isEncrypting ? 'Processing...' : 'Transfer Confidentially'}
        </Button>

        {status && (
          <div className={`p-3 rounded ${
            status.includes('Success') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {status}
          </div>
        )}
      </div>
    </Card>
  );
};
