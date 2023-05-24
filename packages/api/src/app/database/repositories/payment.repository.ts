import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PaymentEntity } from '../entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class PaymentRepository extends BaseRepository<PaymentEntity> {
  constructor(dataSource: DataSource) {
    super(PaymentEntity, dataSource);
  }
}
