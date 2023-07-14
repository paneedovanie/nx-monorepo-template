import { initContract } from '@ts-rest/core';
import {
  PermissionSchema,
  GetPermissionsResponseSchema,
  GetPermissionsOptionsSchema,
} from '../schemas';
import { z } from 'zod';

const prefix = `/api/v1/permissions`;

export const permission = initContract().router({
  get: {
    method: 'GET',
    path: `${prefix}/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    responses: {
      200: PermissionSchema,
    },
    summary: 'Get a permission by id',
  },
  getAll: {
    method: 'GET',
    path: `${prefix}`,
    query: GetPermissionsOptionsSchema,
    responses: {
      200: GetPermissionsResponseSchema,
    },
    summary: 'Get a paginated list of permissions',
  },
});
