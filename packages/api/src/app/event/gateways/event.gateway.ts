import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { BaseGateway } from '../../core';
import { Event, OrderStatus } from '@nx-monorepo-template/global';
import {
  NotificationService,
  OrderService,
  StatisticService,
  StoreService,
} from '../../modules';
import { Socket } from 'socket.io-client';
import { Inject, forwardRef } from '@nestjs/common';

@WebSocketGateway({
  cors: '*',
})
export class EventGateway extends BaseGateway {
  constructor(
    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: NotificationService,
    @Inject(forwardRef(() => StoreService))
    private readonly storeService: StoreService,
    @Inject(forwardRef(() => StatisticService))
    private readonly statisticService: StatisticService,
    @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService
  ) {
    super();
  }

  @SubscribeMessage(Event.NotificationStatus)
  async notificationStatus(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket
  ) {
    client.emit(
      Event.NotificationStatus,
      await this.notificationService.getStatus(userId)
    );
  }

  @SubscribeMessage(Event.StoreStatus)
  async storeStatus(
    @MessageBody() storeId: string,
    @ConnectedSocket() client: Socket
  ) {
    client.emit(Event.StoreStatus, await this.storeService.getStatus(storeId));
  }

  @SubscribeMessage(Event.StoreDashboard)
  async storeDashboard(
    @MessageBody() storeId: string,
    @ConnectedSocket() client: Socket
  ) {
    client.emit(
      Event.StoreDashboard,
      await this.statisticService.getStoreDashboard(storeId)
    );
  }

  @SubscribeMessage(Event.StorePreparation)
  async storePreparation(
    @MessageBody() storeId: string,
    @ConnectedSocket() client: Socket
  ) {
    const orderResult = await this.orderService.getAll({
      storeIds: [storeId],
      perPage: 10,
      orderBy: 'createdAt',
      status: OrderStatus.Preparing,
    });

    client.emit(Event.StorePreparation, {
      storeId,
      preparing: orderResult.list,
    });
  }
}
