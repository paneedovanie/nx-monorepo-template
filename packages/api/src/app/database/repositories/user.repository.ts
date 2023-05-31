import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsRelations } from 'typeorm';
import { UserEntity } from '../entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource);
  }

  protected relations(): FindOptionsRelations<UserEntity> {
    return {
      roles: { permissions: true },
    };
  }
}
