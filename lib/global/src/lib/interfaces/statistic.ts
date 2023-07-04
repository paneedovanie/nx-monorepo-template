import { z } from 'zod';
import { DashboardSchema } from '../schemas';

export type Dashboard = z.infer<typeof DashboardSchema>;
