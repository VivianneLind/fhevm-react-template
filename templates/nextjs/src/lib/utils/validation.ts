/**
 * Validation utilities for FHE operations
 */

import { FHEDataType } from '@/lib/fhe/types';

/**
 * Validate value range for different FHE types
 */
export function validateValueRange(value: number | bigint, type: FHEDataType): boolean {
  const ranges = {
    uint8: { min: 0, max: 255 },
    uint16: { min: 0, max: 65535 },
    uint32: { min: 0, max: 4294967295 },
    uint64: { min: 0, max: BigInt('18446744073709551615') },
  };

  if (type === 'bool') {
    return typeof value === 'boolean';
  }

  if (type === 'address') {
    return typeof value === 'string' && /^0x[a-fA-F0-9]{40}$/.test(value);
  }

  const range = ranges[type as keyof typeof ranges];
  if (!range) return false;

  const numValue = typeof value === 'bigint' ? value : BigInt(value);
  return numValue >= BigInt(range.min) && numValue <= BigInt(range.max);
}

/**
 * Validate FHE operation inputs
 */
export function validateOperationInputs(
  operation: string,
  operands: any[]
): { valid: boolean; error?: string } {
  if (!operands || operands.length === 0) {
    return { valid: false, error: 'No operands provided' };
  }

  const binaryOps = ['add', 'sub', 'mul', 'div', 'eq', 'ne', 'lt', 'lte', 'gt', 'gte'];
  if (binaryOps.includes(operation) && operands.length !== 2) {
    return { valid: false, error: `${operation} requires exactly 2 operands` };
  }

  return { valid: true };
}
