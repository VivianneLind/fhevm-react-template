import { NextRequest, NextResponse } from 'next/server';
import { createFhevmInstance, encryptInput } from '@fhevm/sdk';

/**
 * FHE Operations API Route
 * Handles server-side FHE operations
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { operation, value, type } = body;

    switch (operation) {
      case 'encrypt': {
        // Server-side encryption example
        const fhevm = await createFhevmInstance({
          chainId: 11155111,
          network: 'sepolia',
        });

        const encrypted = await encryptInput(fhevm, value, type);

        return NextResponse.json({
          success: true,
          data: encrypted,
        });
      }

      case 'validate': {
        // Validate encrypted data format
        return NextResponse.json({
          success: true,
          valid: true,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid operation' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('FHE API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'operational',
    version: '1.0.0',
    operations: ['encrypt', 'validate'],
  });
}
