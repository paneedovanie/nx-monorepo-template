import { z } from 'zod';
import {
  PaginationOptionsSchema,
  PaginationResponseSchema,
} from './pagination';
import { UserSchema } from './user';
import { FileSchema } from './file';

const base = {
  title: z.string(),
  description: z.string(),
};

export const StoreSchema = z.object({
  id: z.string(),
  owner: UserSchema,
  image: z.string().optional(),
  ...base,
});

export const CreateStoreSchema = z.object({
  ...base,
  owner: z.string(),
  image: FileSchema.optional(),
});

export const UpdateStoreSchema = z.object({
  ...base,
  owner: z.string(),
  image: FileSchema.optional(),
});

export const GetStoresResponseSchema = PaginationResponseSchema.merge(
  z.object({ list: StoreSchema.array() })
);

export const GetStoresOptionsSchema = PaginationOptionsSchema.merge(
  z.object({
    search: z.string().optional(),
  })
);
