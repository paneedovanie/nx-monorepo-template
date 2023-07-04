import { z } from 'zod';
import {
  CreateStoreRatingSchema,
  GetStoreRatingsResponseSchema,
  UpdateStoreRatingSchema,
  StoreRatingSchema,
  GetStoreRatingsOptionsSchema,
} from '../schemas';

export type StoreRating = z.infer<typeof StoreRatingSchema>;

export type CreateStoreRating = z.infer<typeof CreateStoreRatingSchema>;

export type UpdateStoreRating = z.infer<typeof UpdateStoreRatingSchema>;

export type GetStoreRatingsResponse = z.infer<
  typeof GetStoreRatingsResponseSchema
>;

export type GetStoreRatingsOptions = z.infer<
  typeof GetStoreRatingsOptionsSchema
>;
