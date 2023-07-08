import { z } from 'zod';
import {
  CreateNotificationSchema,
  GetNotificationsOptionsSchema,
  GetNotificationsResponseSchema,
  NotificationSchema,
  NotificationsCountSchema,
} from '../schemas/notification';

export enum NotificationType {
  StoreOrderCreated = 'store-order-created',
  StoreOrderUpdated = 'store-order-updated',
  StoreOrderDeleted = 'store-order-deleted',
  OrderCreated = 'order-created',
  OrderUpdated = 'order-updated',
  OrderDeleted = 'order-deleted',
  AccountCreated = 'account-created',
  AccountUpdated = 'account-updated',
  AmountSent = 'amount-sent',
  AmountReceived = 'amount-received',
}

export interface INotificationMetadata {
  orderId?: string;
  storeId?: string;
  status?: string;
  amount?: number;
  userId?: string;
}

export type Notification = z.infer<typeof NotificationSchema>;

export type CreateNotification = z.infer<typeof CreateNotificationSchema>;

export type GetNotificationsResponse = z.infer<
  typeof GetNotificationsResponseSchema
>;

export type GetNotificationsOptions = z.infer<
  typeof GetNotificationsOptionsSchema
>;

export type NotificationsCount = z.infer<typeof NotificationsCountSchema>;
