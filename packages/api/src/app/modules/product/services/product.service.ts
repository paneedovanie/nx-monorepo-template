import { Injectable } from '@nestjs/common';
import {
  CategoryRepository,
  ProductEntity,
  ProductRepository,
  StoreRepository,
} from '../../../database';
import { BaseService } from '../../../core';
import { BaseRepository } from '../../../database/repositories/base.repository';
import { FindOptionsRelations, FindOptionsWhere, In } from 'typeorm';

@Injectable()
export class ProductService extends BaseService<ProductEntity> {
  constructor(
    protected readonly repository: ProductRepository,
    private readonly storeRepository: StoreRepository,
    private readonly categoryRepository: CategoryRepository
  ) {
    super(repository);
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

  protected where({
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
