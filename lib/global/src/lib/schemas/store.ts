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
import { Store } from '../interfaces';

const base = {
  title: z.string(),
  description: z.string(),
};

export const CreateStoreConfigSchema = z.object({
  headerTextColor: z.string(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  tax: z.number(),
});

export const UpdateStoreConfigSchema = z.object({
  headerTextColor: z.string(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  tax: z.number(),
});

export const StoreConfigSchema = z.object({
  headerTextColor: z.string(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  tax: z.number(),
});

export const NonCircularStoreSchema = z.object({
  id: z.string(),
  // owner: UserSchema,
  image: z.string().optional(),
  rating: z.number(),
  tags: TagSchema.array(),
  config: StoreConfigSchema.optional(),
  ...base,
});

export const StoreSchema: z.ZodType<Store> = z.lazy(() =>
  z.object({
    id: z.string(),
    image: z.string().optional(),
    rating: z.number(),
    owner: UserSchema,
    tags: TagSchema.array(),
    products: ProductSchema.array(),
    config: StoreConfigSchema.optional(),
    ...base,
  })
);

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
  config: StoreConfigSchema.optional(),
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
      ids: z.string().uuid().array().optional(),
      isEmployee: z.preprocess(
        (a: string) => a && a === 'true',
        z.boolean().optional()
      ),
    })
    .merge(UnrestrictedSchema)
);
