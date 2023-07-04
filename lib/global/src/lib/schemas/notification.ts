import { z } from 'zod';
import {
  PaginationOptionsSchema,
  PaginationResponseSchema,
} from './pagination';
import { UserSchema } from './user';
import { NotificationType } from '../interfaces';
import { OrderSchema } from './order';
import { StoreSchema } from './store';

const base = {
  type: z.enum([
    NotificationType.AccountCreated,
    NotificationType.AccountUpdated,
    NotificationType.OrderCreated,
    NotificationType.OrderUpdated,
    NotificationType.OrderDeleted,
    NotificationType.StoreOrderCreated,
    NotificationType.StoreOrderUpdated,
    NotificationType.StoreOrderDeleted,
    NotificationType.AmountSent,
    NotificationType.AmountReceived,
  ]),
  metadata: z.object({
    orderId: z.string().uuid().optional(),
    storeId: z.string().uuid().optional(),
    status: z.string().uuid().optional(),
    amount: z.number().optional(),
    userId: z.string().uuid().optional(),
    order: OrderSchema.optional(),
    store: StoreSchema.optional(),
    user: UserSchema.optional(),
  }),
};

export const NotificationSchema = z.object({
  id: z.string(),
  user: UserSchema,
  opened: z.boolean(),
  createdAt: z.date(),
  ...base,
});

export const CreateNotificationSchema = z.object({
  store: z.string(),
  user: z.string().uuid(),
  ...base,
});

export const GetNotificationsResponseSchema = PaginationResponseSchema.merge(
  z.object({ list: NotificationSchema.array() })
);

export const GetNotificationsOptionsSchema = PaginationOptionsSchema.merge(
  z.object({
    ids: z.string().array().optional(),
    startDate: z.preprocess(
      (a: string) => a && new Date(a),
      z.date().optional()
    ),
    endDate: z.preprocess((a: string) => a && new Date(a), z.date().optional()),
  })
);

export const NotificationsCountSchema = z.object({
  all: z.number(),
  account: z.number(),
  order: z.number(),
  storeOrder: z.number(),
  wallet: z.number(),
  items: NotificationSchema.array(),
});
