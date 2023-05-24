import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { StoreEntity } from '../entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class StoreRepository extends BaseRepository<StoreEntity> {
  constructor(dataSource: DataSource) {
    super(StoreEntity, dataSource);
  }
}
