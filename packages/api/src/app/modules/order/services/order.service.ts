import { Injectable } from '@nestjs/common';
import { OrderEntity, OrderRepository } from '../../../database';
import { BaseService } from '../../../core';
import {
  CreateOrder,
  Event,
  GetOrdersOptions,
  INotificationMetadata,
  NotificationType,
  OrderStatus,
  UpdateOrder,
} from '@nx-monorepo-template/global';
import { StoreService } from '../../store';
import { EventGateway } from '../../../event';
import { StatisticService } from '../../statistic';
import { NotificationService } from '../../notification';

@Injectable()
export class OrderService extends BaseService<
  OrderEntity,
  CreateOrder & { tax: number },
  UpdateOrder,
  GetOrdersOptions
> {
  constructor(
    protected readonly repository: OrderRepository,
    protected readonly notificationService: NotificationService,
    protected readonly storeService: StoreService,
    protected readonly statisticService: StatisticService,
    protected readonly eventGateway: EventGateway
  ) {
    super(repository);
  }

  protected async onCreated(order: OrderEntity): Promise<void> {
    const storeId = order.store.id;
    this.eventGateway.emitToUser(
      order.store.owner.id,
      Event.StoreDashboard,
      await this.statisticService.getStoreDashboard(storeId)
    );
    if (order.user) {
      await this.notificationService.create({
        user: order.user.id,
        type: NotificationType.OrderCreated,
        metadata: {
          orderId: order.id,
        },
      });
    }
    await this.notificationService.create({
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
      const storeId = order.store.id;

      this.eventGateway.emitToUser(
        order.store.owner.id,
        Event.StoreStatus,
        await this.storeService.getStatus(storeId)
      );
      const orderResult = await this.getAll({
        storeIds: [storeId],
        perPage: 10,
        orderBy: 'createdAt',
        status: OrderStatus.Preparing,
      });
      this.eventGateway.emitToUser(
        order.store.owner.id,
        Event.StorePreparation,
        {
          storeId,
          preparing: orderResult.list,
        }
      );
      baseMetadata.status = order.status;
    }
    if (prev.payment?.id !== order.payment?.id) {
      baseMetadata.amount = order.payment.totalCost;
    }
    if (order.user) {
      await this.notificationService.create({
        user: order.user.id,
        type: NotificationType.OrderUpdated,
        metadata: {
          ...baseMetadata,
        },
      });
    }
    await this.notificationService.create({
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
      await this.notificationService.create({
        user: order.user.id,
        type: NotificationType.OrderDeleted,
        metadata: {
          orderId: order.id,
        },
      });
    }
    await this.notificationService.create({
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
