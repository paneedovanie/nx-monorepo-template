import { Injectable } from '@nestjs/common';
import {
  NotificationEntity,
  NotificationRepository,
  NotificationType,
} from '../../../database';
import { BaseService } from '../../../core';
import {
  CreateNotification,
  Event,
  GetNotificationsOptions,
} from '@nx-monorepo-template/global';
import { In } from 'typeorm';
import { EventGateway } from '../../../event';

@Injectable()
export class NotificationService extends BaseService<
  NotificationEntity,
  CreateNotification,
  unknown,
  GetNotificationsOptions & { user: string }
> {
  constructor(
    protected readonly repository: NotificationRepository,
    protected readonly eventGateway: EventGateway
  ) {
    super(repository);
  }

  async getStatus(userId: string) {
    const user = { id: userId };

    const all = await this.repository.count({
      where: {
        user,
        opened: false,
      },
    });

    const account = await this.repository.count({
      where: {
        user,
        opened: false,
        type: In([
          NotificationType.AccountCreated,
          NotificationType.AccountUpdated,
        ]),
      },
    });
    const order = await this.repository.count({
      where: {
        user,
        opened: false,
        type: In([
          NotificationType.OrderCreated,
          NotificationType.OrderUpdated,
          NotificationType.OrderDeleted,
        ]),
      },
    });

    const storeOrder = await this.repository.count({
      where: {
        user,
        opened: false,
        type: In([
          NotificationType.StoreOrderCreated,
          NotificationType.StoreOrderUpdated,
          NotificationType.StoreOrderDeleted,
        ]),
      },
    });

    const wallet = await this.repository.count({
      where: {
        user,
        opened: false,
        type: In([
          NotificationType.AmountReceived,
          NotificationType.AmountSent,
        ]),
      },
    });

    const items =
      (
        await this.repository.paginated({
          perPage: 5,
          orderBy: 'createdAt',
          orderDir: 'DESC',
          user: userId,
        })
      ).list ?? [];

    return {
      all,
      account,
      order,
      storeOrder,
      wallet,
      items,
    };
  }

  async read(notificationId: string) {
    const notification = await this.repository.getByIdWithRelations(
      notificationId
    );
    notification.opened = true;
    await this.repository.save(notification);
    this.userNotificationStatusEvent(notification.user.id);
  }

  async readAll(userId: string) {
    await this.repository.update({ user: { id: userId } }, { opened: true });
    this.userNotificationStatusEvent(userId);
  }

  protected async onCreated(value: NotificationEntity) {
    this.userNotificationStatusEvent(value.user.id);
  }

  public async userNotificationStatusEvent(userId: string) {
    this.eventGateway.emitToUser(
      userId,
      Event.NotificationStatus,
      await this.getStatus(userId)
    );
  }
}
