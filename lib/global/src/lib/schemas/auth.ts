import { z } from 'zod';
import { PaginationResponseSchema } from './pagination';
import { CreateUserSchema, UserSchema } from './user';

const base = {
  email: z.string().email(),
  password: z.string(),
};

export const AuthSchema = z.object({
  id: z.string(),
  ...base,
});

export const CreateAuthSchema = z.object(base);

export const RegisterSchema = CreateUserSchema.merge(CreateAuthSchema);

export const LoginSchema = z.object(base);

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  user: UserSchema,
});

export const VerifyQuerySchema = z.object({
  accessToken: z.string(),
});

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
