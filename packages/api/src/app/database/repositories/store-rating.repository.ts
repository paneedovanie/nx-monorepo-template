import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { DataSource, FindOptionsRelations } from 'typeorm';
import { StoreRatingEntity } from '../entities';
import { BaseRepository } from '../../core';
import { UserRepository } from './user.repository';
import { CreateStore, UpdateStore } from '@nx-monorepo-template/global';
import { StoreRepository } from './store.repository';

@Injectable()
export class StoreRatingRepository extends BaseRepository<
  StoreRatingEntity,
  CreateStore,
  UpdateStore
> {
  constructor(
    dataSource: DataSource,
    @Inject(forwardRef(() => StoreRepository))
    private readonly storeRepository: StoreRepository,
    private readonly userRepository: UserRepository
  ) {
    super(StoreRatingEntity, dataSource);
  }

  protected mapRelations(): Record<string, BaseRepository<unknown>> {
    return {
      store: this.storeRepository,
      user: this.userRepository,
    };
  }

  protected relations(): FindOptionsRelations<StoreRatingEntity> {
    return {
      store: true,
      user: true,
    };
  }
}
