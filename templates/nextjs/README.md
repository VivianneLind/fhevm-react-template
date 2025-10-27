# Next.js FHEVM Template

A complete Next.js template with FHEVM SDK integration for building privacy-preserving decentralized applications.

## Features

- ✅ Full FHEVM SDK integration
- ✅ React hooks for encryption/decryption
- ✅ API routes for server-side FHE operations
- ✅ Example components (Banking, Medical records)
- ✅ Type-safe with TypeScript
- ✅ Tailwind CSS for styling
- ✅ Ready-to-deploy

## Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   └── api/                    # API routes
│       ├── fhe/
│       │   ├── route.ts         # FHE operations route
│       │   ├── encrypt/route.ts # Encryption API
│       │   ├── decrypt/route.ts # Decryption API
│       │   └── compute/route.ts # Homomorphic computation API
│       └── keys/route.ts       # Key management API
│
├── components/                 # React components
│   ├── ui/                     # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── fhe/                    # FHE functionality components
│   │   ├── FHEProvider.tsx     # FHE context provider
│   │   ├── EncryptionDemo.tsx  # Encryption demo
│   │   ├── ComputationDemo.tsx # Computation demo
│   │   └── KeyManager.tsx      # Key management
│   └── examples/               # Use case examples
│       ├── BankingExample.tsx  # Banking use case
│       └── MedicalExample.tsx  # Medical use case
│
├── lib/                        # Utility libraries
│   ├── fhe/                    # FHE integration lib
│   │   ├── client.ts           # Client-side FHE operations
│   │   ├── server.ts           # Server-side FHE operations
│   │   ├── keys.ts             # Key management
│   │   └── types.ts            # Type definitions
│   └── utils/                  # Utility functions
│       ├── security.ts         # Security utilities
│       └── validation.ts       # Validation utilities
│
├── hooks/                      # Custom hooks
│   ├── useFHE.ts               # Comprehensive FHE hook
│   ├── useEncryption.ts        # Encryption hook
│   └── useComputation.ts       # Computation hook
│
├── types/                      # TypeScript types
│   ├── fhe.ts                  # FHE-related types
│   └── api.ts                  # API type definitions
│
└── styles/                     # Styles
    └── globals.css
```

## Getting Started

### 1. Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Configuration

Copy the `.env.example` file to `.env.local` and update the values:

```bash
cp .env.example .env.local
```

Update the environment variables:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_NETWORK=sepolia
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai
```

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

### Basic Encryption

```typescript
import { useFHE } from '@/hooks/useFHE';

function MyComponent() {
  const { encrypt, isReady } = useFHE();

  const handleEncrypt = async () => {
    const encrypted = await encrypt(42, 'uint32');
    console.log('Encrypted:', encrypted);
  };

  return (
    <button onClick={handleEncrypt} disabled={!isReady}>
      Encrypt Value
    </button>
  );
}
```

### Using the FHE Provider

```typescript
import { FHEProvider } from '@/components/fhe/FHEProvider';
import { EncryptionDemo } from '@/components/fhe/EncryptionDemo';

export default function App() {
  return (
    <FHEProvider>
      <EncryptionDemo />
    </FHEProvider>
  );
}
```

### Server-Side Operations

```typescript
// app/api/custom/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { value } = await request.json();

  // Process with FHEVM
  return NextResponse.json({ success: true });
}
```

## Examples

This template includes several example implementations:

1. **Encryption Demo** - Basic encryption/decryption workflow
2. **Computation Demo** - Homomorphic computation
3. **Banking Example** - Confidential token transfers
4. **Medical Example** - Privacy-preserving medical records

## Building for Production

```bash
npm run build
npm run start
```

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama FHEVM](https://docs.zama.ai/fhevm)

## License

MIT
