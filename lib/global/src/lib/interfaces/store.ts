import { z } from 'zod';
import {
  CreateStoreSchema,
  GetStoresResponseSchema,
  UpdateStoreSchema,
  GetStoresOptionsSchema,
  StoreSchemaNonCiruclar,
} from '../schemas';
import { Product } from './product';

export type Store = z.infer<typeof StoreSchemaNonCiruclar> & {
  products: Product[];
};

export type CreateStore = z.infer<typeof CreateStoreSchema>;

export type UpdateStore = z.infer<typeof UpdateStoreSchema>;

export type GetStoresResponse = z.infer<typeof GetStoresResponseSchema>;

export type GetStoresOptions = z.infer<typeof GetStoresOptionsSchema>;
