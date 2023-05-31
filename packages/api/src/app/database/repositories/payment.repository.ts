import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { DataSource, FindOptionsRelations } from 'typeorm';
import { PaymentEntity } from '../entities';
import { BaseRepository } from './base.repository';
import { OrderRepository } from './order.repository';

@Injectable()
export class PaymentRepository extends BaseRepository<PaymentEntity> {
  constructor(
    dataSource: DataSource,
    @Inject(forwardRef(() => OrderRepository))
    protected readonly orderRepository: OrderRepository
  ) {
    super(PaymentEntity, dataSource);
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
