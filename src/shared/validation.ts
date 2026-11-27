import { z } from 'zod';

export const universityEmail = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email().max(254))
  .refine(
    (email) => email.split('@')[1] === 'diu.edu.bd',
    'A @diu.edu.bd email address is required',
  );

export const registrationPassword = z
  .string()
  .min(12, 'Password must be at least 12 characters')
  .refine(
    (password) => Buffer.byteLength(password, 'utf8') <= 72,
    'Password must be at most 72 UTF-8 bytes',
  );

export const registrationInput = z.strictObject({
  email: universityEmail,
  password: registrationPassword,
});
