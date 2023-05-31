import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsRelations } from 'typeorm';
import { RoleEntity } from '../entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class RoleRepository extends BaseRepository<RoleEntity> {
  constructor(dataSource: DataSource) {
    super(RoleEntity, dataSource);
  }

  protected relations(): FindOptionsRelations<RoleEntity> {
    return {
      permissions: true,
    };
  }
}
