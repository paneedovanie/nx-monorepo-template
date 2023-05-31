import { Injectable } from '@nestjs/common';
import { StoreEntity, StoreRepository } from '../../../database';
import { BaseService } from '../../../core';

@Injectable()
export class StoreService extends BaseService<StoreEntity> {
  constructor(protected readonly repository: StoreRepository) {
    super(repository);
  }
}
