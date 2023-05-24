import { z } from 'zod';
import { CategorySchema } from './category';
import {
  PaginationOptionsSchema,
  PaginationResponseSchema,
} from './pagination';

const base = {
  code: z.string(),
  title: z.string(),
  description: z.string(),
  category: CategorySchema,
};

export const PermissionSchema = z.object({
  id: z.string(),
  ...base,
});

export const GetPermissionsResponseSchema = PaginationResponseSchema.merge(
  z.object({ list: PermissionSchema.array() })
);

export const GetPermissionsOptionsSchema = PaginationOptionsSchema.merge(
  z.object({})
);
