import { z } from 'zod';
import {
  ChangePasswordSchema,
  LoginResponseSchema,
  LoginSchema,
  RegisterSchema,
} from '../schemas';

export type Register = z.infer<typeof RegisterSchema>;

export type Login = z.infer<typeof LoginSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export type ChangePassword = z.infer<typeof ChangePasswordSchema>;
