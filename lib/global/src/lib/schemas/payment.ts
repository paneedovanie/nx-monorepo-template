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

export const MayaItem = z.object({
  amount: z.object({ value: z.number() }),
  totalAmount: z.object({
    details: z
      .object({
        tax: z.number(),
        shippingFee: z.number(),
        serviceCharge: z.number(),
        discount: z.number(),
        subtotal: z.number(),
      })
      .optional(),
    value: z.number(),
  }),
  name: z.string(),
  quantity: z.number(),
  code: z.string().optional(),
  description: z.string().optional(),
});

export const CreatePaymentLink = z.object({
  orderId: z.string().uuid(),
});

export const CreateMayaCheckoutSchema = z.object({
  totalAmount: z.object({ value: z.number(), currency: z.string() }),
  requestReferenceNumber: z.string(),
  items: MayaItem.array().optional(),
  redirectUrl: z
    .object({
      success: z.string().optional(),
      failure: z.string().optional(),
      cancel: z.string().optional(),
    })
    .optional(),
});

export const MayaCheckoutSchema = z.object({
  checkoutId: z.string(),
  redirectUrl: z.string(),
});
