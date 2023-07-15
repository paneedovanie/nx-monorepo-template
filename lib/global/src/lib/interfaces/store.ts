import { z } from 'zod';
import {
  CreateStoreSchema,
  GetStoresResponseSchema,
  UpdateStoreSchema,
  GetStoresOptionsSchema,
  NonCircularStoreSchema,
} from '../schemas';
import { Product } from './product';

export type Store = z.infer<typeof NonCircularStoreSchema> & {
  products: Product[];
};

export type CreateStore = z.infer<typeof CreateStoreSchema>;

export type UpdateStore = z.infer<typeof UpdateStoreSchema>;

export type GetStoresResponse = z.infer<typeof GetStoresResponseSchema>;

export type GetStoresOptions = z.infer<typeof GetStoresOptionsSchema>;

export enum EStoreEvent {
  Status = 'status',
  Dashboard = 'dashboard',
}

export type StoreDashboardEvent = {
  categoriesCount: number;
  productsCount: number;
  ordersCount: number;
  paymentsCount: number;
};
