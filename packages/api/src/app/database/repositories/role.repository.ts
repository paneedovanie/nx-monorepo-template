import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsRelations } from 'typeorm';
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
}
