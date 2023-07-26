import { z } from 'zod';
import {
  ChangePasswordSchema,
  ForgotPasswordSchema,
  LoginResponseSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from '../schemas';

export type Register = z.infer<typeof RegisterSchema>;

export type Login = z.infer<typeof LoginSchema>;
export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;
export type ResetPassword = z.infer<typeof ResetPasswordSchema>;

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export type ChangePassword = z.infer<typeof ChangePasswordSchema>;
