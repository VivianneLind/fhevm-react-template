import { NextRequest, NextResponse } from 'next/server';
import { createFhevmInstance, encryptInput } from '@fhevm/sdk';

/**
 * Encryption API Endpoint
 * Encrypts data using FHE
 */
export async function POST(request: NextRequest) {
  try {
    const { value, type = 'uint32' } = await request.json();

    if (value === undefined || value === null) {
      return NextResponse.json(
        { error: 'Value is required' },
        { status: 400 }
      );
    }

    // Initialize FHEVM instance
    const fhevm = await createFhevmInstance({
      chainId: 11155111,
      network: 'sepolia',
    });

    // Encrypt the input
    const encrypted = await encryptInput(fhevm, value, type);

    return NextResponse.json({
      success: true,
      encrypted,
      metadata: {
        type,
        timestamp: Date.now(),
      },
    });
  } catch (error) {
    console.error('Encryption error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Encryption failed'
      },
      { status: 500 }
    );
  }
}
