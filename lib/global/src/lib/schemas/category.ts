import { z } from 'zod';
import {
  PaginationOptionsSchema,
  PaginationResponseSchema,
} from './pagination';
import { NonCircularStoreSchema, StoreSchema } from './store';

const base = {
  title: z.string(),
  description: z.string(),
  type: z.string(),
};

export const NonCircularCategorySchema = z.object({
  id: z.string(),
  ...base,
});

export const CategorySchema = z.object({
  id: z.string(),
  parent: NonCircularCategorySchema.optional(),
  children: NonCircularCategorySchema.array().optional(),
  ...base,
});

export const CreateCategorySchema = z.object({
  ...base,
  parent: z.string().uuid().optional(),
  store: z.string().uuid().optional(),
});

export const UpdateCategorySchema = z.object({
  ...base,
  parent: z.string().uuid().optional(),
  store: z.string().uuid().optional(),
});

export const GetCategoriesResponseSchema = PaginationResponseSchema.merge(
  z.object({ list: CategorySchema.array() })
);

export const GetCategoriesOptionsSchema = PaginationOptionsSchema.merge(
  z.object({
    search: z.string().optional(),
    type: z.string().optional(),
    parent: z.string().uuid().optional(),
    store: z.string().uuid().optional(),
    isRoot: z.preprocess((a) => a && a === 'true', z.boolean().optional()),
  })
);
