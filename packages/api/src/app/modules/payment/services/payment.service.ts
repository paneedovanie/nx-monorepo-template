import { Injectable } from '@nestjs/common';
import {
  OrderRepository,
  PaymentEntity,
  PaymentRepository,
} from '../../../database';
import { BaseService } from '../../../core';
import { FindOptionsRelations } from 'typeorm';
import { BaseRepository } from '../../../database/repositories/base.repository';

@Injectable()
export class PaymentService extends BaseService<PaymentEntity> {
  constructor(
    protected readonly repository: PaymentRepository,
    protected readonly orderRepository: OrderRepository
  ) {
    super(repository);
  }

  protected mapRelations(): Record<string, BaseRepository<any>> {
    return {
      order: this.orderRepository,
    };
  }

  protected relations(): FindOptionsRelations<PaymentEntity> {
    return {
      order: true,
    };
  }
}
