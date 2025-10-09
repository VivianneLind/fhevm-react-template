# 🎥 Video Demo Script

## Video Demo Guide for FHEVM SDK

**Target Duration**: 3-5 minutes
**Format**: Screen recording with voice-over

---

## 📝 Script Outline

### Opening (15 seconds)

**Visual**: Show README title screen

**Narration**:
> "Hi! I'm presenting the Universal FHEVM SDK - a framework-agnostic toolkit for building confidential frontends with Fully Homomorphic Encryption."

---

### Section 1: The Problem (30 seconds)

**Visual**: Show code comparison - before/after

**Narration**:
> "Building confidential dApps with FHEVM traditionally requires juggling multiple dependencies, complex setup, and framework-specific code. Developers need an easier way."

**Show on screen**:
```
❌ Before: 50+ lines of boilerplate
✅ After: <10 lines to start
```

---

### Section 2: The Solution (45 seconds)

**Visual**: Show README features section

**Narration**:
> "The Universal FHEVM SDK solves this with five key features:
> 1. Framework Agnostic - works with React, Vue, Node.js, or any frontend
> 2. Unified Dependencies - one package wraps everything you need
> 3. Wagmi-like Structure - intuitive for web3 developers
> 4. Quick Setup - less than 10 lines of code
> 5. Type-Safe - full TypeScript support"

---

### Section 3: Quick Start Demo (60 seconds)

**Visual**: Live coding in VS Code

**Narration**:
> "Let me show you how easy it is to get started."

**Type this code** (with syntax highlighting):

```typescript
// Step 1: Import the SDK
import { createFhevmInstance, encryptInput } from '@fhevm/sdk';

// Step 2: Initialize (one line!)
const fhevm = await createFhevmInstance({
  chainId: 11155111,
  network: 'sepolia'
});

// Step 3: Encrypt data
const encrypted = await encryptInput(fhevm, 42);

// Step 4: Use it
await contract.submitEncrypted(encrypted);
```

**Narration**:
> "That's it! Four simple steps, and you have full FHEVM encryption working."

---

### Section 4: React Integration (45 seconds)

**Visual**: Show React code example

**Narration**:
> "For React developers, we provide custom hooks that make it even easier."

**Show code**:
```typescript
import { useFhevm, useEncrypt } from '@fhevm/sdk/react';

function MyComponent() {
  const { fhevm, isReady } = useFhevm({
    chainId: 11155111,
    network: 'sepolia'
  });

  const { encrypt } = useEncrypt(fhevm);

  const handleSubmit = async (value) => {
    const encrypted = await encrypt(value);
    await contract.submit(encrypted);
  };

  return <button onClick={() => handleSubmit(42)}>Submit</button>;
}
```

**Narration**:
> "Notice how clean this is? No useEffect, no manual cleanup, just simple hooks that work."

---

### Section 5: Real-World Example (60 seconds)

**Visual**: Navigate to Housing Assessment example

**Narration**:
> "Let me show you a real-world application - our Privacy-Preserving Housing Quality Assessment system."

**Demo the UI**:
1. Connect wallet
2. Register as assessor
3. Submit encrypted assessment
4. Show encrypted scores in MetaMask

**Narration**:
> "This application uses the SDK to encrypt quality scores before submission. The blockchain stores encrypted data, maintaining privacy while ensuring transparency. Only authorized parties can decrypt the scores."

**Show in terminal**:
```bash
✅ Assessment submitted
📊 Encrypted scores: [euint32, euint32, euint32, euint32]
🔒 Privacy preserved on-chain
```

---

### Section 6: Architecture Overview (30 seconds)

**Visual**: Show architecture diagram from README

**Narration**:
> "The SDK architecture is clean and modular. Your application talks to our unified SDK, which handles all the complexity of fhevmjs, viem, and encryption under the hood."

**Highlight layers**:
- Application Layer
- SDK Layer (Core API, React Hooks, Utils)
- Dependencies Layer

---

### Section 7: Framework Flexibility (30 seconds)

**Visual**: Show side-by-side code examples

**Narration**:
> "The same SDK works across different frameworks. Here's the identical encryption logic in React, Vue, and Node.js - same API, same simplicity."

**Flash screens showing**:
- React example
- Vue example
- Node.js example

---

### Section 8: Documentation & Resources (20 seconds)

**Visual**: Scroll through documentation

**Narration**:
> "We provide comprehensive documentation including a getting started guide, full API reference, integration guides for each framework, and multiple real-world examples."

---

### Closing (20 seconds)

**Visual**: Show GitHub repo and live demos

**Narration**:
> "The Universal FHEVM SDK makes confidential frontend development accessible to everyone. Check out the code on GitHub, try our live demos, and start building privacy-preserving dApps today. Thank you!"

**Show on screen**:
```
🔗 GitHub: github.com/your-username/fhevm-react-template
🌐 Live Demo: housing-assessment-demo.vercel.app
📚 Docs: Full documentation included
```

---

## 🎬 Recording Tips

### Setup
1. Use 1920x1080 resolution
2. Clear browser cache and close unnecessary tabs
3. Prepare code examples in advance
4. Test audio levels

### During Recording
- Speak clearly and at a moderate pace
- Pause between sections
- Use mouse to highlight important code
- Show real transactions on Sepolia testnet

### Editing
- Add captions for key points
- Include smooth transitions between sections
- Add background music (soft, non-distracting)
- Export in 1080p, 30fps

---

## 📋 Checklist Before Recording

- [ ] Install and build SDK
- [ ] Set up example project
- [ ] Deploy contracts to Sepolia
- [ ] Get test ETH
- [ ] Prepare MetaMask account
- [ ] Clear browser history
- [ ] Test microphone
- [ ] Prepare code snippets
- [ ] Review script 2-3 times
- [ ] Set up screen recording software

---

## 🎯 Key Messages to Emphasize

1. **Simplicity**: "<10 lines of code to start"
2. **Flexibility**: "Works with any framework"
3. **Complete**: "Covers the full FHEVM workflow"
4. **Production Ready**: "Battle-tested with real applications"
5. **Developer Friendly**: "Wagmi-like structure web3 devs know"

---

## 📹 Recording Tools

**Recommended**:
- OBS Studio (free, professional)
- Loom (easy, quick)
- Camtasia (paid, full-featured)

**Audio**:
- Audacity for voice editing
- Blue Yeti or similar USB mic
- Noise cancellation enabled

---

## ✅ Post-Production

1. **Edit**:
   - Remove long pauses
   - Add title cards
   - Include code highlights
   - Show terminal outputs clearly

2. **Add Graphics**:
   - Arrows pointing to important code
   - Boxes highlighting key features
   - Text overlays for emphasis

3. **Export**:
   - Format: MP4
   - Resolution: 1920x1080
   - Frame rate: 30fps
   - Bitrate: High quality

4. **Upload**:
   - Save as `demo.mp4` in root directory
   - Also upload to YouTube (unlisted)
   - Add to README

---

## 🎨 Branding

**Colors to use**:
- Primary: #0066FF (FHEVM blue)
- Secondary: #00D4AA (Highlight green)
- Background: #1E1E1E (Dark theme)

**Fonts**:
- Code: Fira Code, JetBrains Mono
- UI: Inter, SF Pro

---

Good luck with your recording! 🎬
