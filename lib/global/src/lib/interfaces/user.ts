import { z } from 'zod';
import {
  CreateUserSchema,
  GetUsersResponseSchema,
  TokenUserSchema,
  UpdateUserSchema,
  UpdateUserRoleSchema,
  UserSchema,
} from '../schemas';

export type User = z.infer<typeof UserSchema>;

export type CreateUser = z.infer<typeof CreateUserSchema>;

export type UpdateUser = z.infer<typeof UpdateUserSchema>;

export type CreateUserForm = {
  firstName?: string;
  lastName?: string;
};

export type UpdateUserRole = z.infer<typeof UpdateUserRoleSchema>;

export type GetUsersResponse = z.infer<typeof GetUsersResponseSchema>;

export type TokenUser = z.infer<typeof TokenUserSchema>;
