# 📦 Import Guide - Housing Assessment Example

## Importing from Original Project

This guide explains how to import the Housing Quality Assessment dApp as an example for the FHEVM SDK.

---

## 📁 Files to Import

### Essential Files (from D:\)

#### Smart Contracts
```
contracts/
└── AnonymousHousingQualityAssessment.sol
```

#### Frontend Core
```
src/
├── config/
│   ├── contracts.ts          # Contract address + ABI
│   └── wagmi.ts               # Modified to use SDK
├── components/
│   ├── ConnectWallet.tsx
│   ├── SubmitAssessment.tsx
│   └── ViewReports.tsx
├── hooks/
│   └── useContract.ts         # Modified to use SDK
└── utils/
    └── gasLimits.ts
```

#### Configuration
```
.env.example                   # Environment template
hardhat.config.cts             # Hardhat configuration
tsconfig.json                  # TypeScript config
package.json                   # Dependencies (modified)
```

---

## 🔄 Modifications Required

### 1. Remove Project-Specific Names

**Replace**:
- ❌ Any hardcoded paths

### 2. Update Package.json

**Original**:
```json
{
  "name": "privacy-housing-assessment",
  "dependencies": {
    "fhevmjs": "^0.5.0",
    "ethers": "^6.11.1",
    // ... many dependencies
  }
}
```

**Modified** (use SDK):
```json
{
  "name": "housing-assessment-example",
  "dependencies": {
    "@fhevm/sdk": "^1.0.0",
    "@fhevm/sdk-react": "^1.0.0",
    // ... minimal dependencies
  }
}
```

### 3. Update Imports

**Before**:
```typescript
import { createInstance } from "fhevmjs";
import { Contract } from "ethers";

// Manual setup...
const fhevm = await createInstance({
  chainId: 11155111,
  // ... complex config
});
```

**After** (using SDK):
```typescript
import { useFhevm, useEncrypt } from '@fhevm/sdk/react';

// Simple hook
const { fhevm, isReady } = useFhevm({
  chainId: 11155111,
  network: 'sepolia'
});
```

---

## 📝 Import Steps

### Step 1: Create Example Directory

```bash
cd fhevm-react-template
mkdir -p examples/nextjs-housing-assessment
cd examples/nextjs-housing-assessment
```

### Step 2: Copy Essential Files

```bash
# Smart contracts
cp -r "D:\\contracts" ./

# Frontend components (selective)
mkdir -p src/{components,hooks,utils,config}

# Copy key components
cp "D:\\src\components\SubmitAssessment.tsx" ./src/components/
cp "D:\\src\components\ViewReports.tsx" ./src/components/

# Copy utilities
cp "D:\\src\utils\gasLimits.ts" ./src/utils/

# Configuration
cp "D:\\hardhat.config.cts" ./
cp "D:\\.env.example" ./
```

### Step 3: Clean File Contents

Run cleanup to remove project-specific names:

```bash
# Find and replace in all files
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.json" | \
  xargs sed -i 's/housing-assessment/g'

find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.json" | \
  xargs sed -i 's/fhevm-examples/g'
```

### Step 4: Update to Use SDK

Modify `src/hooks/useContract.ts`:

**Before**:
```typescript
import { createInstance } from "fhevmjs";

export function useContract() {
  const [fhevm, setFhevm] = useState(null);

  useEffect(() => {
    createInstance({
      chainId: 11155111,
      gatewayUrl: process.env.GATEWAY_URL,
      // ... many more options
    }).then(setFhevm);
  }, []);

  return { fhevm };
}
```

**After** (using SDK):
```typescript
import { useFhevm } from '@fhevm/sdk/react';

export function useContract() {
  const { fhevm, isReady, error } = useFhevm({
    chainId: 11155111,
    network: 'sepolia'
  });

  return { fhevm, isReady, error };
}
```

### Step 5: Update package.json

Create new `package.json`:

```json
{
  "name": "housing-assessment-example",
  "version": "1.0.0",
  "description": "Privacy-preserving housing quality assessment using FHEVM SDK",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "compile": "hardhat compile",
    "deploy:sepolia": "hardhat run scripts/deploy.cjs --network sepolia"
  },
  "dependencies": {
    "@fhevm/sdk": "^1.0.0",
    "@rainbow-me/rainbowkit": "^2.1.0",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-toast": "^1.1.5",
    "@tanstack/react-query": "^5.28.0",
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.4.1",
    "viem": "^2.9.0",
    "wagmi": "^2.5.0"
  },
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^5.0.0",
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.0",
    "hardhat": "^2.22.0",
    "typescript": "^5.3.0"
  }
}
```

---

## 🎯 Key Changes Summary

| Aspect | Original | Example Version |
|--------|----------|-----------------|
| **Name** | `privacy-housing-assessment` | `housing-assessment-example` |
| **Dependencies** | 20+ packages | 10 core packages + SDK |
| **Setup Lines** | ~50 lines | <10 lines |
| **FHEVM Code** | Manual `fhevmjs` usage | SDK hooks/functions |
| **File Size** | Full project | Essential files only |

---

## 📋 Files NOT to Import

### Exclude These:

```
❌ node_modules/
❌ .next/
❌ dist/
❌ cache/
❌ artifacts/
❌ coverage/
❌ .env (keep .env.example only)
❌ deployment-info.json
❌ All documentation files
❌ GitHub workflows (create new ones)
❌ git history
```

---

## ✅ Verification Checklist

After import, verify:


- [ ] All imports use `@fhevm/sdk`
- [ ] Contract compiles successfully
- [ ] Frontend builds without errors
- [ ] Environment variables documented
- [ ] README updated for example
- [ ] Demo works end-to-end

---

## 🔍 Final Structure

```
examples/nextjs-housing-assessment/
├── contracts/
│   └── AnonymousHousingQualityAssessment.sol
├── src/
│   ├── components/
│   │   ├── ConnectWallet.tsx
│   │   ├── SubmitAssessment.tsx
│   │   └── ViewReports.tsx
│   ├── hooks/
│   │   └── useContract.ts (modified for SDK)
│   ├── utils/
│   │   └── gasLimits.ts
│   └── config/
│       ├── contracts.ts
│       └── wagmi.ts (using SDK)
├── hardhat.config.cts
├── package.json (minimal dependencies)
├── .env.example
├── README.md (example-specific)
└── tsconfig.json
```

---

## 📚 Example README Template

Create `examples/nextjs-housing-assessment/README.md`:

```markdown
# 🏠 Housing Quality Assessment Example

> Privacy-preserving housing quality assessment built with @fhevm/sdk

## Features

- ✅ Encrypted quality scores
- ✅ Privacy-preserving assessments
- ✅ Selective disclosure
- ✅ Real-world use case

## Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## Using the SDK

\`\`\`typescript
import { useFhevm, useEncrypt } from '@fhevm/sdk/react';

const { fhevm } = useFhevm({ chainId: 11155111, network: 'sepolia' });
const { encrypt } = useEncrypt(fhevm);
\`\`\`

## Live Demo

[View Live Demo](https://housing-assessment-demo.vercel.app)
```

---

## 🎬 Next Steps

1. Complete the import following this guide
2. Test the example thoroughly
3. Update README with SDK-specific instructions
4. Deploy to Vercel
5. Create video demo showing SDK integration
6. Document any SDK-specific optimizations

---

**This example showcases how easy FHEVM development becomes with the Universal SDK!** 🚀
