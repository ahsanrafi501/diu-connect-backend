import { compare, hash, truncates } from 'bcryptjs';

const COST_FACTOR = 12;

export async function hashPassword(password: string): Promise<string> {
  if (truncates(password)) {
    throw new RangeError('Password must be at most 72 UTF-8 bytes');
  }
  return hash(password, COST_FACTOR);
}

export async function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  if (truncates(password)) return false;
  return compare(password, passwordHash);
}
