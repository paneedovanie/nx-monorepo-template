import { initContract } from '@ts-rest/core';
import {
  EmployeeSchema,
  CreateEmployeeSchema,
  GetEmployeesOptionsSchema,
  GetEmployeesResponseSchema,
  UpdateEmployeeSchema,
} from '../schemas';
import { z } from 'zod';

const prefix = `/api/v1/employees`;

export const employee = initContract().router({
  create: {
    method: 'POST',
    path: `${prefix}`,
    responses: {
      201: EmployeeSchema,
    },
    body: CreateEmployeeSchema,
    summary: 'Create a employee',
  },
  get: {
    method: 'GET',
    path: `${prefix}/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    responses: {
      200: EmployeeSchema,
    },
    summary: 'Get a employee by id',
  },
  getAll: {
    method: 'GET',
    path: `${prefix}`,
    query: GetEmployeesOptionsSchema,
    responses: {
      200: GetEmployeesResponseSchema,
    },
    summary: 'Get a paginated list of employees',
  },
  update: {
    method: 'PATCH',
    path: `${prefix}/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    body: UpdateEmployeeSchema,
    responses: {
      201: EmployeeSchema,
    },
    summary: 'Update employee',
  },
  delete: {
    method: 'DELETE',
    path: `${prefix}/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    body: z.any().optional(),
    responses: {
      204: z.any().optional(),
    },
    summary: 'Delete employee',
  },
});
