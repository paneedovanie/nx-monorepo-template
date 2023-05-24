import { z } from 'zod';
import {
  CreateRoleSchema,
  GetRolesResponseSchema,
  UpdateRoleSchema,
  RoleSchema,
  GetRolesOptionsSchema,
  UpdateRolePermissionsSchema,
} from '../schemas';

export type Role = z.infer<typeof RoleSchema>;

export type CreateRole = z.infer<typeof CreateRoleSchema>;

export type UpdateRole = z.infer<typeof UpdateRoleSchema>;

export type UpdateRolePermissions = z.infer<typeof UpdateRolePermissionsSchema>;

export type GetRolesResponse = z.infer<typeof GetRolesResponseSchema>;

export type GetRolesOptions = z.infer<typeof GetRolesOptionsSchema>;
