import { z } from 'zod';
import {
  PaginationOptionsSchema,
  PaginationResponseSchema,
} from './pagination';

const base = {
  title: z.string(),
  description: z.string(),
  type: z.string(),
};

const ParentCategorySchema = z.object({
  id: z.string(),
  ...base,
});

export const CategorySchema = z.object({
  id: z.string(),
  parent: ParentCategorySchema.optional(),
  children: ParentCategorySchema.array().optional(),
  ...base,
});

export const CreateCategorySchema = z.object({
  ...base,
  parent: z.string().optional(),
});

export const UpdateCategorySchema = z.object({
  ...base,
  parent: z.string().optional(),
});

export const GetCategoriesResponseSchema = PaginationResponseSchema.merge(
  z.object({ list: CategorySchema.array() })
);

export const GetCategoriesOptionsSchema = PaginationOptionsSchema.merge(
  z.object({
    search: z.string().optional(),
    type: z.string().optional(),
    parent: z.string().optional(),
    isRoot: z.preprocess((a) => a && a === 'true', z.boolean().optional()),
  })
);
