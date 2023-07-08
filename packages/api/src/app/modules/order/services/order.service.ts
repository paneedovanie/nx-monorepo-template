import { Injectable } from '@nestjs/common';
import {
  NotificationRepository,
  OrderEntity,
  OrderRepository,
} from '../../../database';
import { BaseService } from '../../../core';
import {
  INotificationMetadata,
  NotificationType,
} from '@nx-monorepo-template/global';

@Injectable()
export class OrderService extends BaseService<OrderEntity> {
  constructor(
    protected readonly repository: OrderRepository,
    protected readonly notificationRepository: NotificationRepository
  ) {
    super(repository);
  }

  protected async onCreated(order: OrderEntity): Promise<void> {
    await this.notificationRepository.createWithRelations({
      user: order.user.id,
      type: NotificationType.OrderCreated,
      metadata: {
        orderId: order.id,
      },
    });
    await this.notificationRepository.createWithRelations({
      user: order.store.owner.id,
      type: NotificationType.StoreOrderCreated,
      metadata: {
        orderId: order.id,
        storeId: order.store.id,
      },
    });
    return;
  }

  protected async onUpdated(
    order: OrderEntity,
    prev: OrderEntity
  ): Promise<void> {
    const baseMetadata: INotificationMetadata = {
      orderId: order.id,
    };
    if (prev.status !== order.status) {
      baseMetadata.status = order.status;
    }
    if (prev.payment?.id !== order.payment?.id) {
      baseMetadata.amount = order.payment.totalCost;
    }
    await this.notificationRepository.createWithRelations({
      user: order.user.id,
      type: NotificationType.OrderUpdated,
      metadata: {
        ...baseMetadata,
      },
    });
    await this.notificationRepository.createWithRelations({
      user: order.store.owner.id,
      type: NotificationType.StoreOrderUpdated,
      metadata: {
        ...baseMetadata,
        storeId: order.store.id,
      },
    });
    return;
  }

  protected async onDeleted(order: OrderEntity): Promise<void> {
    await this.notificationRepository.createWithRelations({
      user: order.user.id,
      type: NotificationType.OrderDeleted,
      metadata: {
        orderId: order.id,
      },
    });
    await this.notificationRepository.createWithRelations({
      user: order.store.owner.id,
      type: NotificationType.StoreOrderDeleted,
      metadata: {
        orderId: order.id,
        storeId: order.store.id,
      },
    });
    return;
  }
}
