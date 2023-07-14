import { initContract } from '@ts-rest/core';
import {
  StoreSchema,
  CreateStoreSchema,
  GetStoresOptionsSchema,
  GetStoresResponseSchema,
  UpdateStoreSchema,
} from '../schemas';
import { z } from 'zod';

const prefix = `/api/v1/stores`;

export const store = initContract().router({
  create: {
    method: 'POST',
    path: `${prefix}`,
    contentType: 'multipart/form-data',
    responses: {
      201: StoreSchema,
    },
    body: CreateStoreSchema,
    summary: 'Create a store',
  },
  get: {
    method: 'GET',
    path: `${prefix}/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    responses: {
      200: StoreSchema,
    },
    summary: 'Get a store by id',
  },
  getAll: {
    method: 'GET',
    path: `${prefix}`,
    query: GetStoresOptionsSchema,
    responses: {
      200: GetStoresResponseSchema,
    },
    summary: 'Get a paginated list of stores',
  },
  update: {
    method: 'PATCH',
    path: `${prefix}/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    contentType: 'multipart/form-data',
    body: UpdateStoreSchema,
    responses: {
      201: StoreSchema,
    },
    summary: 'Update store',
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
    summary: 'Delete store',
  },
});
