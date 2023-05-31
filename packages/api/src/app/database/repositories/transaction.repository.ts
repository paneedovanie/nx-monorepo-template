import { Injectable } from '@nestjs/common';
import {
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
} from 'typeorm';
import { TransactionEntity } from '../entities';
import { BaseRepository } from './base.repository';
import { UserRepository } from './user.repository';

@Injectable()
export class TransactionRepository extends BaseRepository<TransactionEntity> {
  constructor(
    dataSource: DataSource,
    private readonly userRepository: UserRepository
  ) {
    super(TransactionEntity, dataSource);
  }

  protected mapRelations(): Record<string, BaseRepository<any>> {
    return {
      sender: this.userRepository,
      receiver: this.userRepository,
    };
  }

  protected relations(): FindOptionsRelations<TransactionEntity> {
    return {
      sender: true,
      receiver: true,
    };
  }

  protected modifyWhere({
    ids,
    userIds,
    ...conditions
  }: FindOptionsWhere<TransactionEntity> & {
    ids?: string[];
    userIds?: string[];
  }):
    | FindOptionsWhere<TransactionEntity>
    | FindOptionsWhere<TransactionEntity>[] {
    if (ids) conditions.id = In(ids);
    if (userIds) {
      return [
        { ...conditions, sender: In(userIds) },
        { ...conditions, receiver: In(userIds) },
      ];
    }
    return conditions;
  }
}
