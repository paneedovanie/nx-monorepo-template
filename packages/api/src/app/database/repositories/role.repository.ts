import { Injectable } from '@nestjs/common';
import {
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
} from 'typeorm';
import { RoleEntity } from '../entities';
import { BaseRepository } from '../../core';
import { CreateRole, UpdateRole } from '@nx-monorepo-template/global';

@Injectable()
export class RoleRepository extends BaseRepository<
  RoleEntity,
  CreateRole,
  UpdateRole
> {
  constructor(dataSource: DataSource) {
    super(RoleEntity, dataSource);
  }

  protected relations(): FindOptionsRelations<RoleEntity> {
    return {
      permissions: true,
    };
  }

  protected modifyWhere({
    isEmployee,
    ...conditions
  }: FindOptionsWhere<RoleEntity> & {
    isEmployee?: boolean;
  }): FindOptionsWhere<RoleEntity> {
    if (isEmployee !== undefined) {
      conditions.title = In(['Cashier']);
    }
    return conditions;
  }
}
