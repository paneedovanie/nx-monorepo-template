import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsRelations } from 'typeorm';
import { NotificationEntity } from '../entities';
import { BaseRepository } from '../../core';
import {
  CreateNotification,
  GetNotificationsOptions,
  Notification,
} from '@nx-monorepo-template/global';
import { UserRepository } from './user.repository';
import { OrderRepository } from './order.repository';
import { StoreRepository } from './store.repository';

@Injectable()
export class NotificationRepository extends BaseRepository<
  NotificationEntity,
  CreateNotification,
  unknown,
  GetNotificationsOptions & { user: string }
> {
  constructor(
    dataSource: DataSource,
    private readonly userRepository: UserRepository,
    private readonly orderRepository: OrderRepository,
    private readonly storeRepository: StoreRepository
  ) {
    super(NotificationEntity, dataSource);
  }

  protected mapRelations(): Record<string, BaseRepository<unknown>> {
    return {
      user: this.userRepository,
    };
  }

  protected relations(): FindOptionsRelations<NotificationEntity> {
    return {
      user: true,
    };
  }

  protected async modifyResult(
    item: NotificationEntity
  ): Promise<Notification> {
    return {
      ...item,
      metadata: {
        ...item.metadata,
        order:
          item.metadata.orderId &&
          (await this.orderRepository.getByIdWithRelations(
            item.metadata.orderId
          )),
        store:
          item.metadata.storeId &&
          (await this.storeRepository.getByIdWithRelations(
            item.metadata.storeId
          )),
        user:
          item.metadata.userId &&
          (await this.userRepository.getByIdWithRelations(
            item.metadata.userId
          )),
      },
    };
  }

  public async getItems(userId: string) {
    const result = await this.createQueryBuilder('notifications')
      .leftJoinAndSelect('notifications.user', 'user')
      .where('notifications.user_id = :userId', { userId })
      .take(5)
      .orderBy('notifications.createdAt', 'DESC')
      .getMany();

    return Promise.all(
      result.map(async (item) => ({
        ...item,
        metadata: {
          ...item.metadata,
          order:
            item.metadata.orderId &&
            (await this.orderRepository.getByIdWithRelations(
              item.metadata.orderId
            )),
          store:
            item.metadata.storeId &&
            (await this.storeRepository.getByIdWithRelations(
              item.metadata.storeId
            )),
          user:
            item.metadata.userId &&
            (await this.userRepository.getByIdWithRelations(
              item.metadata.userId
            )),
        },
      }))
    );
  }
}
