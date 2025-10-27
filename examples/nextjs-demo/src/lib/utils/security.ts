/**
 * Security Utilities
 * Helper functions for secure FHE operations
 */

/**
 * Sanitize user input before encryption
 */
export function sanitizeInput(value: any): number | bigint {
  if (typeof value === 'number') {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error('Invalid numeric input');
    }
    return Math.floor(value);
  }

  if (typeof value === 'bigint') {
    if (value < 0n) {
      throw new Error('Invalid bigint input');
    }
    return value;
  }

  if (typeof value === 'string') {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed) || parsed < 0) {
      throw new Error('Invalid string input');
    }
    return parsed;
  }

  throw new Error('Unsupported input type');
}

/**
 * Validate Ethereum address format
 */
export function validateAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate chain ID
 */
export function validateChainId(chainId: number): boolean {
  return Number.isInteger(chainId) && chainId > 0;
}

/**
 * Rate limiting helper
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  constructor(
    private maxRequests: number = 10,
    private windowMs: number = 60000
  ) {}

  canMakeRequest(identifier: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];

    // Remove old requests outside the window
    const recentRequests = userRequests.filter(
      (timestamp) => now - timestamp < this.windowMs
    );

    if (recentRequests.length >= this.maxRequests) {
      return false;
    }

    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);
    return true;
  }

  reset(identifier: string): void {
    this.requests.delete(identifier);
  }
}

/**
 * Secure random number generator
 */
export function generateSecureRandom(min: number, max: number): number {
  const range = max - min;
  const randomBuffer = new Uint32Array(1);
  crypto.getRandomValues(randomBuffer);
  return min + (randomBuffer[0] % range);
}
