import { initContract } from '@ts-rest/core';
import {
  StoreRatingSchema,
  CreateStoreRatingSchema,
  GetStoreRatingsOptionsSchema,
  GetStoreRatingsResponseSchema,
  UpdateStoreRatingSchema,
} from '../schemas';
import { z } from 'zod';

const prefix = `/api/v1/store-ratings`;

export const storeRating = initContract().router({
  create: {
    method: 'POST',
    path: `${prefix}`,
    responses: {
      201: StoreRatingSchema,
    },
    body: CreateStoreRatingSchema,
    summary: 'Create a store rating',
  },
  get: {
    method: 'GET',
    path: `${prefix}/:id`,
    responses: {
      200: StoreRatingSchema,
    },
    summary: 'Get a store rating by id',
  },
  getAll: {
    method: 'GET',
    path: `${prefix}`,
    query: GetStoreRatingsOptionsSchema,
    responses: {
      200: GetStoreRatingsResponseSchema,
    },
    summary: 'Get a paginated list of store ratings',
  },
  update: {
    method: 'PATCH',
    path: `${prefix}`,
    body: UpdateStoreRatingSchema,
    responses: {
      201: StoreRatingSchema,
    },
    summary: 'Update store rating',
  },
  delete: {
    method: 'DELETE',
    path: `${prefix}/:id`,
    body: z.any().optional(),
    responses: {
      204: z.any().optional(),
    },
    summary: 'Delete store rating',
  },
});
