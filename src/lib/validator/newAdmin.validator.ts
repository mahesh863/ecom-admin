import { z } from 'zod';

export const adminCredentialsValidator = z.object({
  email: z.string().email(),
  name: z.string().min(1, { message: "Name can't be empty" }),
  role: z.string().min(1, { message: "Role can't be empty" }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export type TAdminCredentialsValidator = z.infer<
  typeof adminCredentialsValidator
>;
