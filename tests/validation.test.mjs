import assert from 'node:assert/strict';
import { test } from 'node:test';
import { universityEmail } from '../dist/shared/validation.js';

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
