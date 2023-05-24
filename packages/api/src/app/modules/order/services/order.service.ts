import { Injectable } from '@nestjs/common';
import {
  OrderEntity,
  OrderRepository,
  PaymentRepository,
  StoreRepository,
  UserRepository,
} from '../../../database';
import { BaseService } from '../../../core';
import {
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  IsNull,
  Not,
  Raw,
} from 'typeorm';
import { BaseRepository } from '../../../database/repositories/base.repository';

@Injectable()
export class OrderService extends BaseService<OrderEntity> {
  constructor(
    protected readonly repository: OrderRepository,
    private readonly userRepository: UserRepository,
    private readonly storeRepository: StoreRepository,
    private readonly paymenRepository: PaymentRepository
  ) {
    super(repository);
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

  protected where({
    ids,
    storeIds,
    isPaid,
    userIds,
    ...conditions
  }: FindOptionsWhere<OrderEntity> & {
    ids?: string[];
    storeIds?: string[];
    isPaid?: boolean;
    userIds?: string[];
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
    return conditions;
  }
}
