import { initContract } from '@ts-rest/core';
import {
  RoleSchema,
  CreateRoleSchema,
  GetRolesOptionsSchema,
  GetRolesResponseSchema,
  UpdateRoleSchema,
  UpdateRolePermissionsSchema,
} from '../schemas';
import { z } from 'zod';

const prefix = `/api/v1/roles`;

export const role = initContract().router({
  create: {
    method: 'POST',
    path: `${prefix}`,
    responses: {
      201: RoleSchema,
    },
    body: CreateRoleSchema,
    summary: 'Create a role',
  },
  get: {
    method: 'GET',
    path: `${prefix}/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    responses: {
      200: RoleSchema,
    },
    summary: 'Get a role by id',
  },
  getAll: {
    method: 'GET',
    path: `${prefix}`,
    query: GetRolesOptionsSchema,
    responses: {
      200: GetRolesResponseSchema,
    },
    summary: 'Get a paginated list of roles',
  },
  update: {
    method: 'PATCH',
    path: `${prefix}/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    body: UpdateRoleSchema,
    responses: {
      201: RoleSchema,
    },
    summary: 'Update role',
  },
  delete: {
    method: 'DELETE',
    path: `${prefix}/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    body: z.any().optional(),
    responses: {
      204: z.any().optional(),
    },
    summary: 'Delete role',
  },
  updatePermissions: {
    method: 'PATCH',
    path: `${prefix}/:id/permissions`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    body: UpdateRolePermissionsSchema,
    responses: {
      201: RoleSchema,
    },
    summary: 'Update role permissions',
  },
});
