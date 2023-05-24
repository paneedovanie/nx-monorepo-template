import { Injectable } from '@nestjs/common';
import {
  StoreEntity,
  StoreRepository,
  UserRepository,
} from '../../../database';
import { BaseService } from '../../../core';
import { BaseRepository } from '../../../database/repositories/base.repository';
import { FindOptionsRelations } from 'typeorm';

@Injectable()
export class StoreService extends BaseService<StoreEntity> {
  constructor(
    protected readonly repository: StoreRepository,
    private readonly ownerRepository: UserRepository
  ) {
    super(repository);
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
