import { z } from 'zod';
import {
  PaginationOptionsSchema,
  PaginationResponseSchema,
} from './pagination';
import { UserSchema } from './user';
import { UnrestrictedSchema } from './unrestricted';
import { StoreSchema } from './store';

const base = {
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
};

export const StoreRatingSchema = z.object({
  id: z.string(),
  user: UserSchema,
  store: StoreSchema,
  createdAt: z.date(),
  ...base,
});

export const CreateStoreRatingSchema = z.object({
  ...base,
  user: z.string().uuid(),
  store: z.string().uuid(),
});

export const UpdateStoreRatingSchema = z.object({
  ...base,
  user: z.string().uuid(),
  store: z.string().uuid(),
});

export const GetStoreRatingsResponseSchema = PaginationResponseSchema.merge(
  z.object({ list: StoreRatingSchema.array() })
);

export const GetStoreRatingsOptionsSchema = PaginationOptionsSchema.merge(
  z
    .object({
      store: z.string().optional(),
      user: z.string().optional(),
    })
    .merge(UnrestrictedSchema)
);
