import { z } from 'zod';
import {
  DashboardSchema,
  StoreOrdersPerDayResponseSchema,
  StoreOrdersPerDaySchema,
} from '../schemas';

export type Dashboard = z.infer<typeof DashboardSchema>;

export type StoreOrdersPerDay = z.infer<typeof StoreOrdersPerDaySchema>;

export type StoreOrdersPerDayResponse = z.infer<
  typeof StoreOrdersPerDayResponseSchema
>;
