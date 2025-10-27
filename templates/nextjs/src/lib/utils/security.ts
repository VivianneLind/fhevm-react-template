/**
 * Security utilities for FHEVM operations
 */

/**
 * Validate Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate encrypted data format
 */
export function isValidCiphertext(ciphertext: string): boolean {
  return typeof ciphertext === 'string' && ciphertext.length > 0;
}

/**
 * Sanitize user input for FHE operations
 */
export function sanitizeInput(input: any, type: string): any {
  switch (type) {
    case 'uint8':
    case 'uint16':
    case 'uint32':
    case 'uint64':
      return Math.abs(parseInt(input));
    case 'bool':
      return Boolean(input);
    case 'address':
      if (!isValidAddress(input)) {
        throw new Error('Invalid Ethereum address');
      }
      return input.toLowerCase();
    default:
      return input;
  }
}

/**
 * Rate limiting helper for API calls
 */
export class RateLimiter {
  private timestamps: number[] = [];
  private maxRequests: number;
  private timeWindow: number;

  constructor(maxRequests: number = 10, timeWindowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindowMs;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(ts => now - ts < this.timeWindow);

    if (this.timestamps.length < this.maxRequests) {
      this.timestamps.push(now);
      return true;
    }

    return false;
  }
}
