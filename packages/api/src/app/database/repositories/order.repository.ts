import { Injectable } from '@nestjs/common';
import {
  Between,
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  IsNull,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
} from 'typeorm';
import { OrderEntity } from '../entities';
import { BaseRepository } from './base.repository';
import { UserRepository } from './user.repository';
import { StoreRepository } from './store.repository';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class OrderRepository extends BaseRepository<OrderEntity> {
  constructor(
    dataSource: DataSource,
    private readonly userRepository: UserRepository,
    private readonly storeRepository: StoreRepository,
    private readonly paymenRepository: PaymentRepository
  ) {
    super(OrderEntity, dataSource);
  }

  protected mapRelations(): Record<string, BaseRepository<any>> {
    return {
      user: this.userRepository,
      store: this.storeRepository,
      payment: this.paymenRepository,
    };
  }

  protected relations(): FindOptionsRelations<OrderEntity> {
    return {
      user: true,
      payment: true,
      store: true,
    };
  }

  protected modifyWhere({
    ids,
    storeIds,
    isPaid,
    userIds,
    startDate,
    endDate,
    ...conditions
  }: FindOptionsWhere<OrderEntity> & {
    ids?: string[];
    storeIds?: string[];
    isPaid?: boolean;
    userIds?: string[];
    startDate?: Date;
    endDate?: Date;
  }): FindOptionsWhere<OrderEntity> {
    if (ids) conditions.id = In(ids);
    if (storeIds) {
      conditions.store = { id: In(storeIds) };
    }
    if (isPaid) {
      conditions.payment = Not(IsNull());
    }
    if (userIds) {
      conditions.user = { id: In(userIds) };
    }
    if (startDate && endDate) {
      conditions.createdAt = Between(startDate, endDate);
    } else if (startDate) {
      conditions.createdAt = MoreThanOrEqual(startDate);
    } else if (endDate) {
      conditions.createdAt = LessThanOrEqual(endDate);
    }
    return conditions;
  }
}
