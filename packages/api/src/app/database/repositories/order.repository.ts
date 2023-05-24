import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OrderEntity } from '../entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class OrderRepository extends BaseRepository<OrderEntity> {
  constructor(dataSource: DataSource) {
    super(OrderEntity, dataSource);
  }
}
