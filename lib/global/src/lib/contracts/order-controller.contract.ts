import { initContract } from '@ts-rest/core';
import {
  OrderSchema,
  CreateOrderSchema,
  GetOrdersOptionsSchema,
  GetOrdersResponseSchema,
  UpdateOrderSchema,
} from '../schemas';
import { z } from 'zod';

const prefix = `/api/v1/orders`;

export const order = initContract().router({
  create: {
    method: 'POST',
    path: `${prefix}`,
    responses: {
      201: OrderSchema,
    },
    body: CreateOrderSchema,
    summary: 'Create a order',
  },
  get: {
    method: 'GET',
    path: `${prefix}/:id`,
    responses: {
      200: OrderSchema,
    },
    summary: 'Get a order by id',
  },
  getAll: {
    method: 'GET',
    path: `${prefix}`,
    query: GetOrdersOptionsSchema,
    responses: {
      200: GetOrdersResponseSchema,
    },
    summary: 'Get a paginated list of orders',
  },
  update: {
    method: 'PATCH',
    path: `${prefix}/:id`,
    body: UpdateOrderSchema,
    responses: {
      201: OrderSchema,
    },
    summary: 'Update order',
  },
  delete: {
    method: 'DELETE',
    path: `${prefix}/:id`,
    body: z.any().optional(),
    responses: {
      204: z.any().optional(),
    },
    summary: 'Delete order',
  },
});
