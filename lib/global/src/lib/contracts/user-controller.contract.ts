import { initContract } from '@ts-rest/core';
import {
  CreateUserSchema,
  GetUsersResponseSchema,
  PaginationOptionsSchema,
  UpdateUserRoleSchema,
  UpdateUserSchema,
  UserSchema,
} from '../schemas';

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
    body: UpdateUserSchema,
    responses: {
      201: UserSchema,
    },
    summary: 'Update user',
  },
  assignRole: {
    method: 'PATCH',
    path: `${prefix}/:id/assign-role`,
    body: UpdateUserRoleSchema,
    responses: {
      201: UserSchema,
    },
    summary: 'Assign user role',
  },
  unassignRole: {
    method: 'PATCH',
    path: `${prefix}/:id/unassign-role`,
    body: UpdateUserRoleSchema,
    responses: {
      201: UserSchema,
    },
    summary: 'Assign user role',
  },
});
