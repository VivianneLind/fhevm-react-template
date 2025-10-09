'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contracts';
import { GAS_LIMITS } from '../utils/gasLimits';

export function SubmitAssessment() {
  const { address } = useAccount();
  const [structuralScore, setStructuralScore] = useState(85);
  const [safetyScore, setSafetyScore] = useState(90);
  const [utilityScore, setUtilityScore] = useState(80);
  const [locationScore, setLocationScore] = useState(75);
  const [propertyId, setPropertyId] = useState('PROP-001');

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address) {
      alert('Please connect your wallet');
      return;
    }

    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'submitQualityAssessment',
        args: [
          structuralScore,
          safetyScore,
          utilityScore,
          locationScore,
          propertyId,
        ],
        gas: BigInt(GAS_LIMITS.SUBMIT_ASSESSMENT),
      });
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Failed to submit assessment. See console for details.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Submit Quality Assessment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Property ID
          </label>
          <input
            type="text"
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter property identifier"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Structural Score: {structuralScore}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={structuralScore}
            onChange={(e) => setStructuralScore(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Safety Score: {safetyScore}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={safetyScore}
            onChange={(e) => setSafetyScore(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Utility Score: {utilityScore}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={utilityScore}
            onChange={(e) => setUtilityScore(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Location Score: {locationScore}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={locationScore}
            onChange={(e) => setLocationScore(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={isPending || isConfirming}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Submitting...' : 'Submit Assessment'}
        </button>

        {isSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Assessment submitted successfully!
          </div>
        )}
      </form>
    </div>
  );
}
