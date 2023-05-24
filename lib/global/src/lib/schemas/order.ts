import { z } from 'zod';
import {
  PaginationOptionsSchema,
  PaginationResponseSchema,
} from './pagination';
import { StoreSchema } from './store';
import { UserSchema } from './user';

export const OrderProductSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  count: z.number(),
  image: z.string().optional(),
});

const base = {
  items: OrderProductSchema.array(),
  status: z.string(),
};

const OrderPaymentSchema = z.object({
  id: z.string(),
  // order: z.lazy(() => OrderSchema),
  type: z.string(),
  amountPaid: z.number(),
  totalCost: z.number(),
  change: z.number(),
});

export const OrderSchema = z.object({
  id: z.string(),
  ref: z.number(),
  store: StoreSchema,
  user: UserSchema,
  payment: OrderPaymentSchema,
  createdAt: z.date(),
  ...base,
});

export const CreateOrderSchema = z.object({
  store: z.string(),
  user: z.string(),
  ...base,
});

export const UpdateOrderSchema = z.object({
  store: z.string(),
  user: z.string(),
  ...base,
});

export const GetOrdersResponseSchema = PaginationResponseSchema.merge(
  z.object({ list: OrderSchema.array() })
);

export const GetOrdersOptionsSchema = PaginationOptionsSchema.merge(
  z.object({
    ids: z.string().array().optional(),
    storeIds: z.string().array().optional(),
    isPaid: z.preprocess((a) => a === 'true', z.boolean().optional()),
    userIds: z.string().array().optional(),
  })
);
