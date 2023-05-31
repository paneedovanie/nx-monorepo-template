import { Injectable } from '@nestjs/common';
import { OrderEntity, OrderRepository } from '../../../database';
import { BaseService } from '../../../core';

@Injectable()
export class OrderService extends BaseService<OrderEntity> {
  constructor(protected readonly repository: OrderRepository) {
    super(repository);
  }
}
