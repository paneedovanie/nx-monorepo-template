import { z } from 'zod';
import {
  PaginationOptionsSchema,
  PaginationResponseSchema,
} from './pagination';
import { StoreSchema } from './store';
import { CategorySchema } from './category';
import { FileSchema } from './file';

const base = {
  title: z.string(),
  description: z.string(),
  price: z.number().min(0.01, 'Price must be greater than 0.01'),
};

export const ProductSchema = z.object({
  id: z.string(),
  store: StoreSchema,
  category: CategorySchema,
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
