import { Injectable } from '@nestjs/common';
import {
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
} from 'typeorm';
import { ProductEntity } from '../entities';
import { BaseRepository } from './base.repository';
import { StoreRepository } from './store.repository';
import { CategoryRepository } from './category.repository';

@Injectable()
export class ProductRepository extends BaseRepository<ProductEntity> {
  constructor(
    dataSource: DataSource,
    private readonly storeRepository: StoreRepository,
    private readonly categoryRepository: CategoryRepository
  ) {
    super(ProductEntity, dataSource);
  }

  protected searchFields(): string[] {
    return ['title'];
  }

  protected mapRelations(): Record<string, BaseRepository<any>> {
    return {
      store: this.storeRepository,
      category: this.categoryRepository,
    };
  }

  protected relations(): FindOptionsRelations<ProductEntity> {
    return {
      store: true,
      category: true,
    };
  }

  protected modifyWhere({
    ids,
    categoryIds,
    ...conditions
  }: FindOptionsWhere<ProductEntity> & {
    ids?: string[];
    categoryIds?: string[];
  }): FindOptionsWhere<ProductEntity> {
    if (ids) conditions.id = In(ids);
    if (categoryIds) {
      conditions.category = [
        { id: In(categoryIds) },
        { parent: In(categoryIds) },
      ];
    }
    return conditions;
  }
}
