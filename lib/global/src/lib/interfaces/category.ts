import { z } from 'zod';
import {
  CreateCategorySchema,
  GetCategoriesResponseSchema,
  UpdateCategorySchema,
  CategorySchema,
  GetCategoriesOptionsSchema,
} from '../schemas';

export type Category = z.infer<typeof CategorySchema>;

export type CreateCategory = z.infer<typeof CreateCategorySchema>;

export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;

export type GetCategoriesResponse = z.infer<typeof GetCategoriesResponseSchema>;

export type GetCategoriesOptions = z.infer<typeof GetCategoriesOptionsSchema>;

export interface ICategoryMetadata {
  storeId?: string;
}
