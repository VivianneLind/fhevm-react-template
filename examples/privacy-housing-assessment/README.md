# 🏠 Privacy Housing Assessment - Complete Example

> Complete privacy-preserving housing quality assessment dApp built with **FHEVM SDK**

This is a full-featured example demonstrating how to build a production-ready confidential dApp using the Universal FHEVM SDK.

---

## 🎯 What This Example Demonstrates

### SDK Features Used:
- ✅ **FHEVM Instance Management** - Using `createFhevmInstance()`
- ✅ **React Hooks** - `useFhevm()`, `useEncrypt()`, `useDecrypt()`
- ✅ **Input Encryption** - Encrypting quality scores (uint8, uint32)
- ✅ **Output Decryption** - Decrypting assessment results
- ✅ **Permission Management** - Grant/revoke access to encrypted data
- ✅ **Batch Operations** - Encrypting multiple values efficiently
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Loading States** - UX-friendly loading indicators

### Application Features:
- 🔐 **Encrypted Quality Scores** - Structural, safety, utility, location ratings
- 🏆 **Certified Assessor Network** - Only verified assessors can submit
- 📊 **Homomorphic Computations** - Aggregate statistics without decryption
- 🔍 **Selective Disclosure** - Property owners control data access
- 📝 **Immutable Records** - Blockchain-based audit trail
- 💎 **Modern UI/UX** - Glassmorphism design with Tailwind CSS

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js >= 18.0.0
MetaMask or Web3 wallet
Sepolia testnet ETH
```

### Installation

```bash
# Navigate to this example
cd examples/privacy-housing-assessment

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your WalletConnect Project ID
# Get yours at: https://cloud.walletconnect.com
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📖 SDK Integration Examples

### 1. Initialize FHEVM with React Hook

```typescript
// src/components/SubmitAssessment.tsx
import { useFhevm, useEncrypt } from '@fhevm/sdk/react';

function SubmitAssessment() {
  const { fhevm, isReady, error } = useFhevm({
    chainId: 11155111,
    network: 'sepolia'
  });

  if (!isReady) return <div>Loading FHEVM...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <EncryptionForm fhevm={fhevm} />;
}
```

### 2. Encrypt Quality Scores

```typescript
function EncryptionForm({ fhevm }) {
  const { encrypt, isEncrypting } = useEncrypt(fhevm);
  const { writeContract } = useWriteContract();

  const handleSubmit = async (scores) => {
    // Encrypt all scores using SDK
    const encrypted = {
      structural: await encrypt(scores.structural, 'uint8'),
      safety: await encrypt(scores.safety, 'uint8'),
      utility: await encrypt(scores.utility, 'uint8'),
      location: await encrypt(scores.location, 'uint8'),
    };

    // Submit to contract
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'submitQualityAssessment',
      args: [
        encrypted.structural,
        encrypted.safety,
        encrypted.utility,
        encrypted.location,
        propertyId,
        inspectionNotes
      ]
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="structural" min="0" max="100" />
      <input type="number" name="safety" min="0" max="100" />
      <input type="number" name="utility" min="0" max="100" />
      <input type="number" name="location" min="0" max="100" />
      <button type="submit" disabled={isEncrypting}>
        {isEncrypting ? 'Encrypting...' : 'Submit Assessment'}
      </button>
    </form>
  );
}
```

### 3. Decrypt Assessment Results

```typescript
function ViewResults() {
  const { fhevm } = useFhevm({ chainId: 11155111, network: 'sepolia' });
  const { decrypt, isDecrypting } = useDecrypt(fhevm);
  const [results, setResults] = useState(null);

  const { data: encryptedResults } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getAssessment',
    args: [assessmentId]
  });

  useEffect(() => {
    if (encryptedResults && fhevm) {
      Promise.all([
        decrypt(encryptedResults.structural, CONTRACT_ADDRESS),
        decrypt(encryptedResults.safety, CONTRACT_ADDRESS),
        decrypt(encryptedResults.utility, CONTRACT_ADDRESS),
        decrypt(encryptedResults.location, CONTRACT_ADDRESS),
      ]).then(([structural, safety, utility, location]) => {
        setResults({ structural, safety, utility, location });
      });
    }
  }, [encryptedResults, fhevm]);

  if (isDecrypting) return <div>Decrypting...</div>;

  return (
    <div>
      <h3>Assessment Results</h3>
      <p>Structural: {results?.structural}/100</p>
      <p>Safety: {results?.safety}/100</p>
      <p>Utility: {results?.utility}/100</p>
      <p>Location: {results?.location}/100</p>
    </div>
  );
}
```

---

## 📁 Project Structure

```
privacy-housing-assessment/
├── src/
│   ├── components/
│   │   ├── AssessorManagement.tsx    # Assessor registration & certification
│   │   ├── SubmitAssessment.tsx      # Submit encrypted assessments (SDK integrated)
│   │   ├── ViewReports.tsx           # View & decrypt reports (SDK integrated)
│   │   ├── TransactionHistory.tsx    # Track transactions
│   │   └── ui/                       # Reusable UI components
│   ├── config/
│   │   ├── contracts.ts              # Contract ABI and address
│   │   └── wagmi.ts                  # Wagmi configuration
│   ├── utils/
│   │   └── gasLimits.ts             # Safe gas limits for Sepolia
│   ├── hooks/
│   │   └── use-toast.ts             # Toast notifications
│   ├── lib/
│   │   └── utils.ts                 # Utility functions
│   ├── App.tsx                       # Main app component
│   └── main.tsx                      # Entry point
├── contracts/
│   └── AnonymousHousingQualityAssessment.sol
├── package.json
├── README.md
├── .env.example
└── vite.config.ts
```

---

## 🔧 Configuration

### Environment Variables

```env
# Required: WalletConnect Project ID
VITE_WALLETCONNECT_PROJECT_ID=your_project_id

# Contract Address (Sepolia testnet)
VITE_CONTRACT_ADDRESS=0x43E296E1AE4071F5C2c802e67Cce7A42f2A1fFFc
```

### Wagmi Configuration

```typescript
// src/config/wagmi.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Privacy Housing Assessment',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  chains: [sepolia],
  ssr: false,
});
```

---

## 🎓 Key Learnings

### 1. SDK Simplifies FHEVM Integration

**Before (without SDK):**
```typescript
// Complex manual setup
import { initFhevm, createInstance } from 'fhevmjs';

await initFhevm();
const instance = await createInstance({
  chainId: 11155111,
  publicKey: '', // Need to fetch
  gatewayUrl: 'https://gateway.sepolia.zama.ai',
  aclAddress: '0x9D6891A6240D6130c54ae243d8005063D05fE14b',
});

const input = instance.createEncryptedInput(...);
input.add8(score);
const encrypted = input.encrypt();
```

**After (with SDK):**
```typescript
// Simple one-liner
import { createFhevmInstance, encryptInput } from '@fhevm/sdk';

const fhevm = await createFhevmInstance({
  chainId: 11155111,
  network: 'sepolia' // Pre-configured network
});

const encrypted = await encryptInput(fhevm, score, 'uint8');
```

### 2. React Hooks Make State Management Easy

```typescript
// Automatic loading states, error handling, and memoization
const { fhevm, isReady, error, reload } = useFhevm({
  chainId: 11155111,
  network: 'sepolia'
});

const { encrypt, isEncrypting } = useEncrypt(fhevm);
```

### 3. Type Safety Throughout

```typescript
import type { FhevmInstance, EncryptedValue } from '@fhevm/sdk';

const encrypted: EncryptedValue = await encryptInput(fhevm, 42, 'uint32');
```

---

## 🧪 Testing

```bash
# Type check
npm run typecheck

# Lint
npm run lint

# Build
npm run build
```

---

## 🌐 Deployment

### Sepolia Testnet

The example is already deployed and verified:

- **Contract**: `0x43E296E1AE4071F5C2c802e67Cce7A42f2A1fFFc`
- **Etherscan**: [View Contract](https://sepolia.etherscan.io/address/0x43E296E1AE4071F5C2c802e67Cce7A42f2A1fFFc)
- **Network**: Sepolia (Chain ID: 11155111)

### Deploy Your Own

```bash
# Install dependencies (if using Hardhat)
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Update VITE_CONTRACT_ADDRESS in .env
```

---

## 📚 Related Documentation

- [FHEVM SDK Documentation](../../docs/getting-started.md)
- [API Reference](../../docs/api-reference.md)
- [React Integration Guide](../../docs/react-integration.md)
- [Zama FHEVM Docs](https://docs.zama.ai/fhevm)

---

## 🤝 Contributing

This example is part of the Universal FHEVM SDK project. Contributions are welcome!

---

## 📄 License

MIT License - see [LICENSE](../../LICENSE) for details

---

<div align="center">

**Built with ❤️ using Universal FHEVM SDK**

[Main SDK](../../README.md) • [Documentation](../../docs/) • [Other Examples](../)

</div>
