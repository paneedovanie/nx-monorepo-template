import { z } from 'zod';
import {
  PaginationOptionsSchema,
  PaginationResponseSchema,
} from './pagination';
import { UserSchema } from './user';
import { CurrencySchema } from './common';

const base = {
  receiver: z.string().length(13),
  amount: CurrencySchema,
};

export const TransactionSchema = z.object({
  id: z.string(),
  sender: UserSchema,
  receiver: UserSchema,
  amount: CurrencySchema,
});

export const CreateTransactionSchema = z.object(base);

export const GetTransactionsResponseSchema = PaginationResponseSchema.merge(
  z.object({
    list: TransactionSchema.merge(
      z.object({
        receiver: UserSchema.optional(),
        sender: UserSchema.optional(),
        createdAt: z.date(),
      })
    ).array(),
  })
);

export const GetTransactionsOptionsSchema = PaginationOptionsSchema.merge(
  z.object({
    ids: z.string().array().optional(),
    userIds: z.string().array().optional(),
  })
);

export const PaySchema = z.object({
  orderId: z.string(),
});
