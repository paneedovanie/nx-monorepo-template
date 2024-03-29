import { z } from 'zod';
import {
  OrderProductSchema,
  CreateOrderSchema,
  GetOrdersResponseSchema,
  UpdateOrderSchema,
  OrderSchema,
  GetOrdersOptionsSchema,
} from '../schemas';

export enum OrderStatus {
  Pending = 'pending',
  Cancelled = 'cancelled',
  Preparing = 'preparing',
  Ready = 'ready',
  Completed = 'completed',
}

export type OrderProduct = z.infer<typeof OrderProductSchema>;

export type Order = z.infer<typeof OrderSchema>;

export type CreateOrder = z.infer<typeof CreateOrderSchema>;

export type UpdateOrder = z.infer<typeof UpdateOrderSchema>;

export type GetOrdersResponse = z.infer<typeof GetOrdersResponseSchema>;

export type GetOrdersOptions = z.infer<typeof GetOrdersOptionsSchema>;
