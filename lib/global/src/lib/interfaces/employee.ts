import { z } from 'zod';
import {
  CreateEmployeeSchema,
  GetEmployeesResponseSchema,
  UpdateEmployeeSchema,
  EmployeeSchema,
  GetEmployeesOptionsSchema,
  NonCircularEmployeeSchema,
} from '../schemas';
import { User } from './user';

export interface Employee extends z.infer<typeof NonCircularEmployeeSchema> {
  user?: User;
}

export type CreateEmployee = z.infer<typeof CreateEmployeeSchema>;

export type UpdateEmployee = z.infer<typeof UpdateEmployeeSchema>;

export type GetEmployeesResponse = z.infer<typeof GetEmployeesResponseSchema>;

export type GetEmployeesOptions = z.infer<typeof GetEmployeesOptionsSchema>;
