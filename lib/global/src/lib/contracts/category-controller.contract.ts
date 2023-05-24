import { initContract } from '@ts-rest/core';
import {
  CategorySchema,
  CreateCategorySchema,
  GetCategoriesOptionsSchema,
  GetCategoriesResponseSchema,
  UpdateCategorySchema,
} from '../schemas';
import { z } from 'zod';

const prefix = `/api/v1/categories`;

export const category = initContract().router({
  create: {
    method: 'POST',
    path: `${prefix}`,
    responses: {
      201: CategorySchema,
    },
    body: CreateCategorySchema,
    summary: 'Create a category',
  },
  get: {
    method: 'GET',
    path: `${prefix}/:id`,
    responses: {
      200: CategorySchema,
    },
    summary: 'Get a category by id',
  },
  getAll: {
    method: 'GET',
    path: `${prefix}`,
    query: GetCategoriesOptionsSchema,
    responses: {
      200: GetCategoriesResponseSchema,
    },
    summary: 'Get a paginated list of categories',
  },
  update: {
    method: 'PATCH',
    path: `${prefix}/:id`,
    body: UpdateCategorySchema,
    responses: {
      201: CategorySchema,
    },
    summary: 'Update category',
  },
  delete: {
    method: 'DELETE',
    path: `${prefix}/:id`,
    body: z.any().optional(),
    responses: {
      204: z.any().optional(),
    },
    summary: 'Delete category',
  },
});
