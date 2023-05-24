import { z } from 'zod';
import {
  CreateTransactionSchema,
  GetTransactionsOptionsSchema,
  GetTransactionsResponseSchema,
  PaySchema,
  TransactionSchema,
} from '../schemas';

export type CreateTransaction = z.infer<typeof CreateTransactionSchema>;

export type Transaction = z.infer<typeof TransactionSchema>;

export type GetTransactionsResponse = z.infer<
  typeof GetTransactionsResponseSchema
>;

export type GetTransactionsOptions = z.infer<
  typeof GetTransactionsOptionsSchema
>;

export type Pay = z.infer<typeof PaySchema>;
