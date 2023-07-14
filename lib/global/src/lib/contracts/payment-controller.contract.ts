import { initContract } from '@ts-rest/core';
import {
  PaymentSchema,
  CreatePaymentSchema,
  GetPaymentsOptionsSchema,
  GetPaymentsResponseSchema,
  UpdatePaymentSchema,
} from '../schemas';
import { z } from 'zod';

const prefix = `/api/v1/payments`;

export const payment = initContract().router({
  create: {
    method: 'POST',
    path: `${prefix}`,
    responses: {
      201: PaymentSchema,
    },
    body: CreatePaymentSchema,
    summary: 'Create a payment',
  },
  get: {
    method: 'GET',
    path: `${prefix}/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    responses: {
      200: PaymentSchema,
    },
    summary: 'Get a payment by id',
  },
  getAll: {
    method: 'GET',
    path: `${prefix}`,
    query: GetPaymentsOptionsSchema,
    responses: {
      200: GetPaymentsResponseSchema,
    },
    summary: 'Get a paginated list of payments',
  },
  update: {
    method: 'PATCH',
    path: `${prefix}/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    body: UpdatePaymentSchema,
    responses: {
      201: PaymentSchema,
    },
    summary: 'Update payment',
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
    summary: 'Delete payment',
  },
});
