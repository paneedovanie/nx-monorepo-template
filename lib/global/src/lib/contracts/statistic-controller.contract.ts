import { initContract } from '@ts-rest/core';
import { DashboardSchema, UnrestrictedSchema } from '../schemas';

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
});
