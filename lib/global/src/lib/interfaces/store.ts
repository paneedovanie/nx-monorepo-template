import { z } from 'zod';
import {
  CreateStoreSchema,
  GetStoresResponseSchema,
  UpdateStoreSchema,
  GetStoresOptionsSchema,
  NonCircularStoreSchema,
  CreateStoreConfigSchema,
  UpdateStoreConfigSchema,
  StoreConfigSchema,
} from '../schemas';
import { Product } from './product';
import { Order } from './order';
import { User } from './user';

export type CreateStoreConfig = z.infer<typeof CreateStoreConfigSchema>;

export type UpdateStoreConfig = z.infer<typeof UpdateStoreConfigSchema>;

export type StoreConfig = z.infer<typeof StoreConfigSchema>;

export interface Store extends z.infer<typeof NonCircularStoreSchema> {
  owner?: User;
  products?: Product[];
}

export type CreateStore = z.infer<typeof CreateStoreSchema>;

export type UpdateStore = z.infer<typeof UpdateStoreSchema>;

export type GetStoresResponse = z.infer<typeof GetStoresResponseSchema>;

export type GetStoresOptions = z.infer<typeof GetStoresOptionsSchema>;

export enum EStoreEvent {
  Status = 'status',
  Dashboard = 'dashboard',
}

export type StoreStatusEvent = {
  storeId: string;
  preparing: Order[];
  ready: Order[];
};

export type StorePreparingEvent = {
  storeId: string;
  preparing: Order[];
};

export type StoreDashboardEvent = {
  storeId: string;
  categoriesCount: number;
  productsCount: number;
  ordersCount: number;
  paymentsCount: number;
};
