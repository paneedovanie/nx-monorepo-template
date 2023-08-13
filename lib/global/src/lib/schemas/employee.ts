import { z } from 'zod';
import {
  PaginationOptionsSchema,
  PaginationResponseSchema,
} from './pagination';
import { PermissionSchema } from './permission';
import { UserSchema } from './user';
import { NonCircularStoreSchema, StoreSchema } from './store';
import { RoleSchema } from './role';
import { Employee } from '../interfaces';

const base = {
  uniqueCode: z.string(),
  store: z.string().uuid(),
  role: z.string().uuid(),
};

export const NonCircularEmployeeSchema = z.object({
  id: z.string(),
  user: z.lazy(() => UserSchema),
  store: NonCircularStoreSchema,
  roles: RoleSchema.array(),
  createdAt: z.date(),
});

export const EmployeeSchema: z.ZodType<Employee> = z.lazy(() =>
  z.object({
    id: z.string(),
    user: UserSchema,
    store: StoreSchema,
    roles: RoleSchema.array(),
    createdAt: z.date(),
  })
);

export const CreateEmployeeSchema = z.object(base);

export const UpdateEmployeeSchema = z.object(base);

export const GetEmployeesResponseSchema = PaginationResponseSchema.merge(
  z.object({ list: EmployeeSchema.array() })
);

export const GetEmployeesOptionsSchema = PaginationOptionsSchema.merge(
  z.object({})
);
