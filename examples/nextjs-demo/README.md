# Next.js FHEVM Demo

A comprehensive demonstration of the FHEVM SDK integrated with Next.js 14+ App Router, showcasing all core functionality with real-world examples and a complete production-ready structure.

## Features Demonstrated

### Core Functionality
- ✅ **FHEVM SDK Integration** - Full SDK initialization and state management
- ✅ **Client-side Encryption** - Interactive encryption demo with multiple data types
- ✅ **Homomorphic Computation** - Compute on encrypted data without decryption
- ✅ **Key Management** - Public key fetching and refresh functionality
- ✅ **API Routes** - Server-side FHE operations with dedicated endpoints

### UI Components
- ✅ **Reusable Components** - Button, Input, Card components
- ✅ **FHE Provider** - React context for SDK state management
- ✅ **Custom Hooks** - Simplified integration with useFHE, useEncryption, useComputation
- ✅ **Real-time Status** - Connection indicators and error handling
- ✅ **Responsive Design** - Beautiful, modern UI with Tailwind CSS

### Real-World Examples
- ✅ **Banking Example** - Private financial transactions with encrypted balances
- ✅ **Medical Records** - Privacy-preserving health data management
- ✅ **Complete TypeScript Support** - Full type safety throughout

## Quick Start

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to view the demo.

## What This Demo Shows

### 1. SDK Initialization
The demo automatically initializes the FHEVM SDK on page load:
- Connects to Sepolia testnet
- Shows real-time connection status
- Handles errors gracefully

### 2. Encryption Workflow
Interactive demonstration of:
- Input validation
- Client-side encryption
- Viewing encrypted data structure
- Type-safe operations

### 3. User Experience
Best practices for UX:
- Loading states
- Disabled states when SDK not ready
- Clear error messages
- Immediate visual feedback

## Code Highlights

### Using the SDK Hooks

```typescript
const { fhevm, isReady, error } = useFhevm({
  chainId: 11155111,
  network: 'sepolia'
});

const { encrypt, isEncrypting } = useEncrypt(fhevm);
const { decrypt, isDecrypting } = useDecrypt(fhevm);
```

### Encryption Example

```typescript
const encrypted = await encrypt(42, 'uint32');
```

### Decryption Example

```typescript
const decrypted = await decrypt(ciphertext, contractAddress, userAddress);
```

## Project Structure

```
nextjs-demo/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── api/                    # API routes
│   │   │   ├── fhe/                # FHE operations
│   │   │   │   ├── route.ts        # Main FHE endpoint
│   │   │   │   ├── encrypt/route.ts # Encryption API
│   │   │   │   ├── decrypt/route.ts # Decryption API
│   │   │   │   └── compute/route.ts # Homomorphic computation
│   │   │   └── keys/route.ts       # Key management
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Main demo page
│   │   └── globals.css             # Global styles
│   │
│   ├── components/                 # React components
│   │   ├── ui/                     # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Card.tsx
│   │   ├── fhe/                    # FHE functionality components
│   │   │   ├── FHEProvider.tsx     # FHE context provider
│   │   │   ├── EncryptionDemo.tsx  # Encryption demonstration
│   │   │   ├── ComputationDemo.tsx # Homomorphic computation demo
│   │   │   └── KeyManager.tsx      # Key management UI
│   │   └── examples/               # Real-world use cases
│   │       ├── BankingExample.tsx  # Private banking demo
│   │       └── MedicalExample.tsx  # Medical records demo
│   │
│   ├── lib/                        # Utility libraries
│   │   ├── fhe/                    # FHE integration layer
│   │   │   ├── client.ts           # Client-side operations
│   │   │   ├── server.ts           # Server-side operations
│   │   │   ├── keys.ts             # Key management
│   │   │   └── types.ts            # FHE type definitions
│   │   └── utils/                  # Helper functions
│   │       ├── security.ts         # Security utilities
│   │       └── validation.ts       # Input validation
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useFHE.ts               # Main FHE hook
│   │   ├── useEncryption.ts        # Encryption hook
│   │   └── useComputation.ts       # Computation hook
│   │
│   ├── types/                      # TypeScript definitions
│   │   ├── fhe.ts                  # FHE types
│   │   └── api.ts                  # API types
│   │
│   └── styles/                     # Additional styles
│       └── globals.css
│
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama FHEVM](https://docs.zama.ai/fhevm)

## Building for Production

```bash
npm run build
npm run start
```

## License

MIT
