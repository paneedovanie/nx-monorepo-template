import { z } from 'zod';
import {
  PaginationOptionsSchema,
  PaginationResponseSchema,
} from './pagination';
import { OrderSchema } from './order';
import { CurrencySchema } from './common';

const base = {
  type: z.string(),
  amountPaid: CurrencySchema,
  totalCost: CurrencySchema,
};

export const NonCircularPaymentSchema = z.object({
  id: z.string(),
  type: z.string(),
  amountPaid: CurrencySchema,
  totalCost: CurrencySchema,
  change: CurrencySchema,
  createdAt: z.date(),
});

export const PaymentSchema = z.object({
  id: z.string(),
  order: z.lazy(() => OrderSchema),
  change: CurrencySchema,
  createdAt: z.date(),
  ...base,
});

export const CreatePaymentSchema = z
  .object({
    order: z.string(),
    ...base,
  })
  .refine((obj) => obj.amountPaid >= obj.totalCost, {
    message: 'Not enough amount',
    path: ['amountPaid'],
  });

export const UpdatePaymentSchema = z.object({
  ...base,
  order: z.string(),
});

export const GetPaymentsResponseSchema = PaginationResponseSchema.merge(
  z.object({ list: PaymentSchema.array() })
);

export const GetPaymentsOptionsSchema = PaginationOptionsSchema.merge(
  z.object({
    ids: z.string().array().optional(),
  })
);
