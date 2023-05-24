import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TransactionEntity } from '../entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class TransactionRepository extends BaseRepository<TransactionEntity> {
  constructor(dataSource: DataSource) {
    super(TransactionEntity, dataSource);
  }
}
