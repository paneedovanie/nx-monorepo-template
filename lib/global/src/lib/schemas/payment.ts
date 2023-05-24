import { z } from 'zod';
import {
  PaginationOptionsSchema,
  PaginationResponseSchema,
} from './pagination';
import { OrderSchema } from './order';

const base = {
  type: z.string(),
  amountPaid: z.number(),
  totalCost: z.number(),
};

export const PaymentSchema = z.object({
  id: z.string(),
  order: z.lazy(() => OrderSchema),
  change: z.number(),
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
