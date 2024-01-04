import { z } from 'zod';

export const signInCredentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Password cannot be empty' }),
});

export type TSignInCredentialsValidator = z.infer<
  typeof signInCredentialsValidator
>;
