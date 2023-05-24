import { z } from 'zod';
import {
  CreateProductSchema,
  GetProductsResponseSchema,
  UpdateProductSchema,
  ProductSchema,
  GetProductsOptionsSchema,
} from '../schemas';

export type Product = z.infer<typeof ProductSchema>;

export type CreateProduct = z.infer<typeof CreateProductSchema>;

export type UpdateProduct = z.infer<typeof UpdateProductSchema>;

export type GetProductsResponse = z.infer<typeof GetProductsResponseSchema>;

export type GetProductsOptions = z.infer<typeof GetProductsOptionsSchema>;
