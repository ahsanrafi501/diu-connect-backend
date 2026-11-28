import assert from 'node:assert/strict';
import { test } from 'node:test';
import { hashPassword, verifyPassword } from '../dist/auth/password.js';

test('password hashes verify the original password and use a fresh salt', async () => {
  const password = 'a local test password';
  const first = await hashPassword(password);
  const second = await hashPassword(password);
  assert.notEqual(first, second);
  assert.equal(await verifyPassword(password, first), true);
  assert.equal(await verifyPassword('different password', first), false);
});

test('password hashing and verification reject input that bcrypt would truncate', async () => {
  const password = 'é'.repeat(36);
  const hash = await hashPassword(password);
  assert.equal(await verifyPassword(password, hash), true);
  assert.equal(await verifyPassword(password + 'x', hash), false);
  await assert.rejects(hashPassword(password + 'x'), RangeError);
});
