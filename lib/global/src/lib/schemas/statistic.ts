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
