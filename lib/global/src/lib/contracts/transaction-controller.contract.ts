import { initContract } from '@ts-rest/core';
import {
  CreateTransactionSchema,
  GetTransactionsOptionsSchema,
  GetTransactionsResponseSchema,
  PaginationOptionsSchema,
  PaySchema,
  TransactionSchema,
} from '../schemas';
import { z } from 'zod';

const prefix = `/api/v1/transactions`;

export const transaction = initContract().router({
  balance: {
    method: 'GET',
    path: `${prefix}/balance`,
    responses: {
      200: z.object({
        balance: z.number(),
      }),
    },
    summary: "Get user's balance",
  },
  generate: {
    method: 'POST',
    path: `${prefix}/generate`,
    body: CreateTransactionSchema,
    responses: {
      201: TransactionSchema,
    },
    summary: 'Generate amount',
  },
  transfer: {
    method: 'POST',
    path: `${prefix}/transfer`,
    body: CreateTransactionSchema,
    responses: {
      201: TransactionSchema,
    },
    summary: 'Transfer fund',
  },
  getAll: {
    method: 'GET',
    path: `${prefix}`,
    query: GetTransactionsOptionsSchema,
    responses: {
      200: GetTransactionsResponseSchema,
    },
    summary: 'Get a paginated list of transaction',
  },
  pay: {
    method: 'POST',
    path: `${prefix}/pay`,
    body: PaySchema,
    responses: {
      201: TransactionSchema,
    },
    summary: 'Pay an order',
  },
});
