import { Injectable } from '@nestjs/common';
import {
  PermissionRepository,
  EmployeeEntity,
  EmployeeRepository,
} from '../../../database';
import { BaseService } from '../../../core';

@Injectable()
export class EmployeeService extends BaseService<EmployeeEntity> {
  constructor(
    protected readonly repository: EmployeeRepository,
    protected readonly permissionRepository: PermissionRepository
  ) {
    super(repository);
  }
}
