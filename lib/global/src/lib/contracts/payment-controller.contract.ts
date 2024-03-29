import { initContract } from '@ts-rest/core';
import {
  PaymentSchema,
  CreatePaymentSchema,
  GetPaymentsOptionsSchema,
  GetPaymentsResponseSchema,
  UpdatePaymentSchema,
  MayaCheckoutSchema,
  CreatePaymentLink,
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
  receipt: {
    method: 'GET',
    path: `${prefix}/:id/receipt`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    responses: {
      200: z.object({ file: z.string() }),
    },
    summary: 'Get a payment receipt',
  },
  createPaymentLink: {
    method: 'POST',
    path: `${prefix}/payment-link`,
    body: CreatePaymentLink,
    responses: {
      201: MayaCheckoutSchema,
    },
    summary: 'Create payment link',
  },
  successPaymentRedirect: {
    method: 'GET',
    path: `${prefix}/success-payment-redirect/:orderId`,
    pathParams: z.object({
      orderId: z.string().uuid(),
    }),
    responses: {
      200: z.null(),
    },
    summary: 'Success redirect url',
  },
});
