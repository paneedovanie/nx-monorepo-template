import { z } from 'zod';
import {
  PaginationOptionsSchema,
  PaginationResponseSchema,
} from './pagination';
import { UserSchema } from './user';
import { FileSchema } from './file';
import { UnrestrictedSchema } from './unrestricted';
import { TagSchema } from './tag';
import { ProductSchema } from './product';

const base = {
  title: z.string(),
  description: z.string(),
};

export const NonCircularStoreSchema = z.object({
  id: z.string(),
  owner: UserSchema,
  image: z.string().optional(),
  rating: z.number(),
  tags: TagSchema.array(),
  ...base,
});

export const StoreSchema = z.object({
  id: z.string(),
  owner: UserSchema,
  image: z.string().optional(),
  rating: z.number(),
  tags: TagSchema.array(),
  products: ProductSchema.array(),
  ...base,
});

export const CreateStoreSchema = z.object({
  ...base,
  owner: z.string(),
  image: FileSchema.optional(),
  tags: z.string().array(),
});

export const UpdateStoreSchema = z.object({
  ...base,
  owner: z.string(),
  image: FileSchema.optional(),
  tags: z.string().array(),
});

export const GetStoresResponseSchema = PaginationResponseSchema.merge(
  z.object({ list: StoreSchema.array() })
);

export const GetStoresOptionsSchema = PaginationOptionsSchema.merge(
  z
    .object({
      search: z.string().uuid().optional(),
      owner: z.string().uuid().optional(),
      tags: z.string().uuid().array().optional(),
    })
    .merge(UnrestrictedSchema)
);
