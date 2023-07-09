import { Injectable } from '@nestjs/common';
import {
  OrderRepository,
  StoreEntity,
  StoreRepository,
} from '../../../database';
import { BaseService } from '../../../core';
import { OrderStatus } from '@nx-monorepo-template/global';

@Injectable()
export class StoreService extends BaseService<StoreEntity> {
  constructor(
    protected readonly repository: StoreRepository,
    protected readonly orderRepository: OrderRepository
  ) {
    super(repository);
  }

  async getStatus(storeId: string) {
    return {
      preparing: await this.orderRepository.find({
        where: {
          status: OrderStatus.Preparing,
          store: {
            id: storeId,
          },
        },
      }),
      ready: await this.orderRepository.find({
        where: {
          status: OrderStatus.Ready,
          store: {
            id: storeId,
          },
        },
      }),
    };
  }
}
