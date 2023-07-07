import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsRelations } from 'typeorm';
import { UserEntity } from '../entities';
import { BaseRepository } from '../../core';
import { CreateUser, UpdateUser } from '@nx-monorepo-template/global';
import { RoleRepository } from './role.repository';

@Injectable()
export class UserRepository extends BaseRepository<
  UserEntity,
  CreateUser,
  UpdateUser
> {
  constructor(
    dataSource: DataSource,
    private readonly roleRepository: RoleRepository
  ) {
    super(UserEntity, dataSource);
  }

  protected relations(): FindOptionsRelations<UserEntity> {
    return {
      roles: { permissions: true },
    };
  }
}
