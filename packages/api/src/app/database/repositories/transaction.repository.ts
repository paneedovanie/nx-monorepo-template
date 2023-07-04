import { Injectable } from '@nestjs/common';
import {
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
} from 'typeorm';
import { TransactionEntity } from '../entities';
import { BaseRepository } from '../../core';
import { UserRepository } from './user.repository';
import { CreateTransaction } from '@nx-monorepo-template/global';

@Injectable()
export class TransactionRepository extends BaseRepository<
  TransactionEntity,
  CreateTransaction
> {
  constructor(
    dataSource: DataSource,
    private readonly userRepository: UserRepository
  ) {
    super(TransactionEntity, dataSource);
  }

  protected mapRelations(): Record<string, BaseRepository<unknown>> {
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

  async balance(userId: string) {
    const result = await this.createQueryBuilder()
      .select(
        `SUM(
            amount *
            (
                CASE
                    WHEN receiver = :userId
                    THEN 1
                    ELSE -1
                END
            )
          )`,
        'balance'
      )
      .where(
        `(receiver != sender OR receiver IS NULL OR sender IS NULL) AND (receiver = :userId OR sender = :userId)`
      )
      .setParameters({ userId })
      .getRawOne();

    return +(result?.balance ?? 0) / 100;
  }

  async systemCirculatingAmount() {
    const result = await this.createQueryBuilder()
      .select(
        `SUM(
            amount *
            (
                CASE
                    WHEN receiver IS NULL
                    THEN -1
                    ELSE 1
                END
            )
          )`,
        'balance'
      )
      .where(`receiver IS NULL OR sender IS NULL`)
      .getRawOne();

    return +(result?.balance ?? 0) / 100;
  }
}
