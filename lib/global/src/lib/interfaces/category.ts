import { z } from 'zod';
import {
  CreateCategorySchema,
  GetCategoriesResponseSchema,
  UpdateCategorySchema,
  CategorySchema,
  GetCategoriesOptionsSchema,
} from '../schemas';
import { Store } from './store';

export type Category = z.infer<typeof CategorySchema> & {
  store?: Store;
};

export type CreateCategory = z.infer<typeof CreateCategorySchema>;

export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;

export type GetCategoriesResponse = z.infer<typeof GetCategoriesResponseSchema>;

export type GetCategoriesOptions = z.infer<typeof GetCategoriesOptionsSchema>;

export interface ICategoryMetadata {
  storeId?: string;
}
