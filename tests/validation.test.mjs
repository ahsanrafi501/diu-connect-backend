import assert from 'node:assert/strict';
import { test } from 'node:test';
import { registrationInput, universityEmail } from '../dist/shared/validation.js';

test('DIU account emails are normalized before use', () => {
  assert.equal(universityEmail.parse('  Student@DIU.EDU.BD  '), 'student@diu.edu.bd');
});

test('only valid addresses on the exact DIU domain are accepted', () => {
  for (const email of [
    'student@gmail.com',
    'student@sub.diu.edu.bd',
    'student@diu.edu.bd.example.com',
    'student@@diu.edu.bd',
    '@diu.edu.bd',
    'student',
    null,
  ]) {
    assert.equal(universityEmail.safeParse(email).success, false, String(email));
  }
});

test('registration normalizes email and preserves the password exactly', () => {
  const password = ' Long password ';
  assert.deepEqual(registrationInput.parse({ email: ' Student@DIU.EDU.BD ', password }), {
    email: 'student@diu.edu.bd',
    password,
  });
});

test('registration rejects short passwords, passwords over the bcrypt byte limit, and extra fields', () => {
  const email = 'student@diu.edu.bd';
  assert.equal(registrationInput.safeParse({ email, password: 'é'.repeat(36) }).success, true);
  for (const password of ['short', 'a'.repeat(73), 'é'.repeat(37)]) {
    assert.equal(registrationInput.safeParse({ email, password }).success, false);
  }
  assert.equal(
    registrationInput.safeParse({ email, password: 'long password', role: 'ADMIN' }).success,
    false,
  );
});
