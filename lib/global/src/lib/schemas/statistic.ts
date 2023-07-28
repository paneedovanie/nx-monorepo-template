import { z } from 'zod';

export const DashboardSchema = z.object({
  myStoresCount: z.number(),
  myOrdersCount: z.number(),
  myStoresOrdersCount: z.number(),
  storesCount: z.number().optional(),
  ordersCount: z.number().optional(),
  usersCount: z.number().optional(),
  rolesCount: z.number().optional(),
  categoriesCount: z.number().optional(),
  circulatingAmount: z.number().optional(),
});

export const StoreOrdersPerDaySchema = z.object({
  storeId: z.string().uuid(),
  from: z
    .string()
    .datetime()
    .transform((v) => new Date(v)),
  to: z
    .string()
    .datetime()
    .transform((v) => new Date(v)),
});

export const StoreOrdersPerDayResponseSchema = z
  .object({
    date: z.date(),
    count: z.number(),
  })
  .array();
