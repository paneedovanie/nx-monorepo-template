import { z } from 'zod';
import {
  PaginationOptionsSchema,
  PaginationResponseSchema,
} from './pagination';
import { PermissionSchema } from './permission';

const base = {
  title: z.string(),
  description: z.string(),
};

export const RoleSchema = z.object({
  id: z.string(),
  permissions: PermissionSchema.array(),
  createdAt: z.date(),
  ...base,
});

export const CreateRoleSchema = z.object(base);

export const UpdateRoleSchema = z.object(base);

export const UpdateRolePermissionsSchema = z.object({
  ids: z.string().array(),
});

export const GetRolesResponseSchema = PaginationResponseSchema.merge(
  z.object({ list: RoleSchema.array() })
);

export const GetRolesOptionsSchema = PaginationOptionsSchema.merge(
  z.object({
    isEmployee: z.preprocess((a) => a && a === 'true', z.boolean().optional()),
  })
);
