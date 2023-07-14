import { initContract } from '@ts-rest/core';
import {
  TagSchema,
  CreateTagSchema,
  GetTagsOptionsSchema,
  GetTagsResponseSchema,
  UpdateTagSchema,
} from '../schemas';
import { z } from 'zod';

const prefix = `/api/v1/tags`;

export const tag = initContract().router({
  create: {
    method: 'POST',
    path: `${prefix}`,
    responses: {
      201: TagSchema,
    },
    body: CreateTagSchema,
    summary: 'Create a tag',
  },
  get: {
    method: 'GET',
    path: `${prefix}/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    responses: {
      200: TagSchema,
    },
    summary: 'Get a tag by id',
  },
  getAll: {
    method: 'GET',
    path: `${prefix}`,
    query: GetTagsOptionsSchema,
    responses: {
      200: GetTagsResponseSchema,
    },
    summary: 'Get a paginated list of tags',
  },
  update: {
    method: 'PATCH',
    path: `${prefix}/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    body: UpdateTagSchema,
    responses: {
      201: TagSchema,
    },
    summary: 'Update tag',
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
    summary: 'Delete tag',
  },
});
