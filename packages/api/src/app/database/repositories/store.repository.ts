import { Injectable } from '@nestjs/common';
import {
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
} from 'typeorm';
import { StoreEntity, TagEntity } from '../entities';
import { BaseRepository } from '../../core';
import { UserRepository } from './user.repository';
import {
  CreateStore,
  UpdateStore,
  isUUID,
} from '@nx-monorepo-template/global';
import { StoreRatingRepository } from './store-rating.repository';
import { TagRepository } from './tag.repository';

@Injectable()
export class StoreRepository extends BaseRepository<
  StoreEntity,
  CreateStore,
  UpdateStore
> {
  constructor(
    dataSource: DataSource,
    private readonly ownerRepository: UserRepository,
    private readonly storeRatingRepository: StoreRatingRepository,
    private readonly tagRepository: TagRepository
  ) {
    super(StoreEntity, dataSource);
  }

  searchFields(): string[] {
    return ['title'];
  }

  protected async modifyResult(item: StoreEntity): Promise<StoreEntity> {
    if (!item) {
      return null;
    }
    const rating = await this.storeRatingRepository.average('rating', {
      storeId: item.id,
    });

    return {
      ...item,
      rating,
    };
  }

  protected mapRelations(): Record<
    string,
    BaseRepository<unknown> | ((input: Record<string, any>) => any)
  > {
    return {
      owner: this.ownerRepository,
      tags: async (input: CreateStore | UpdateStore) => {
        return await this.getTags(input.tags);
      },
    };
  }

  protected relations(): FindOptionsRelations<StoreEntity> {
    return {
      owner: true,
      tags: true,
      products: true,
    };
  }

  async getTags(items: string[]) {
    const tags: TagEntity[] = [];

    for (const item of items) {
      if (isUUID(item)) {
        const tag = await this.tagRepository.getById(item);
        tags.push(tag);
      } else {
        let tag = await this.tagRepository.findOneBy({
          title: item,
          type: 'product',
        });
        if (!tag) {
          tag = await this.tagRepository.createWithRelations({
            title: item,
            type: 'product',
          });
        }
        tags.push(tag);
      }
    }

    return tags;
  }
}
