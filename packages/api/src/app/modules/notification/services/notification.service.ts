import { Injectable } from '@nestjs/common';
import {
  NotificationEntity,
  NotificationRepository,
  NotificationType,
} from '../../../database';
import { BaseService } from '../../../core';
import {
  CreateNotification,
  GetNotificationsOptions,
} from '@nx-monorepo-template/global';
import { In } from 'typeorm';

@Injectable()
export class NotificationService extends BaseService<
  NotificationEntity,
  CreateNotification,
  unknown,
  GetNotificationsOptions & { user: string }
> {
  constructor(protected readonly repository: NotificationRepository) {
    super(repository);
  }

  async getNotificationCount(userId: string) {
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

  async read(id: string) {
    const notification = await this.repository.getById(id);
    notification.opened = true;
    await this.repository.save(notification);
  }

  async readAll(userId: string) {
    await this.repository.update({ user: { id: userId } }, { opened: true });
  }
}
