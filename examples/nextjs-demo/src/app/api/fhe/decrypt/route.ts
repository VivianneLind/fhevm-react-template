import { NextRequest, NextResponse } from 'next/server';
import { createFhevmInstance, decryptOutput } from '@fhevm/sdk';

/**
 * Decryption API Endpoint
 * Decrypts FHE encrypted data
 */
export async function POST(request: NextRequest) {
  try {
    const { ciphertext, contractAddress, userAddress } = await request.json();

    if (!ciphertext || !contractAddress || !userAddress) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Initialize FHEVM instance
    const fhevm = await createFhevmInstance({
      chainId: 11155111,
      network: 'sepolia',
    });

    // Decrypt the output
    const decrypted = await decryptOutput(
      fhevm,
      ciphertext,
      contractAddress,
      userAddress
    );

    return NextResponse.json({
      success: true,
      decrypted,
      metadata: {
        timestamp: Date.now(),
      },
    });
  } catch (error) {
    console.error('Decryption error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Decryption failed'
      },
      { status: 500 }
    );
  }
}
