import { z } from 'zod';
import {
  CreateProductSchema,
  GetProductsResponseSchema,
  UpdateProductSchema,
  GetProductsOptionsSchema,
  NonCircularProductSchema,
} from '../schemas';
import { Store } from './store';

export interface Product extends z.infer<typeof NonCircularProductSchema> {
  store?: Store;
}

export type CreateProduct = z.infer<typeof CreateProductSchema>;

export type UpdateProduct = z.infer<typeof UpdateProductSchema>;

export type GetProductsResponse = z.infer<typeof GetProductsResponseSchema>;

export type GetProductsOptions = z.infer<typeof GetProductsOptionsSchema>;
