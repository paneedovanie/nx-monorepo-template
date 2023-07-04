import { Injectable } from '@nestjs/common';
import {
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
} from 'typeorm';
import { CategoryEntity, ProductEntity } from '../entities';
import { BaseRepository } from '../../core';
import { StoreRepository } from './store.repository';
import { CategoryRepository } from './category.repository';
import { CreateProduct, UpdateProduct } from '@nx-monorepo-template/global';

@Injectable()
export class ProductRepository extends BaseRepository<
  ProductEntity,
  CreateProduct,
  UpdateProduct
> {
  constructor(
    dataSource: DataSource,
    private readonly storeRepository: StoreRepository,
    private readonly categoryRepository: CategoryRepository
  ) {
    super(ProductEntity, dataSource);
  }

  protected async modifyResult(
    item: ProductEntity
  ): Promise<ProductEntity & { categories: CategoryEntity[] }> {
    return {
      ...item,
      categories: await this.categoryRepository.getParentsByCategoryId(
        item.category.id
      ),
    };
  }

  protected searchFields(): string[] {
    return ['title'];
  }

  protected mapRelations(): Record<string, BaseRepository<unknown>> {
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
