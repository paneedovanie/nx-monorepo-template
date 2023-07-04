import { z } from 'zod';
import {
  CreateTagSchema,
  GetTagsResponseSchema,
  UpdateTagSchema,
  TagSchema,
  GetTagsOptionsSchema,
} from '../schemas';

export type Tag = z.infer<typeof TagSchema>;

export type CreateTag = z.infer<typeof CreateTagSchema>;

export type UpdateTag = z.infer<typeof UpdateTagSchema>;

export type GetTagsResponse = z.infer<typeof GetTagsResponseSchema>;

export type GetTagsOptions = z.infer<typeof GetTagsOptionsSchema>;
