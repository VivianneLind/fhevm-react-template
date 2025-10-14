# 🤝 Contributing to Universal FHEVM SDK

Thank you for your interest in contributing to the Universal FHEVM SDK! This document provides guidelines and instructions for contributing.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)

---

## 🌟 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

### Expected Behavior

- ✅ Use welcoming and inclusive language
- ✅ Be respectful of differing viewpoints
- ✅ Accept constructive criticism gracefully
- ✅ Focus on what's best for the community
- ✅ Show empathy towards other community members

### Unacceptable Behavior

- ❌ Harassment or discriminatory language
- ❌ Personal or political attacks
- ❌ Publishing others' private information
- ❌ Any conduct which could be considered inappropriate

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js** >= 18.0.0
- **npm** or **yarn** package manager
- **Git** for version control
- Basic knowledge of **TypeScript** and **React**

### Setting Up the Development Environment

1. **Fork the Repository**

   Visit [GitHub repository](https://github.com/zama-ai/fhevm-react-template) and click "Fork"

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/fhevm-react-template.git
   cd fhevm-react-template
   ```

3. **Install Dependencies**

   ```bash
   # Install SDK dependencies
   cd packages/fhevm-sdk
   npm install

   # Install example dependencies
   cd ../../examples/privacy-housing-assessment
   npm install
   ```

4. **Set Up Environment Variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Build the SDK**

   ```bash
   cd packages/fhevm-sdk
   npm run build
   ```

---

## 🔄 Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch (feature integration)
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates

### Creating a Feature Branch

```bash
# Create and checkout a new branch
git checkout -b feature/your-feature-name

# Make your changes
# ...

# Commit your changes
git add .
git commit -m "feat: add your feature description"

# Push to your fork
git push origin feature/your-feature-name
```

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(sdk): add support for uint128 encryption
fix(hooks): resolve useEncrypt memory leak
docs(api): update encryption type documentation
test(core): add unit tests for decryption
```

---

## 📝 Coding Standards

### TypeScript Guidelines

1. **Use TypeScript Strict Mode**
   ```typescript
   // tsconfig.json
   {
     "compilerOptions": {
       "strict": true,
       "noUnusedLocals": true,
       "noUnusedParameters": true
     }
   }
   ```

2. **Prefer Explicit Types**
   ```typescript
   // ✅ Good
   function encrypt(value: number, type: EncryptionType): Promise<EncryptedValue> {
     // ...
   }

   // ❌ Avoid
   function encrypt(value: any, type: any): any {
     // ...
   }
   ```

3. **Use Interfaces for Object Types**
   ```typescript
   // ✅ Good
   interface FhevmConfig {
     chainId: number;
     network?: string;
   }

   // ❌ Avoid
   type FhevmConfig = {
     chainId: number;
     network?: string;
   }
   ```

### Code Style

1. **Use 2 Spaces for Indentation**

2. **Use Single Quotes for Strings**
   ```typescript
   // ✅ Good
   const message = 'Hello, FHEVM!';

   // ❌ Avoid
   const message = "Hello, FHEVM!";
   ```

3. **Use Semicolons**
   ```typescript
   // ✅ Good
   const value = 42;

   // ❌ Avoid
   const value = 42
   ```

4. **Use Arrow Functions**
   ```typescript
   // ✅ Good
   const encrypt = async (value: number) => {
     // ...
   };

   // ❌ Avoid
   const encrypt = async function(value: number) {
     // ...
   };
   ```

### React Component Guidelines

1. **Use Functional Components**
   ```typescript
   // ✅ Good
   function MyComponent({ fhevm }: { fhevm: FhevmInstance }) {
     return <div>...</div>;
   }

   // ❌ Avoid
   class MyComponent extends React.Component {
     // ...
   }
   ```

2. **Use Hooks for State Management**
   ```typescript
   const [value, setValue] = useState<number>(0);
   const { fhevm, isReady } = useFhevm(config);
   ```

3. **Memoize Expensive Computations**
   ```typescript
   const config = useMemo(() => ({
     chainId: 11155111,
     network: 'sepolia'
   }), []);
   ```

### Documentation Standards

1. **Add JSDoc Comments to Public APIs**
   ```typescript
   /**
    * Encrypts a value for use in FHEVM smart contracts
    *
    * @param fhevm - FHEVM instance
    * @param value - Value to encrypt
    * @param type - Encryption type (optional)
    * @returns Promise resolving to encrypted value
    *
    * @example
    * ```typescript
    * const encrypted = await encryptInput(fhevm, 42, 'uint32');
    * ```
    */
   export async function encryptInput(
     fhevm: FhevmInstance,
     value: number,
     type?: EncryptionType
   ): Promise<EncryptedValue> {
     // ...
   }
   ```

2. **Add Inline Comments for Complex Logic**
   ```typescript
   // Calculate the optimal gas limit based on transaction size
   const gasLimit = Math.min(estimatedGas * 1.2, MAX_GAS_LIMIT);
   ```

---

## 📤 Submitting Changes

### Before Submitting

1. **Run Type Check**
   ```bash
   npm run typecheck
   ```

2. **Run Linter**
   ```bash
   npm run lint
   ```

3. **Run Tests**
   ```bash
   npm test
   ```

4. **Build the SDK**
   ```bash
   npm run build
   ```

5. **Test in Example Applications**
   ```bash
   cd examples/privacy-housing-assessment
   npm run dev
   ```

### Creating a Pull Request

1. **Push Your Changes**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open Pull Request**

   Go to the original repository and click "New Pull Request"

3. **Fill Out PR Template**

   ```markdown
   ## Description
   Brief description of your changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Code refactoring

   ## Testing
   - [ ] Unit tests pass
   - [ ] Integration tests pass
   - [ ] Manual testing completed

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Documentation updated
   - [ ] No breaking changes (or documented)
   ```

4. **Respond to Review Feedback**

   Address reviewer comments promptly and professionally

---

## 🐛 Reporting Bugs

### Before Reporting

1. **Search Existing Issues**
   - Check if the bug has already been reported

2. **Verify It's a Bug**
   - Ensure it's not a configuration issue
   - Try to reproduce in a clean environment

### Bug Report Template

```markdown
## Bug Description
Clear and concise description of the bug

## Steps to Reproduce
1. Initialize FHEVM with config X
2. Call encryptInput with value Y
3. Observe error Z

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g., Windows 11]
- Node.js: [e.g., 18.17.0]
- SDK Version: [e.g., 1.0.0]
- Browser: [e.g., Chrome 120]

## Additional Context
- Error messages
- Screenshots
- Code snippets
```

---

## 💡 Requesting Features

### Feature Request Template

```markdown
## Feature Description
Clear and concise description of the feature

## Use Case
Why is this feature needed?

## Proposed Solution
How should this feature work?

## Alternatives Considered
Other approaches you've thought about

## Additional Context
- Code examples
- Mockups
- References
```

---

## 🧪 Testing Guidelines

### Writing Tests

1. **Unit Tests for Core Functions**
   ```typescript
   describe('encryptInput', () => {
     it('should encrypt uint32 values', async () => {
       const fhevm = await createFhevmInstance(mockConfig);
       const encrypted = await encryptInput(fhevm, 42, 'uint32');
       expect(encrypted).toBeDefined();
       expect(encrypted.data).toBeInstanceOf(Uint8Array);
     });
   });
   ```

2. **Integration Tests for Hooks**
   ```typescript
   import { renderHook, act } from '@testing-library/react-hooks';
   import { useFhevm } from './useFhevm';

   test('useFhevm should initialize correctly', async () => {
     const { result, waitForNextUpdate } = renderHook(() =>
       useFhevm({ chainId: 11155111, network: 'sepolia' })
     );

     await waitForNextUpdate();

     expect(result.current.isReady).toBe(true);
     expect(result.current.fhevm).toBeDefined();
   });
   ```

---

## 📚 Documentation

### Contributing to Documentation

1. **Update API Documentation**
   - Located in `docs/api-reference.md`
   - Include examples for all functions

2. **Update Guides**
   - `docs/getting-started.md` - For beginners
   - `docs/react-integration.md` - For React users

3. **Update Examples**
   - Add comprehensive README for new examples
   - Include step-by-step instructions

---

## 🏗️ Project Structure

```
fhevm-react-template/
├── packages/
│   └── fhevm-sdk/              # SDK package
│       ├── src/
│       │   ├── core/           # Core functionality
│       │   ├── react/          # React hooks
│       │   ├── config/         # Configuration
│       │   ├── utils/          # Utilities
│       │   └── types/          # Type definitions
│       ├── package.json
│       └── tsconfig.json
├── examples/
│   ├── nextjs-housing-assessment/      # Simple example
│   └── privacy-housing-assessment/     # Complete example
├── docs/                       # Documentation
└── README.md
```

---

## 🎯 Areas for Contribution

### High Priority

- 🔴 **Test Coverage** - Increase unit and integration test coverage
- 🔴 **Error Handling** - Improve error messages and recovery
- 🔴 **Performance** - Optimize encryption/decryption operations

### Medium Priority

- 🟡 **Documentation** - Add more examples and tutorials
- 🟡 **Framework Support** - Add Vue.js and Svelte examples
- 🟡 **Developer Tools** - Create debugging utilities

### Low Priority

- 🟢 **Code Style** - Refactor for better readability
- 🟢 **Examples** - Add more use cases
- 🟢 **Translations** - Translate documentation

---

## 🤔 Questions?

If you have any questions about contributing:

1. **Check Documentation** - Read the [docs](./docs/)
2. **Search Issues** - Someone may have asked already
3. **Ask in Discussions** - Start a [GitHub Discussion](https://github.com/zama-ai/fhevm-react-template/discussions)
4. **Join Discord** - [Zama Discord](https://discord.gg/zama)

---

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

<div align="center">

**Thank you for contributing to Universal FHEVM SDK! 🙏**

Every contribution, no matter how small, makes a difference.

[Report Bug](https://github.com/zama-ai/fhevm-react-template/issues) • [Request Feature](https://github.com/zama-ai/fhevm-react-template/issues) • [Documentation](./docs/)

</div>
