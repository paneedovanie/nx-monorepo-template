import { z } from 'zod';
import { PaginationResponseSchema } from './pagination';
import { RoleSchema } from './role';
import { NonCircularEmployeeSchema } from './employee';

const base = {
  firstName: z.string(),
  lastName: z.string(),
};

export const UserSchema = z.object({
  id: z.string(),
  roles: RoleSchema.array(),
  createdAt: z.date(),
  uniqueCode: z.string(),
  ...base,
});

export const TokenUserSchema = z.object({
  id: z.string(),
  roles: RoleSchema.merge(
    z.object({ permissions: z.string().array() })
  ).array(),
  createdAt: z.date(),
  uniqueCode: z.string(),
  jobs: z.lazy(() =>
    NonCircularEmployeeSchema.merge(
      z.object({
        roles: RoleSchema.merge(
          z.object({ permissions: z.string().array() })
        ).array(),
      })
    ).array()
  ),
  ...base,
});

export const CreateUserSchema = z.object(base);

export const UpdateUserSchema = z.object(base);

export const UpdateUserRoleSchema = z.object({ roleId: z.string() });

export const GetUsersResponseSchema = PaginationResponseSchema.merge(
  z.object({ list: UserSchema.array() })
);
