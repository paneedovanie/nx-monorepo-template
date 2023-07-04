import { z } from 'zod';
import {
  CreateProductSchema,
  GetProductsResponseSchema,
  UpdateProductSchema,
  GetProductsOptionsSchema,
  ProductSchemaNonCircular,
} from '../schemas';
import { Store } from './store';

export type Product = z.infer<typeof ProductSchemaNonCircular> & {
  store: Store;
};

export type CreateProduct = z.infer<typeof CreateProductSchema>;

export type UpdateProduct = z.infer<typeof UpdateProductSchema>;

export type GetProductsResponse = z.infer<typeof GetProductsResponseSchema>;

export type GetProductsOptions = z.infer<typeof GetProductsOptionsSchema>;
