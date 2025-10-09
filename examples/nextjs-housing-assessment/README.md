# 🏠 Housing Quality Assessment Example

> Privacy-preserving housing quality assessment built with @fhevm/sdk

This example demonstrates how to use the **Universal FHEVM SDK** to build a real-world application with fully homomorphic encryption (FHE). Assessors can submit encrypted quality scores that remain private on-chain while still enabling verification and reporting.

## Features

- ✅ **Encrypted Quality Scores** - Structural, safety, utility, and location scores encrypted on-chain
- ✅ **Privacy-Preserving Assessments** - Assessor scores remain confidential
- ✅ **Selective Disclosure** - Only authorized parties can decrypt scores
- ✅ **Role-Based Access** - Owner certifies assessors, assessors submit encrypted evaluations
- ✅ **Real-World Use Case** - Practical example for housing quality evaluation

## Architecture

```
┌─────────────────┐
│   Frontend      │
│  (Next.js App)  │
└────────┬────────┘
         │
         │ Uses @fhevm/sdk
         ▼
┌─────────────────┐      ┌──────────────────────┐
│  FHEVM SDK      │──────│  Smart Contract      │
│  - Encryption   │      │  AnonymousHousing... │
│  - Decryption   │      │  (on Sepolia)        │
│  - React Hooks  │      └──────────────────────┘
└─────────────────┘
```

## Quick Start

### Prerequisites

- Node.js 18+
- MetaMask or compatible Web3 wallet
- Sepolia testnet ETH ([Get from faucet](https://sepoliafaucet.com/))

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your values:
# - NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
# - PRIVATE_KEY (for deployment)
# - ETHERSCAN_API_KEY (for verification)
```

### Compile Contract

```bash
npm run compile
```

### Deploy to Sepolia

```bash
npm run deploy:sepolia
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Using the SDK

This example showcases the **Universal FHEVM SDK** in action:

### Simple Encryption (Without SDK)

**Before** - Manual setup with fhevmjs:

```typescript
import { createInstance } from 'fhevmjs';

// 50+ lines of setup code...
const fhevm = await createInstance({
  chainId: 11155111,
  gatewayUrl: process.env.GATEWAY_URL,
  aclAddress: process.env.ACL_ADDRESS,
  // ... many more options
});

const input = await fhevm.encrypt8(value);
```

**After** - Using @fhevm/sdk:

```typescript
import { useFhevm, useEncrypt } from '@fhevm/sdk/react';

const { fhevm, isReady } = useFhevm({
  chainId: 11155111,
  network: 'sepolia'
});

const { encrypt } = useEncrypt(fhevm);
const encrypted = await encrypt(value);
```

**Result**: From 50+ lines to <10 lines! 🎉

### Component Example

See `src/components/SubmitAssessment.tsx` for a complete example:

```typescript
'use client';

import { useFhevm, useEncrypt } from '@fhevm/sdk/react';
import { useWriteContract } from 'wagmi';

export function SubmitAssessment() {
  // Initialize FHEVM with SDK
  const { fhevm, isReady } = useFhevm({
    chainId: 11155111,
    network: 'sepolia'
  });

  // Encrypt scores
  const { encrypt } = useEncrypt(fhevm);

  const handleSubmit = async (scores) => {
    // Encryption is automatic!
    const encrypted = await encrypt(scores.structural);

    // Submit to contract
    await writeContract({
      address: CONTRACT_ADDRESS,
      functionName: 'submitQualityAssessment',
      args: [encrypted, ...otherScores]
    });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## Smart Contract

**Location**: `contracts/AnonymousHousingQualityAssessment.sol`

### Key Functions

1. **registerAssessor()** - Register as an assessor
2. **certifyAssessor(address)** - Owner certifies an assessor
3. **submitQualityAssessment(...)** - Submit encrypted scores
4. **verifyAssessment(uint32)** - Owner verifies assessment
5. **getQualityReport(uint32)** - View public quality report

### Workflow

```
1. User registers as assessor
   ↓
2. Owner certifies assessor
   ↓
3. Certified assessor submits encrypted scores
   ↓
4. Owner verifies assessment
   ↓
5. Public quality report generated
```

## Project Structure

```
housing-assessment-example/
├── contracts/
│   └── AnonymousHousingQualityAssessment.sol  # Smart contract
├── src/
│   ├── components/
│   │   └── SubmitAssessment.tsx               # Assessment form
│   ├── config/
│   │   ├── contracts.ts                       # Contract ABI & address
│   │   └── wagmi.ts                           # Wagmi configuration
│   └── utils/
│       └── gasLimits.ts                       # Gas limit utilities
├── hardhat.config.cts                         # Hardhat config
├── package.json                               # Dependencies
└── .env.example                               # Environment template
```

## SDK Integration Points

This example demonstrates these SDK features:

### Core Functions

- ✅ `createFhevmInstance()` - Initialize FHEVM client
- ✅ `encryptInput()` - Encrypt data before submission
- ✅ `decryptOutput()` - Decrypt results (authorized users only)

### React Hooks

- ✅ `useFhevm()` - Main FHEVM hook with loading states
- ✅ `useEncrypt()` - Encryption hook with error handling
- ✅ `useDecrypt()` - Decryption hook for viewing results

### Utilities

- ✅ Gas limit helpers (Sepolia has 16.7M cap)
- ✅ Type-safe contract interactions
- ✅ Multi-RPC endpoint failover

## Configuration

### Environment Variables

```bash
# Required for frontend
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_CONTRACT_ADDRESS=0x43E296E1AE4071F5C2c802e67Cce7A42f2A1fFFc

# Required for deployment
PRIVATE_KEY=your_private_key_without_0x
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
ETHERSCAN_API_KEY=your_etherscan_key
```

### Gas Limits

Sepolia has a gas limit cap of **16,777,216**. This example uses safe gas limits:

```typescript
// src/utils/gasLimits.ts
export const GAS_LIMITS = {
  REGISTER_ASSESSOR: 150_000,
  CERTIFY_ASSESSOR: 100_000,
  SUBMIT_ASSESSMENT: 500_000,
  VERIFY_ASSESSMENT: 200_000,
};
```

## Testing

```bash
# Run tests
npm test

# With gas reporting
REPORT_GAS=true npm test

# With coverage
npm run test:coverage
```

## Deployment

The contract is already deployed on Sepolia:

- **Contract Address**: `0x43E296E1AE4071F5C2c802e67Cce7A42f2A1fFFc`
- **Network**: Sepolia Testnet
- **Explorer**: [View on Etherscan](https://sepolia.etherscan.io/address/0x43E296E1AE4071F5C2c802e67Cce7A42f2A1fFFc)

To deploy your own instance:

```bash
npm run deploy:sepolia
```

## Live Demo

🌐 **Coming Soon** - Will be deployed to Vercel

## Learn More

- [FHEVM SDK Documentation](../../README.md)
- [API Reference](../../docs/api-reference.md)
- [React Integration Guide](../../docs/react-integration.md)
- [Zama FHEVM Docs](https://docs.zama.ai/fhevm)

## Key Takeaways

### What Makes This Special

1. **Privacy First** - All scores encrypted on-chain, only decryptable by authorized parties
2. **Simple Integration** - SDK reduces code from 100+ lines to <20 lines
3. **Production Ready** - Real smart contract deployed on Sepolia
4. **Best Practices** - Gas optimization, error handling, type safety

### SDK Benefits Demonstrated

- ✅ **Framework Agnostic** - Same SDK works in React, Vue, Node.js
- ✅ **Unified Dependencies** - One package instead of 10+
- ✅ **Wagmi-like API** - Familiar patterns for Web3 developers
- ✅ **Quick Setup** - <10 lines to get started
- ✅ **Complete Workflow** - Init, encrypt, submit, decrypt

## Troubleshooting

### Common Issues

**MetaMask shows gas limit too high**
- Solution: Uses pre-configured safe gas limits in `gasLimits.ts`

**RPC timeout errors**
- Solution: Multi-endpoint configuration in `wagmi.ts` with automatic failover

**Assessment submission fails**
- Check: Are you a certified assessor? Only certified users can submit

**Contract not found**
- Verify: Contract address in `.env` matches deployment

## Contributing

Found an issue or want to improve this example?

1. Open an issue in the main repository
2. Submit a pull request with improvements
3. Share feedback on the SDK design

## License

MIT

---

<div align="center">

**Built with ❤️ using the Universal FHEVM SDK**

[View SDK Documentation](../../README.md) • [More Examples](../)

</div>
