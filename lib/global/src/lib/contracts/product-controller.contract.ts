import { initContract } from '@ts-rest/core';
import {
  ProductSchema,
  CreateProductSchema,
  GetProductsOptionsSchema,
  GetProductsResponseSchema,
  UpdateProductSchema,
} from '../schemas';
import { z } from 'zod';

const prefix = `/api/v1/products`;

export const product = initContract().router({
  create: {
    method: 'POST',
    path: `${prefix}`,
    contentType: 'multipart/form-data',
    responses: {
      201: ProductSchema,
    },
    body: CreateProductSchema,
    summary: 'Create a product',
  },
  get: {
    method: 'GET',
    path: `${prefix}/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    responses: {
      200: ProductSchema,
    },
    summary: 'Get a product by id',
  },
  getAll: {
    method: 'GET',
    path: `${prefix}`,
    query: GetProductsOptionsSchema,
    responses: {
      200: GetProductsResponseSchema,
    },
    summary: 'Get a paginated list of products',
  },
  update: {
    method: 'PATCH',
    path: `${prefix}/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    contentType: 'multipart/form-data',
    body: UpdateProductSchema,
    responses: {
      201: ProductSchema,
    },
    summary: 'Update product',
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
    summary: 'Delete product',
  },
});
