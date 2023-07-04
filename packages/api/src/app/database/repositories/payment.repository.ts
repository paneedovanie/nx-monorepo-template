import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { DataSource, FindOptionsRelations } from 'typeorm';
import { PaymentEntity } from '../entities';
import { BaseRepository } from '../../core';
import { OrderRepository } from './order.repository';
import { CreatePayment, UpdatePayment } from '@nx-monorepo-template/global';

@Injectable()
export class PaymentRepository extends BaseRepository<
  PaymentEntity,
  CreatePayment,
  UpdatePayment
> {
  constructor(
    dataSource: DataSource,
    @Inject(forwardRef(() => OrderRepository))
    protected readonly orderRepository: OrderRepository
  ) {
    super(PaymentEntity, dataSource);
  }

  protected mapRelations(): Record<string, BaseRepository<unknown>> {
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
