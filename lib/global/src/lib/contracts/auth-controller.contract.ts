import { initContract } from '@ts-rest/core';
import {
  ChangePasswordSchema,
  LoginResponseSchema,
  LoginSchema,
  RegisterSchema,
  TokenUserSchema,
  UserSchema,
  VerifyQuerySchema,
} from '../schemas';

const prefix = `/api/v1/auth`;

export const auth = initContract().router({
  register: {
    method: 'POST',
    path: `${prefix}/register`,
    body: RegisterSchema,
    responses: {
      201: UserSchema,
    },
    summary: 'Register user',
  },
  login: {
    method: 'POST',
    path: `${prefix}/login`,
    body: LoginSchema,
    responses: {
      201: LoginResponseSchema,
    },
    summary: 'Login user',
  },
  verify: {
    method: 'GET',
    path: `${prefix}/verify`,
    responses: {
      200: TokenUserSchema,
    },
    summary: "Get current user's details",
  },
  changePassword: {
    method: 'POST',
    path: `${prefix}/change-password`,
    body: ChangePasswordSchema,
    responses: {
      201: UserSchema,
    },
    summary: "Change user's password",
  },
  verifyEmail: {
    method: 'GET',
    path: `${prefix}/verify-email`,
    query: VerifyQuerySchema,
    responses: {
      200: String,
    },
    summary: "Verify user's email",
  },
  resendVerifyEmail: {
    method: 'POST',
    path: `${prefix}/resend-verify-email`,
    body: {},
    responses: {
      201: LoginResponseSchema,
    },
    summary: "Resend user's email verification",
  },
});
