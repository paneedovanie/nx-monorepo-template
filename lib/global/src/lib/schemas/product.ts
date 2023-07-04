import { z } from 'zod';
import {
  PaginationOptionsSchema,
  PaginationResponseSchema,
} from './pagination';
import { CategorySchema } from './category';
import { FileSchema } from './file';
import { StoreSchema } from './store';

const base = {
  title: z.string(),
  description: z.string(),
  price: z.number().min(0.01, 'Price must be greater than 0.01'),
};

export const ProductSchemaNonCircular = z.object({
  id: z.string(),
  category: CategorySchema,
  categories: CategorySchema.array(),
  image: z.string(),
  ...base,
});

export const ProductSchema = z.object({
  id: z.string(),
  store: z.lazy(() => StoreSchema),
  category: CategorySchema,
  categories: CategorySchema.array(),
  image: z.string(),
  ...base,
});

export const CreateProductSchema = z.object({
  ...base,
  store: z.string(),
  category: z.string(),
  image: FileSchema.optional(),
});

export const UpdateProductSchema = z.object({
  ...base,
  store: z.string(),
  category: z.string(),
  image: FileSchema.optional(),
});

export const GetProductsResponseSchema = PaginationResponseSchema.merge(
  z.object({ list: ProductSchema.array() })
);

export const GetProductsOptionsSchema = PaginationOptionsSchema.merge(
  z.object({
    store: z.string().optional(),
    ids: z.string().array().optional(),
    categoryIds: z.string().array().optional(),
  })
);
