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
  OrderStatus,
} from '@nx-monorepo-template/global';
import { StoreGateway, StoreService } from '../../store';

@Injectable()
export class OrderService extends BaseService<OrderEntity> {
  constructor(
    protected readonly repository: OrderRepository,
    protected readonly notificationRepository: NotificationRepository,
    protected readonly storeService: StoreService,
    protected readonly storeGateway: StoreGateway
  ) {
    super(repository);
  }

  protected async onCreated(order: OrderEntity): Promise<void> {
    if (order.user) {
      await this.notificationRepository.createWithRelations({
        user: order.user.id,
        type: NotificationType.OrderCreated,
        metadata: {
          orderId: order.id,
        },
      });
    }
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
      if ([OrderStatus.Preparing, OrderStatus.Ready].includes(order.status)) {
        (this.storeGateway.server.sockets as any).forEach(async (socket) => {
          const storeId = socket.handshake.query.storeId;
          if (storeId !== order.store.id) {
            return;
          }
          socket.emit('status', await this.storeService.getStatus(storeId));
        });
      }
    }
    if (prev.payment?.id !== order.payment?.id) {
      baseMetadata.amount = order.payment.totalCost;
    }
    if (order.user) {
      await this.notificationRepository.createWithRelations({
        user: order.user.id,
        type: NotificationType.OrderUpdated,
        metadata: {
          ...baseMetadata,
        },
      });
    }
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
    if (order.user) {
      await this.notificationRepository.createWithRelations({
        user: order.user.id,
        type: NotificationType.OrderDeleted,
        metadata: {
          orderId: order.id,
        },
      });
    }
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
