import { initContract } from '@ts-rest/core';
import {
  DashboardSchema,
  StoreOrdersPerDayResponseSchema,
  StoreOrdersPerDaySchema,
  UnrestrictedSchema,
} from '../schemas';

const prefix = `/api/v1/statistics`;

export const statistic = initContract().router({
  dashboard: {
    method: 'GET',
    path: `${prefix}/dashboard`,
    query: UnrestrictedSchema,
    responses: {
      200: DashboardSchema,
    },
    summary: 'Get dashboard data',
  },
  storeOrdersPerDay: {
    method: 'GET',
    path: `${prefix}/store-orders-per-day`,
    query: StoreOrdersPerDaySchema,
    responses: {
      200: StoreOrdersPerDayResponseSchema,
    },
    summary: 'Get store order per day',
  },
});
