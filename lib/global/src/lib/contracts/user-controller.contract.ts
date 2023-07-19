import { initContract } from '@ts-rest/core';
import {
  CreateUserSchema,
  GetUsersResponseSchema,
  PaginationOptionsSchema,
  UpdateUserRoleSchema,
  UpdateUserSchema,
  UserSchema,
} from '../schemas';
import { z } from 'zod';

const prefix = `/api/v1/users`;

export const user = initContract().router({
  createUser: {
    method: 'POST',
    path: `${prefix}`,
    responses: {
      201: UserSchema,
    },
    body: CreateUserSchema,
    summary: 'Create a user',
  },
  getUser: {
    method: 'GET',
    path: `${prefix}/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    responses: {
      200: UserSchema,
    },
    summary: 'Get a user by id',
  },
  getUsers: {
    method: 'GET',
    path: `${prefix}`,
    query: PaginationOptionsSchema,
    responses: {
      200: GetUsersResponseSchema,
    },
    summary: 'Get a paginated list of users',
  },
  updateUser: {
    method: 'PATCH',
    path: `${prefix}/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    body: UpdateUserSchema,
    responses: {
      201: UserSchema,
    },
    summary: 'Update user',
  },
  assignRole: {
    method: 'PATCH',
    path: `${prefix}/:id/assign-role`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    body: UpdateUserRoleSchema,
    responses: {
      201: UserSchema,
    },
    summary: 'Assign user role',
  },
  unassignRole: {
    method: 'PATCH',
    path: `${prefix}/:id/unassign-role`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    body: UpdateUserRoleSchema,
    responses: {
      201: UserSchema,
    },
    summary: 'Assign user role',
  },
  assignAsStoreOwner: {
    method: 'PATCH',
    path: `${prefix}/:id/assign-as-store-owner`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    body: z.any(),
    responses: {
      201: UserSchema,
    },
    summary: 'Assign user role',
  },
});
