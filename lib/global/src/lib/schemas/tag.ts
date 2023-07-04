import { z } from 'zod';
import {
  PaginationOptionsSchema,
  PaginationResponseSchema,
} from './pagination';

const base = {
  title: z.string(),
  type: z.string(),
};

export const TagSchema = z.object({
  id: z.string(),
  ...base,
});

export const CreateTagSchema = z.object({
  ...base,
});

export const UpdateTagSchema = z.object({
  ...base,
});

export const GetTagsResponseSchema = PaginationResponseSchema.merge(
  z.object({ list: TagSchema.array() })
);

export const GetTagsOptionsSchema = PaginationOptionsSchema.merge(
  z.object({
    type: z.string().optional(),
  })
);
