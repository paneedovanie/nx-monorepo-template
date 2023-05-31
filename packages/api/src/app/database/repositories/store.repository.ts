import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsRelations } from 'typeorm';
import { StoreEntity } from '../entities';
import { BaseRepository } from './base.repository';
import { UserRepository } from './user.repository';

@Injectable()
export class StoreRepository extends BaseRepository<StoreEntity> {
  constructor(
    dataSource: DataSource,
    private readonly ownerRepository: UserRepository
  ) {
    super(StoreEntity, dataSource);
  }

  protected mapRelations(): Record<string, BaseRepository<any>> {
    return {
      owner: this.ownerRepository,
    };
  }

  protected relations(): FindOptionsRelations<StoreEntity> {
    return {
      owner: true,
    };
  }
}
