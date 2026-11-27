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
