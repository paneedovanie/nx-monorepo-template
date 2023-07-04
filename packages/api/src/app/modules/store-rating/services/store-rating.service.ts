import { Injectable } from '@nestjs/common';
import { StoreRatingEntity, StoreRatingRepository } from '../../../database';
import { BaseService } from '../../../core';

@Injectable()
export class StoreRatingService extends BaseService<StoreRatingEntity> {
  constructor(protected readonly repository: StoreRatingRepository) {
    super(repository);
  }
}
