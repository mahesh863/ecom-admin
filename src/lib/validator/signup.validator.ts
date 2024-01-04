import { z } from 'zod';

export const signUpCredentialsValidator = z.object({
  email: z.string().email(),
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export type TSignUpCredentialsValidator = z.infer<
  typeof signUpCredentialsValidator
>;
