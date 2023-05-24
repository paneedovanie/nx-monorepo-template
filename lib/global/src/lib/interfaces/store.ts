import { z } from 'zod';
import {
  CreateStoreSchema,
  GetStoresResponseSchema,
  UpdateStoreSchema,
  StoreSchema,
  GetStoresOptionsSchema,
} from '../schemas';

export type Store = z.infer<typeof StoreSchema>;

export type CreateStore = z.infer<typeof CreateStoreSchema>;

export type UpdateStore = z.infer<typeof UpdateStoreSchema>;

export type GetStoresResponse = z.infer<typeof GetStoresResponseSchema>;

export type GetStoresOptions = z.infer<typeof GetStoresOptionsSchema>;
