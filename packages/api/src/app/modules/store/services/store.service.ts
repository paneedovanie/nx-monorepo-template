import { Injectable } from '@nestjs/common';
import {
  OrderRepository,
  StoreEntity,
  StoreRepository,
} from '../../../database';
import { BaseService } from '../../../core';
import {
  EStoreEvent,
  OrderStatus,
  UpdateStoreConfig,
} from '@nx-monorepo-template/global';
import { StatisticService } from '../../statistic';
import { EventGateway } from '../../../event';

@Injectable()
export class StoreService extends BaseService<StoreEntity> {
  constructor(
    protected readonly repository: StoreRepository,
    protected readonly orderRepository: OrderRepository,
    protected readonly eventGateway: EventGateway,
    protected readonly statisticService: StatisticService
  ) {
    super(repository);
  }

  async getStatus(storeId: string) {
    return {
      storeId,
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

  public async storeStatusEvent(storeId: string) {
    const store = await this.repository.getByIdWithRelations(storeId);
    const socket = this.eventGateway.getSocket(store.owner.id);

    socket?.emit(EStoreEvent.Status, await this.getStatus(storeId));
  }

  async storeDashboardEvent(storeId: string) {
    const store = await this.repository.getByIdWithRelations(storeId);
    const socket = this.eventGateway.getSocket(store.owner.id);

    socket?.emit(
      EStoreEvent.Dashboard,
      await this.statisticService.getStoreDashboard(storeId)
    );
  }

  async updateConfig(storeId: string, input: UpdateStoreConfig) {
    await this.repository.updateWithRelations(storeId, { config: input });
    return this.getById(storeId);
  }
}
