import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsRelations } from 'typeorm';
import { EmployeeEntity } from '../entities';
import { BaseRepository } from '../../core';
import { RoleRepository } from './role.repository';

@Injectable()
export class EmployeeRepository extends BaseRepository<EmployeeEntity> {
  constructor(
    dataSource: DataSource,
    private readonly roleRepository: RoleRepository
  ) {
    super(EmployeeEntity, dataSource);
  }

  protected mapRelations(): Record<string, BaseRepository<unknown>> {
    return {
      roles: this.roleRepository,
    };
  }

  protected relations(): FindOptionsRelations<EmployeeEntity> {
    return {
      user: true,
      store: true,
      roles: { permissions: true },
    };
  }
}
